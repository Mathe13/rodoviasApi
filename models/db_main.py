import pymysql


def conect():
    connection = pymysql.connect(host='us-cdbr-iron-east-01.cleardb.net',
                                 user='b600a3459eda0b',
                                 password='58662102',
                                 db='heroku_d52c924751ae878',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)

    return connection
