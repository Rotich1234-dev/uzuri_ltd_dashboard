from datetime import datetime
from models import Tickets
from flask import jsonify, request
from databaseconfig import db

@app.route('/services', methods=['POST'])
def add_service():
    data = request.json
    new_service = Service(
        service_type=data['service_type'],
        details=data['details']
    )
    db.session.add(new_service)
    db.session.commit()
    return jsonify({"message": "Service added successfully", "service_id": new_service.id}), 201

@app.route('/services/<int:id>', methods=['PUT'])
def update_service(id):
    service = Service.query.get_or_404(id)
    data = request.json
    service.service_type = data.get('service_type', service.service_type)
    service.details = data.get('details', service.details)
    db.session.commit()
    return jsonify({"message": "Service updated successfully"}), 200
