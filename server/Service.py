from databaseconfig import db

class Task(db.Model):
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    service_type = db.Column(db.String(255), nullable=False)
    details = db.Column(db.JSON)  # Stores additional details like depth, height, diameter as JSON
