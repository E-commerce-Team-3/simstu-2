from . import db,ma
from sqlalchemy.orm import class_mapper


class website_data2(db.Model):
    color = db.Column(db.String)
    categoryType = db.Column(db.String)
    productUrl = db.Column(db.String)
    availability =db.Column(db.String)
    size =db.Column(db.String)
    category =db.Column(db.String)
    productDescription =db.Column(db.String)
    catlevel2Name =db.Column(db.String)
    title =db.Column(db.String)
    sku =db.Column(db.String)
    price =db.Column(db.String)
    catlevel3Name =db.Column(db.String)
    catlevel1Name =db.Column(db.String)
    name =db.Column(db.String)
    gender=db.Column(db.String)
    catlevel4Name=db.Column(db.String)
    uniqueId=db.Column(db.String,primary_key=True)
    productImage=db.Column(db.String)

class ProdSchema(ma.Schema):
    class Meta:
        fields=('uniqueid','name','db.title','category','price','availability')
        #fields=('color','categoryType','productUrl','availability','size','category','productDescription','catlevel2Name','title','sku','price','catlevel3Name','name','gender','catlevel4Name','uniqueId')
product_schema = ProdSchema()
products_schema = ProdSchema(many=True)
mapper=class_mapper(website_data2)
test1=mapper.mapped_table