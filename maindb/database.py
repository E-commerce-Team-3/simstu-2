from sqlalchemy import Column, Integer, create_engine, String, ForeignKey, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import json

Base = declarative_base()

with open('out.json', 'r') as f:
    data = json.load(f)


class Product(Base):
    __tablename__ = 'product'
    uniqueId=Column(String(15),primary_key=True)
    productUrl = Column(String)
    productDescription =Column(String)
    title =Column(String)
    price =Column(Float)
    catlevel1_id = Column(Integer, ForeignKey('catlevel1.catlevel1Id'))
    # catlevel2_id = Column(Integer, ForeignKey('catlevel2.catlevel2Id'))
    cat1 = relationship("Catlevel1", back_populates="products")
    # cat2=relationship("Catlevel2", back_populates="level1")

class Catlevel1(Base):
    __tablename__ = 'catlevel1'
    catlevel1Id = Column(Integer, primary_key=True)
    catlevel1Name = Column(String)
    products = relationship("Product", back_populates="cat1")

class Catlevel2(Base):
    __tablename__ = 'catlevel2'
    catlevel2Id = Column(Integer, primary_key=True)
    categoryType = Column(String(20))
    # level1 = relationship("Product", back_populates="cat2")


engine = create_engine('sqlite:///database.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

added_products=[]
for entry2 in data:
    if 'categoryType'in entry2 and entry2.get('categoryType') not in added_products:
        new_entry2 = Catlevel2(categoryType=entry2.get('categoryType'))
        session.add(new_entry2)
        added_products.append(entry2['categoryType'])

added_products1=[] 
for entry1 in data:
    if 'catlevel1Name' in entry1 and entry2.get('catlevel1Name') not in added_products1:
        new_entry1= Catlevel1(catlevel1Name=entry1['catlevel1Name'])
        session.add(new_entry1)
        added_products1.append(entry1['catlevel1Name'])

for record in data:
    new_record = Product(uniqueId=record['uniqueId'], productUrl=record['productUrl'], productDescription=record.get('productDescription'), title=record['title'], price=record['price'])
    # new_entry1.catlevel2 = new_entry2
    # new_entry1 = db.query(where catlevel1name=record[catlevel1])
    new_record.catlevel1 = new_entry1
    session.add(new_record)

session.commit()