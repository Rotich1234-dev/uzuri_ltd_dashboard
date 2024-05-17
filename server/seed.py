from random import choice as rc
from faker import Faker
from models.dbconfig import db
from models.category import Category
from models.client import Client
<<<<<<< HEAD
# from models.user import User
=======
>>>>>>> 1e0ccda8d1e4b798e28486df3f92b848eeb5df28
from models.service import Service
from models.drilling_service import Drilling_Service

from app import app

fake = Faker()

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        Category.query.delete()
        Client.query.delete()
<<<<<<< HEAD
        # User.query.delete()
=======
>>>>>>> 1e0ccda8d1e4b798e28486df3f92b848eeb5df28
        Service.query.delete()
        Drilling_Service.query.delete()

        print("Seeding categories...")
        categories = [
            Category(category_name='Industrial Survey', cat_surveyfee='20000', cat_localfee='50000'),
            Category(category_name='Commercial Survey', cat_surveyfee='15000', cat_localfee='30000'),
            Category(category_name='Domestic Survey', cat_surveyfee='7000', cat_localfee='10000')
        ]
        db.session.add_all(categories)
        db.session.commit()

        print("Seeding services...")
        services = [
            Service(service_name='Drilling services'),
            Service(service_name='Plumbing Services'),
            Service(service_name='Pump Services'),
            Service(service_name='Tank Services')

        ]
        db.session.add_all(services)
        db.session.commit()

        print("Seeding Drilling Services...")
        drilling_services = [
            Drilling_Service(drill_type='Symmetric drilling', downpayment= '130000',service_id='1'),
            Drilling_Service(drill_type='Core drilling', downpayment= '225000',service_id='1'),
            Drilling_Service(drill_type='Geo technical drilling', downpayment= '335000',service_id='1')

        ]
        db.session.add_all(drilling_services)
        db.session.commit()

<<<<<<< HEAD
        # print("Seeding Users...")
        # users = [
        #     User(role='Admin'),
        #     User(role='Client')
        # ]
        # db.session.add_all(users)
        # db.session.commit()
=======
>>>>>>> 1e0ccda8d1e4b798e28486df3f92b848eeb5df28

        print("Seeding Clients...")
        clients = []
        all_emails = set()  # Use a set to efficiently check for uniqueness
        for _ in range(10):  # Adjust the range according to the number of clients you want to seed
            email = fake.email()
            while email in all_emails:
                email = fake.email()
            all_emails.add(email)
            category = rc(categories)  # Get a random category object
<<<<<<< HEAD
            # user = rc(users)
=======
>>>>>>> 1e0ccda8d1e4b798e28486df3f92b848eeb5df28
            client = Client(
                firstName=fake.first_name(),
                lastName=fake.last_name(),
                email=email,
                address=fake.address(),
                phone_number=fake.phone_number(),
                location=fake.city(),
                category_id=category.id,  # Assign the ID of the category
<<<<<<< HEAD
                # user_id=user.id
=======
>>>>>>> 1e0ccda8d1e4b798e28486df3f92b848eeb5df28
            )
            clients.append(client)

        db.session.add_all(clients)
        db.session.commit()

        print("Done Seeding!")
