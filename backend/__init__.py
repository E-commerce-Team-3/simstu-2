import sqlalchemy
from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select,create_engine
from flask_marshmallow import Marshmallow
from sqlalchemy.engine import result
ma=Marshmallow()
db=SQLAlchemy()
from .models import website_data,ProdSchema
# DB_NAME='test1.db'

engine=create_engine('postgresql://postgres:12345@localhost:5432/test1')

def create_app():
    app=Flask(__name__)
    app.config['SECRET_KEY']='thisisthekey'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345@localhost:5432/test1'
    db.init_app(app)

    from .views import views
    from .auth import auth
    # from .prod_bp import prod_bp
    app.register_blueprint(views,url_prefix='/')
    # app.register_blueprint(prod_bp,url_prefix='/prod_bp')
    app.register_blueprint(auth,url_prefix='/')
    
    
    return app

