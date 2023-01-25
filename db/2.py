import psycopg2
try:
    connection = psycopg2.connect(
        host="localhost",
        port="5432",
        user="unbxd",
        password="12345",
        database="db2"
    )
    print("Connection to the database established!")
except psycopg2.OperationalError as e:
    print("Unable to connect to the database: ", e)