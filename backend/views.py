from flask import Blueprint,render_template,request,jsonify
from flask import Flask,request,jsonify,redirect
from sqlalchemy import select
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from .models import website_data
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
mapper=class_mapper(website_data)
test1=mapper.mapped_table


views=Blueprint('views', __name__)
data3=[]
@views.route('/',methods=['GET','POST'])
def home():
    data=request.form
    print(data)
    return render_template("base.html",boolean=True)




def get_product_by_uniqueid(uniqueid):
    query = select([website_data.price, website_data.name]).where(website_data.uniqueId == uniqueid)
    result = db.session.execute(query).fetchone()
    if result:
        result=list(result)
        return result
    else:
        pass



# @views.route('/search',methods=["GET"])
# def search():
#     query = request.args.get("query")
#     if not query:
#         return jsonify({"error": "Missing 'query' parameter"}), 400
#     headers = {
#         "Content-Type": "application/json",
#          "Accept": "application/json"
#      }
#     response = requests.get(f"https://search.unbxd.io/fb853e3332f2645fac9d71dc63e09ec1/demo-unbxd700181503576558/search?q={query}",headers=headers)
#     if response.status_code != 200:
#         return jsonify({"error": response.json()}), response.status_code
#     data = response.json()
#     unique_ids = set()
#     products = data.get("response", {}).get("products", [])
#     product_data = []
#     unique_ids = set()
#     for product in products:
#         product_id = product.get("uniqueId")
#         if product_id not in unique_ids:
#             unique_ids.add(product_id)
#             product_data.append({
#                 "name": product.get("title"),
#                 "price": product.get("price")
#             })
#         if len(products) == 10:
#             break
#             print(products)
#     return render_template("search.html", products=products)

@views.route("/search", methods=["GET","POST"])
def submit_form():
    if request.method != "GET":
        redirect("base.html")
    query = request.args.get("query")
    pageQuery = request.args.get("page")
    print('query recieved is ', query)
    print('query recieved is ', pageQuery)
    if query == None or (len(query)) == 0:
        redirect("products.html")
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    page = 1
    pageSize = 10
    if (pageQuery):
        page = int(pageQuery)
    start = (page - 1) * 10

    url = f"https://search.unbxd.io/fb853e3332f2645fac9d71dc63e09ec1/demo-unbxd700181503576558/search?q={query}&rows={pageSize}&start={start}"
    data = response.json()
    global products
    products = data.get("response", {}).get("products", [])
    product_data = []
    unique_ids = set()
    global pdata
    pdata= [{"id":product["uniqueId"],"image":product["productImage"],"name": product["title"], "price": product["price"]} for product in products]
    # print(pdata)
    return (pdata)

@views.route("/search2/<gender>", methods=["GET","POST"])
def submit_form2(gender):
    if request.method != "GET":
        redirect("base.html")
    query = request.args.get("query")
    print('query recieved is ',query)
    print('gender is',gender,type(gender))
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
    pdata= [{"id":product["uniqueId"],"image":product["productImage"],"name": product["title"], "price": product["price"]}  for product in products if product["gender"]==[gender] ]
    # print('data is',pdata)
    return (pdata)














@views.route('/product/<uniqueid>')
def get_desc(uniqueid):
    print(uniqueid)
    details=[]
    for i in products:
        if i["uniqueId"]==uniqueid:
            details=[{"id":i["uniqueId"],"image":i["productImage"],"name": i["title"], "price": i["price"],"color":i["color"],"size":i["size"],"category":i["categoryType"],"description":i["productDescription"]}]
    print('done')
    # return render_template("products.html",details=details)
    return details













    # uid = request.get_json("data2")
    # print(name)
    
    # uid=list(uid)
    # result=[]
    # print('uid ',uid,type(uid))
    # for i in uid:
    #     #print(i,type(i))
    #     if(get_product_by_uniqueid(i)) != None:
    #         result.append(get_product_by_uniqueid(i))
    # print(type(result))
    # print(result)
    # print(type(result[0]))
    # uniqueid=[[0,1],[1,2]]
    # return jsonify(uniqueids)

    


