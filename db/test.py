CATEGORY_TABLE_DROP = "DROP TABLE IF EXISTS category"
PRODUCT_TABLE_DROP = "DROP TABLE IF EXISTS product"

PRODUCT_TABLE_CREATE = """
CREATE TABLE product
(
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  price FLOAT NOT NULL,
  availability BOOLEAN NOT NULL,
  productDescription TEXT,
  productImageUrl TEXT NOT NULL,
  PRIMARY KEY (id)
);
"""

CATEGORY_TABLE_CREATE = """
CREATE TABLE category
(
  productId TEXT NOT NULL,
  categoryName TEXT,
  parentCategoryName TEXT NOT NULL,
  FOREIGN KEY (productId) REFERENCES product(id) ON UPDATE CASCADE ON DELETE CASCADE
);
"""

import psycopg
import json

host, dbname, user, password, port = ("/tmp", "postgres", "unbxd", "unbxd", 5432)
with psycopg.connect(
    "host={} dbname={} user={} password={} port={}".format(
        host, dbname, user, password, port
    )
) as conn:
    with conn.cursor() as cur:

        # drop tables if already existing
        cur.execute(CATEGORY_TABLE_DROP)
        cur.execute(PRODUCT_TABLE_DROP)

        # create tables
        cur.execute(PRODUCT_TABLE_CREATE)
        cur.execute(CATEGORY_TABLE_CREATE)

        # insert to tables
        # NOTE: inserting values this via psycopg (not psycopg2) in the below manner (parametrized) prevents sql injection
        product_table_insert = "INSERT INTO product (id, name, title, price, availability, productDescription, productImageUrl) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        category_table_insert = "INSERT INTO category (productId, categoryName, parentCategoryName) VALUES (%s, %s, %s)"
        color_table_insert = (
            "INSERT INTO color (productId, productColor) VALUES (%s, %s)"
        )

        with open("./out.json") as f:
            data_iter = json.load(f)
            for data in data_iter:

                # INSERT TO PRODUCT TABLE
                cur.execute(
                    product_table_insert,
                    (
                        data["uniqueId"],
                        data["name"],
                        data["title"],
                        data["price"],
                        data["availability"],
                        data.get("productDescription", ""),
                        data["productImage"],
                    ),
                )

                # insert to category table
                cur.execute(
                    category_table_insert,
                    (
                        data["uniqueId"],
                        data.get("catlevel2Name", ""),
                        data["catlevel1Name"],
                    ),
                )

        conn.commit()

        product_table_select = "SELECT * FROM product"
        category_table_select = "SELECT * FROM category"

        product_table_details = cur.execute(product_table_select).fetchall()
        category_table_details = cur.execute(category_table_select).fetchall()

        for i in range(len(product_table_details)):
            print(product_table_details[i])
        print()
        # for i in range(len(category_table_details)):
        #     print(category_table_details[i])
        # print()
