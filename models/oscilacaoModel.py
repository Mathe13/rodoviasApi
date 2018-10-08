from models import db_main

def listaOscilacao():
    db = db_main.conect()
    try:
        with db.cursor()  as cursor:
            cursor.execute("select * from oscilacao")
            result = cursor.fetchall()
            # print(result)

            return({"status":"sucesso","resultado":result})
    except Exception as e:
        return ({"status":"erro","resultado":e})

def addOscilacao(data):
    db = db_main.conect()
    try:
        with db.cursor()  as cursor:
            sql= "INSERT INTO `oscilacao` (`x`, `y`, `z`, `lat`, `lng`, `datahora`) VALUES (%s, %s, %s, %s, %s, %s);"
            cursor.execute(sql,(data['x'],data['y'],data['z'],data['lat'],data['lng'],data['datahora']))
            db.commit()

            return({"status":"sucesso"})
    except Exception as e:
        return ({"status":"erro","resultado":e})
