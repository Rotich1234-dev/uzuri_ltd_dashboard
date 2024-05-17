from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, abort
# from flask_jwt_extended import jwt_required, get_jwt_identity

from models.service import Service
from models.dbconfig import db
from models.drilling_service import Drilling_Service
from models.plumbing_service import Plumbing_Service
from models.tank import Tank
from models.pump_service import Pump_Service
from models.category import Category
from models.transaction import Transaction
from models.user import User

admin_service_bp = Blueprint('admin_service', __name__)
api = Api(admin_service_bp)



# Resource for drilling services
class DrillingServices(Resource):

    def get(self):
        drilling_services = [drilling_service.to_dict(rules=('-service',)) for drilling_service in Drilling_Service.query.all()]
        response = make_response(jsonify(drilling_services), 200)
        return response
    def post(self):  
        data = request.get_json()

        new_drilling_service = Drilling_Service(
            drill_type = data['drill_type'],
            downpayment = data['downpayment'],
            image = data['image'],
            service_id = data['service_id']
        )
        db.session.add(new_drilling_service)
        db.session.commit()
        response = make_response(jsonify(new_drilling_service.to_dict(rules=('-service',))),201)
        return response
    
    def patch(self, id):
        drilling_service = Drilling_Service.query.filter_by(id=id).first()
        if not drilling_service:
            return make_response(jsonify({"message": "Drilling service not found"}), 404)
        
        data = request.json
        # Update client attributes based on the provided data
        for key, value in data.items():
            setattr(drilling_service, key, value)
        
        db.session.commit()
        return make_response(jsonify(drilling_service.to_dict(rules=('-service',))), 200)

    def delete(self, id):
        drilling_service = Drilling_Service.query.filter_by(id=id).first()
        if not drilling_service:
            return make_response(jsonify({"message": "Drilling service not found"}), 404)
        
        db.session.delete(drilling_service)
        db.session.commit()
        
        return make_response(jsonify({"message": "Drilling service deleted successfully"}), 200)


api.add_resource(DrillingServices, '/api/admin/routes/drillingservices/<int:id>', endpoint='drillingservices_by_id')  
api.add_resource(DrillingServices, '/api/admin/routes/drillingservices', endpoint='drillingservices')


# Resource for plumbing services
class PlumbingServices(Resource):
    def get(self, id=None):
        if id is None: 
            plumbing_services = [plumbing_service.to_dict(rules=('-service',)) for plumbing_service in Plumbing_Service.query.all()]
            response = make_response(jsonify(plumbing_services), 200)
            return response
        else:
            plumbing_services = [plumbing_service.to_dict(rules=('-service',)) for plumbing_service in Plumbing_Service.query.filter_by(id=id)]
            response = make_response(jsonify(plumbing_services), 200)
            return response
        
    def post(self):
        data = request.get_json()

        new_plumbing_service = Plumbing_Service(
            pipe_type = data['pipe_type'],
            type_cost = data['type_cost'],
            diameter_cost = data['diameter_cost'],
            length_cost = data['length_cost'],
            pipe_diameter = data['pipe_diameter'],
            pipe_length = data['pipe_length'],
            outlets = data['outlets'],
            outlets_cost = data['outlets_cost'],
            image = data['image'],
            service_id = data['service_id']
        )
        new_plumbing_service.update_cost() 
        db.session.add(new_plumbing_service)
        db.session.commit()
        return (new_plumbing_service.to_dict(rules=('-service',))), 201
    
    def patch(self,id):
        plumbing_service = Plumbing_Service.query.filter_by(id=id).first()
        if not plumbing_service:
            return make_response(jsonify({"message": "Plumbing service not found"}), 404)
        
        data = request.json
        # Update client attributes based on the provided data
        for key, value in data.items():
            setattr(plumbing_service, key, value)
        
        db.session.commit()
        return make_response(jsonify(plumbing_service.to_dict(rules=('-service',))), 200)
    
    def delete(self, id):
        plumbing_Service = Plumbing_Service.query.filter_by(id=id).first()
        if not Plumbing_Service:
            return make_response(jsonify({"message": "Plumbing service not found"}), 404)
        
        db.session.delete(plumbing_Service)
        db.session.commit()
        
        return make_response(jsonify({"message": "Plumbing service deleted successfully"}), 200)

api.add_resource(PlumbingServices, '/api/admin/routes/plumbingservices', endpoint='plumbingservices')
api.add_resource(PlumbingServices, '/api/admin/routes/plumbingservices/<int:id>', endpoint='plumbingservices_by_id')


# Tank services
class TankServices(Resource):
    def get(self, tank_id=None):
        if tank_id is None:
            tanks = Tank.query.all()
            return make_response(jsonify([tank.to_dict(rules=('-service',)) for tank in tanks]), 200)
        else:
            tank = Tank.query.filter_by(tank_id=tank_id).first()
            return make_response(jsonify(tank.to_dict(rules=('-service',))),200)

    def post(self):
        data = request.get_json()
        tank_name = data.get('tank_name')
        capacity = data.get('capacity')
        price_per_liter = data.get('price_per_liter')
        service_id = data.get('service_id')
        image = data.get('image')

        if not all([capacity, service_id, image]):
            return jsonify({'error': 'Missing required fields'}), 400

        tank = Tank(tank_name=tank_name, capacity=capacity, price_per_liter=price_per_liter, image=image, service_id=service_id)
        tank.update_cost()
        db.session.add(tank)
        db.session.commit()
        return make_response(jsonify([tank.to_dict(rules=('-service',))]), 201)
    
    def patch(self,tank_id):
        tank = Tank.query.filter_by(tank_id=tank_id).first()
        if not tank:
            return make_response(jsonify({"message": "Plumbing service not found"}), 404)
        
        data = request.json
        for key, value in data.items():
            setattr(tank, key, value)
        
        db.session.commit()
        return make_response(jsonify(tank.to_dict(rules=('-service',))), 200)
    
    def delete(self, tank_id):
        tank = Tank.query.filter_by(tank_id=tank_id).first()
        if not tank:
            return make_response(jsonify({"message": "Tank not found"}), 404)
        
        db.session.delete(tank)
        db.session.commit()
        
        return make_response(jsonify({"message": "Tank deleted successfully"}), 200)

api.add_resource(TankServices, '/api/admin/routes/tank', endpoint='tank')
api.add_resource(TankServices, '/api/admin/routes/tank/<int:tank_id>', endpoint='tank_by_id')


# Pump services
class PumpServices(Resource):
    def get(self,pump_id=None):
        if pump_id is None:
            pumps = Pump_Service.query.all()
            return make_response([pump.to_dict(rules=('-service',)) for pump in pumps],200)
        else:
            pump = Pump_Service.query.filter_by(pump_id=pump_id).first()
            return make_response(pump.to_dict(rules=('-service',)),200)
        
    def post(self):
        data = request.get_json()

        new_pump = Pump_Service(
            pump_type = data['pump_type'],
            pump_type_cost = data['pump_type_cost'],
            depth_height = data['depth_height'],
            cost_meters = data['cost_meters'],
            # = data['depth_height_cost'],
            image = data['image'],
            service_id = data['service_id']
        )
        new_pump.update_cost()
        db.session.add(new_pump)
        db.session.commit()
        return make_response(jsonify(new_pump.to_dict()),201)

    def patch(self,pump_id):
        pump = Pump_Service.query.filter_by(pump_id=pump_id).first()
        if not pump:
            return make_response(jsonify({"message": "Pump service not found"}), 404)
        
        data = request.json
        # Update client attributes based on the provided data
        for key, value in data.items():
            setattr(pump, key, value)
        
        db.session.commit()
        return make_response(jsonify(pump.to_dict(rules=('-service',))), 200)
    
    def delete(self, pump_id):
        pump = Pump_Service.query.filter_by(pump_id=pump_id).first()
        if not pump:
            return make_response(jsonify({"message": "Pump not found"}), 404)
        
        db.session.delete(pump)
        db.session.commit()
        
        return make_response(jsonify({"message": "Pump deleted successfully"}), 200)

api.add_resource(PumpServices, '/api/admin/routes/pumps', endpoint='pumps')
api.add_resource(PumpServices, '/api/admin/routes/pumps/<int:pump_id>', endpoint='pump_by_id')


class Categories(Resource):
   def get(self):
       categories = [category.to_dict(rules=('-clients',)) for category in Category.query.all()]
       return categories, 200

class Services(Resource): 
    def get(self, service_id=None):
        if service_id is None:
            services = [service.to_dict() for service in Service.query.all()]
            return services,200
        else:
            service = [service.to_dict() for service in Service.query.filter_by(service_id=service_id)]
            # response = make_response(jsonify(service), 200)
            return service,200
        
    def post(self):
        data = request.get_json()

        new_service = Service(
            service_name = data['service_name']
        )
        db.session.add(new_service)
        db.session.commit()
        response = make_response(jsonify(new_service.to_dict(rules=('-tanks', '-clientservices','-plumbingservices','-drillingservices', '-pumpservices'))), 201)
        return response
    
    def patch(self, service_id):
        service = Service.query.filter_by(service_id=service_id).first()
        if not service:
            return make_response(jsonify({"message": "Service not found"}), 404)
        
        data = request.json
        # Update client attributes based on the provided data
        for key, value in data.items():
            setattr(service, key, value)
        
        db.session.commit()
        return make_response(jsonify({"message": "Service has been updated successfully"}), 200)
    
    def delete(self, service_id):
        service = Service.query.filter_by(service_id=service_id).first()
        if not service:
            return make_response(jsonify({"message": "Service not found"}), 404)
        
        db.session.delete(service)
        db.session.commit()
        
        return make_response(jsonify({"message": "Service deleted successfully"}), 200)

class Transactions(Resource):
   def get(self):
       transactions = [transaction.to_dict() for transaction in Transaction.query.all()]
       return transactions, 200


class TransactionsbyID(Resource):
   def get(self, id):
       transaction = Transaction.query.filter(Transaction.transaction_id == id).first()
       return jsonify(transaction), 200
   
class Users(Resource):
   def get(self):
       users = [user.to_dict(rules='-clients',) for user in User.query.all()]
       return users, 200



api.add_resource(Categories, '/api/admin/routes/categories', endpoint='categories')
api.add_resource(Services, '/api/admin/routes/services', endpoint='services')
api.add_resource(Services, '/api/admin/routes/services/<int:service_id>',endpoint='service_by_id')
api.add_resource(Transactions, '/api/admin/routes/transactions')
api.add_resource(TransactionsbyID, '/api/admin/routes/transactions/<int:id>')
api.add_resource(Users, '/api/admin/routes/users')

