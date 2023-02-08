

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
import json

engine = create_engine('postgresql://unbxd:12345@localhost:5432/db2')

Base = declarative_base()

with open('out.json', 'r') as f:
    data = json.load(f)

class Example(Base):
    __tablename__ = 'website_data1'
    # id = Column(Integer, primary_key=True)
    color = Column(String)
    categoryType = Column(String)
    productUrl = Column(String)
    availability =Column(String)
    size =Column(String)
    category =Column(String)
    productDescription =Column(String)
    catlevel2Name =Column(String)
    title =Column(String)
    sku =Column(String)
    price =Column(String)
    catlevel3Name =Column(String)
    catlevel1Name =Column(String)
    name =Column(String)
    gender=Column(String)
    catlevel4Name=Column(String)
    uniqueId=Column(String, primary_key=True)
Base.metadata.create_all(engine)
for item in data:
    engine.execute(Example.__table__.insert(), item)