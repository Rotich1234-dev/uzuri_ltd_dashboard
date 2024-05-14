from app import db
from models import Client, Service, Transaction
from datetime import datetime

def seed_database():
    # Clear existing data
    db.session.query(Transaction).delete()
    db.session.query(Service).delete()
    db.session.query(Client).delete()

    # Adding Clients
    clients = [
        Client(name="Alice Smith", address="123 Cherry Lane", telephone_number="555-1234", client_type="Industrial"),
        Client(name="Bob Johnson", address="234 Oak Street", telephone_number="555-5678", client_type="Commercial"),
        Client(name="Carol Williams", address="345 Maple Ave", telephone_number="555-8765", client_type="Domestic"),
    ]

    # Adding Services
    services = [
        Service(service_type="Symmetric Drilling", details={"downpayment": 130000}),
        Service(service_type="Core Drilling", details={"downpayment": 225000}),
        Service(service_type="Geo-technical Drilling", details={"downpayment": 335000}),
        Service(service_type="Plumbing", details={"pipe_type": "PVC", "diameter_inches": 2, "length_meters": 100, "outlets": 4}),
        Service(service_type="Pump Installation", details={"pump_type": "Submersible Electric", "cost": 90000}),
    ]

    # Adding Transactions
    transactions = [
        Transaction(client_id=1, service_id=1, total_cost=150000, tax=24000, survey_fee=20000, local_authority_fee=50000, status="completed"),
        Transaction(client_id=2, service_id=2, total_cost=250000, tax=40000, survey_fee=15000, local_authority_fee=30000, status="pending"),
        Transaction(client_id=3, service_id=3, total_cost=350000, tax=56000, survey_fee=7000, local_authority_fee=10000, status="completed"),
    ]

    # Add to session and commit
    db.session.bulk_save_objects(clients)
    db.session.bulk_save_objects(services)
    db.session.bulk_save_objects(transactions)
    db.session.commit()

    print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()
