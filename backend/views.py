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
import numpy as np
import pandas as pd
from .models import website_data2
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sqlalchemy import select
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
    weed=result[4][1:-1]
    weed_size=result[5][1:-1]

    details.append({
            'id': result[0],
            'image': result[1],
            'name': result[2],
            'price': result[3],
            'color': weed.split(','),
            'size': weed_size.split(','),
            'category': result[6],
            'description': result[7]
        })

    return details


def select_name_from_id(product_id):
    query=select([website_data2.title]).where(website_data2.uniqueId == product_id)
    product_name = db.session.execute(query).fetchone()
    return product_name


def select_product_details_from_id(product_id):
    query=select([website_data2.uniqueId, website_data2.productImage,website_data2.title,website_data2.price,website_data2.productDescription]).where(website_data2.uniqueId == product_id)
    product_id_list = db.session.execute(query).fetchone()
    print("---------------------******************--------------------")
    print(product_id_list)
    return product_id_list


@views.route('/recommendation/<uniqueid>')
def select_recommended_product_list(uniqueid):
    tf_idf = TfidfVectorizer(stop_words='english')
    query = select([website_data2.uniqueId, website_data2.name])
    product_list = list(db.session.execute(query).fetchall())
    product_df = pd.DataFrame(product_list)
    name_matrix = tf_idf.fit_transform(product_df['name'])
    print (name_matrix)
    similarity_matrix = cosine_similarity(name_matrix, name_matrix)
    print(similarity_matrix)
    mapping = pd.Series(product_df.index,index = product_df['name'])
    print(mapping)
    print(product_df)
    product_name = select_name_from_id(uniqueid)
    product_index = mapping[product_name]
    similarity_score = list(enumerate(similarity_matrix[product_index][0]))
    similarity_score = sorted(similarity_score, key=lambda x: x[1], reverse=True)
    similarity_score = similarity_score[1:5]
    print(similarity_score)
    product_indices = [i[0] for i in similarity_score]
    product_id_list=list(product_df['uniqueId'].iloc[product_indices])
    print (product_id_list)
    product_list=list(map(lambda x:select_product_details_from_id(x), product_id_list))

    product_list = [list(product) for product in product_list]
    print("-------------------------------------")
    print(product_list)
    print("-------------------------------------")
    return {"res": product_list}
    

    


