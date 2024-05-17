from .dbconfig import db
from sqlalchemy_serializer import SerializerMixin

class Pump_Service(db.Model,SerializerMixin):
    __tablename__ = 'pumpservices'

     #serialization
    serialize_rules=('-service.pumpservices',)

    pump_id = db.Column(db.Integer, primary_key=True)
    pump_type = db.Column(db.String,nullable=False)
    pump_type_cost = db.Column(db.Integer, nullable=False)
    # type_cost = db.Column(db.Integer,nullable=False) # 65,000
    depth_height =db.Column(db.Integer, nullable=False) # 40 (1-100)
    cost_meters = db.Column(db.Integer, nullable=False) #  1000
    depth_height_cost =db.Column(db.Integer, nullable=False) # = 40,000
    pump_cost = db.Column(db.Integer,nullable=False) # = 105,000
    service_id = db.Column(db.Integer, db.ForeignKey('services.service_id'))

    #One to many relationship between plumbing services and service
    service = db.relationship('Service', back_populates='pumpservices')

    def __repr__(self):
        return f'<Pump_Service {self.pump_id}, {self.pump_type}, {self.pump_cost}>'
    
    def calculate_cost(self):
        pump_type_cost = self.pump_type_cost
        depth_height = self.depth_height
        cost_meters = self.cost_meters
        self.depth_height_cost = depth_height * cost_meters

        total_cost = pump_type_cost + self.depth_height_cost
        return total_cost
    
    def update_cost(self):
        self.pump_cost = self.calculate_cost()
