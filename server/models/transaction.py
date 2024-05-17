from .dbconfig import db
from sqlalchemy_serializer import SerializerMixin


class Transaction(db.Model,SerializerMixin):
    __tablename__ = 'transactions'

     #serialization
    serialize_rules=('-client.transactions',)

    transaction_id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer,db.ForeignKey('categories.id'), nullable=False )
    service_id = db.Column(db.Integer, nullable=False)
    # name = db.Column(db.String, nullable=False)
    # address = db.Column(db.String, nullable=False)
    # telephone_Number = db.Column(db.String, nullable=False)
    # quantity = db.Column(db.Integer, nullable=True)
    tax = db.Column(db.Numeric, nullable=False)
    total = db.Column(db.Numeric, nullable=False)
    timestamp = db.Column(db.DateTime)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.client_id'))

    #Relationship between client and Transaction
    client = db.relationship('Client', back_populates='transactions')

    def __repr__(self):
        return f'<Transactions {self.transaction_id}, {self.name}>'