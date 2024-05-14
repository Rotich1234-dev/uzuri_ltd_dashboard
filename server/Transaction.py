from databaseconfig import db
from sqlalchemy.orm import validates

class Tansaction(db.Model):
    __tablename__ = 'clients'
    
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    total_cost = db.Column(db.Float, nullable=False)
    tax = db.Column(db.Float, nullable=False)
    survey_fee = db.Column(db.Float, nullable=False)
    local_authority_fee = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False)  # e.g., pending, completed
    
    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email, 'Invalid email address'
        return email

    @validates('phone_number')
    def validate_phone_number(self, key, phone_number):
        # Assuming phone numbers should be at least 10 characters long
        assert len(phone_number) >= 10, 'Phone number must be at least 10 characters long'
        return phone_number
    
    def __repr__(self):
        return f"<Client(name='{self.name}', email='{self.email}', phone_number='{self.phone_number}')>"