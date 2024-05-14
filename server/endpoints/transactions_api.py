
from datetime import datetime
from flask import jsonify, request
from databaseconfig import db
from Transaction import PriorityLevel, TicketStatus, Tickets

@app.route('/transactions', methods=['POST'])
def create_transaction():
    data = request.json
    new_transaction = Transaction(
        client_id=data['client_id'],
        service_id=data['service_id'],
        total_cost=data['total_cost'],
        tax=data['tax'],
        survey_fee=data['survey_fee'],
        local_authority_fee=data['local_authority_fee'],
        status='pending'
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify({"message": "Transaction created successfully", "transaction_id": new_transaction.id}), 201

@app.route('/transactions/<int:id>', methods=['GET', 'PUT'])
def manage_transaction(id):
    transaction = Transaction.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(transaction.serialize()), 200
    elif request.method == 'PUT':
        data = request.json
        transaction.status = data.get('status', transaction.status)
        db.session.commit()
        return jsonify({"message": "Transaction updated successfully"}), 200
