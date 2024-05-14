from databaseconfig import db
from datetime import datetime
from enum import Enum
from databaseconfig import db

class Client(db.Model):
    _tablename_ = 'Client'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    telephone_number = db.Column(db.String(20), nullable=False)
    client_type = db.Column(db.String(50), nullable=False)
    @property
    def days_remaining(self):
        return (self.deadline - datetime.utcnow()).days

    @property
    def is_urgent(self):
        return self.days_remaining < 3