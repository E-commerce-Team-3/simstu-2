from flask import Blueprint,render_template,request,jsonify
from flask import Flask,request,jsonify,redirect
from sqlalchemy import select
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from .models import website_data2
from . import ma
from django.shortcuts import render
import psycopg2
from django.conf import settings
import requests
settings.configure()


class ProdSchema(ma.Schema):
    class Meta:
        fields=('uniqueid','name','db.title','category','price','availability')
        #fields=('color','categoryType','productUrl','availability','size','category','productDescription','catlevel2Name','title','sku','price','catlevel3Name','name','gender','catlevel4Name','uniqueId')
product_schema = ProdSchema()
products_schema = ProdSchema(many=True)


from sqlalchemy import select
from sqlalchemy.orm import class_mapper
from . import db
from . import engine
mapper=class_mapper(website_data2)
test1=mapper.mapped_table


views=Blueprint('views', __name__)
data3=[]
@views.route('/',methods=['GET','POST'])
def home():
    data=request.form
    print(data)
    return render_template("base.html",boolean=True)


@views.route('/products',methods=["GET","POST"])
def products():
    return render_template("products.html",boolean=True)


@views.route('/search',methods=["GET","POST"])
def search():
    return render_template("search.html",boolean=True)


def get_product_by_uniqueid(uniqueid):
    query = select([website_data2.price, website_data2.name]).where(website_data2.uniqueId == uniqueid)
    result = db.session.execute(query).fetchone()
    if result:
        result=list(result)
        return result
    else:
        pass


@views.route("/search/<query>", methods=["GET","POST"])
def submit_form(query):
    if request.method != "GET":
        redirect("base.html")
    # query = request.args.get("query")
    print('query recieved is ',query)
    if query==None or (len(query))==0 :
        redirect("products.html")
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    url = f"https://search.unbxd.io/fb853e3332f2645fac9d71dc63e09ec1/demo-unbxd700181503576558/search?q={query}&rows=10"
    response = requests.get(url, headers=headers)
    data = response.json()
    global products
    products = data.get("response", {}).get("products", [])
    product_data = []
    unique_ids = set()
    global pdata
    pdata= [{"id":product["uniqueId"],"image":product["productImage"],"name": product["title"], "price": product["price"]} for product in products]
    # print(pdata)
    return (pdata)

@views.route("/search2/<gender>/<query>", methods=["GET","POST"])
def get_product_by_uniqueid(query,gender):
    print(query,gender)
    query = select([website_data2.uniqueId, website_data2.productImage,website_data2.title,website_data2.price]).where(website_data2.catlevel1Name == gender ).where(website_data2.categoryType==query)
    result = db.session.execute(query).fetchall()
    # if result:
    result = db.session.execute(query).fetchall() 
    result=list(result)
    data = []
    for row in result:
        data.append({
            'id': row[0],
            'image': row[1],
            'name': row[2],
            'price': row[3]
        })
    return data

@views.route('/product/<uniqueid>')
def get_desc(uniqueid):
    print(uniqueid)
    details=[]
    query = select([website_data2.uniqueId, website_data2.productImage,website_data2.title,website_data2.price,website_data2.color,website_data2.size,website_data2.categoryType,website_data2.productDescription]).where(website_data2.uniqueId == uniqueid )
    result = db.session.execute(query).fetchone()
    result=list(result)
    print('result is ', result)
    print('row 1 is ',result[0])
    print('row 2 is ',result[1])
    print('row 3 is ',result[2])
    weed=result[4][1:-1]
    weed_size=result[5][1:-1]
    # for row in result:
    details.append({
            'id': result[0],
            'image': result[1],
            'name': result[2],
            'price': result[3],
            'color': weed.split(','),
            # "[" +result[4][1:-1] + "]",
            'size': weed_size.split(','),
            'category': result[6],
            'description': result[7]
        })
    print('done')
    print(details,type(details))
    # return render_template("products.html",details=details)
    return details
