from models import Client
from flask import jsonify, request
from databaseconfig import db

@app.route('/clients', methods=['POST'])
def register_client():
    data = request.json
    new_client = Client(
        name=data['name'],
        address=data['address'],
        telephone_number=data['telephone_number'],
        client_type=data['client_type']
    )
    db.session.add(new_client)
    db.session.commit()
    return jsonify({"message": "Client registered successfully", "client_id": new_client.id}), 201

@app.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    return jsonify([client.serialize() for client in clients]), 200

@app.route('/clients/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def manage_client(id):
    client = Client.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(client.serialize()), 200
    elif request.method == 'PUT':
        data = request.json
        client.name = data.get('name', client.name)
        client.address = data.get('address', client.address)
        client.telephone_number = data.get('telephone_number', client.telephone_number)
        client.client_type = data.get('client_type', client.client_type)
        db.session.commit()
        return jsonify({"message": "Client updated successfully"}), 200
    elif request.method == 'DELETE':
        db.session.delete(client)
        db.session.commit()
        return jsonify({"message": "Client deleted successfully"}), 204
