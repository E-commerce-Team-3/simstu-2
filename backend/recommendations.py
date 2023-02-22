import numpy as np
import pandas as pd
from .models import website_data2
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sqlalchemy import select

# from recommendations.dao.index import RecommendationsDAO
# select([website_data2.uniqueId, website_data2.productImage,website_data2.title,website_data2.price]).where(website_data2.catlevel1Name == gender ).where(website_data2.categoryType==query)
def select_id_name_list_from_products(self):
    id_name_list_from_products = select([website_data2.uniqueId, website_data2.title])
    return id_name_list_from_products

def select_name_from_id(self, product_id):
    name_from_id = select([website_data2.title]).where(website_data2.uniqueId == product_id)
    return name_from_id


def select_product_details_from_id(self, product_id):
    product_details_from_id=select([website_data2.uniqueId, website_data2.productImage,website_data2.title,website_data2.price,website_data2.productDescription]).where(website_data2.uniqueId == product_id)
    return product_details_from_id


class RecommendationsService:
    def __init__(self):
        self.tf_idf = TfidfVectorizer(stop_words='english')
        product_list = self.select_id_name_list_from_products()
        self.product_df = pd.DataFrame(product_list)
        name_matrix = self.tf_idf.fit_transform(self.product_df['name'])
        self.similarity_matrix = cosine_similarity(name_matrix, name_matrix)
        self.mapping = pd.Series(self.product_df.index,index = self.product_df['name'])

    def select_recommended_product_list(self, product_id):
        product_name = self.select_name_from_id(product_id)
        product_index = self.mapping[product_name]
        similarity_score = list(enumerate(self.similarity_matrix[product_index]))
        similarity_score = sorted(similarity_score, key=lambda x: x[1], reverse=True)
        similarity_score = similarity_score[1:5]
        product_indices = [i[0] for i in similarity_score]
        product_id_list=list(self.product_df['id'].iloc[product_indices])
        product_list=list(map(lambda x:self.dao.select_product_details_from_id(x), product_id_list))


        print("-------------------------------------")
        print(product_list)
        print("-------------------------------------")
        return product_list
    
