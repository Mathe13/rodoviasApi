from models import db_main


def listaOscilacao():
    db = db_main.conect()
    try:
        with db.cursor() as cursor:
            cursor.execute("select * from oscilacao")
            result = cursor.fetchall()
            # print(result)

            return({"status": "sucesso", "resultado": result})
    except Exception as e:
        print(e)
        return ({"status": "erro", "resultado": str(e)})


def addOscilacao(data):
    db = db_main.conect()
    try:
        with db.cursor() as cursor:
            sql = """INSERT INTO `oscilacao` (
                `accelerometer_x`, `accelerometer_y`, `accelerometer_z`,
                `accelerometer_variation_x`,`accelerometer_variation_y`,`accelerometer_variation_z`,
                `gyroscope_x`, `gyroscope_y`, `gyroscope_z`,
                `gyroscope_variation_x`,`gyroscope_variation_y`,`gyroscope_variation_z`,
                `lat`, `lng`,speed, acceleration, `datahora`)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s );"""
            cursor.execute(
                sql, (data['accelerometer_x'], data['accelerometer_y'], data['accelerometer_z'],
                data['accelerometer_variation_x'], data['accelerometer_variation_y'], data['accelerometer_variation_z'],
                data['gyroscope_x'], data['gyroscope_y'], data['gyroscope_z'],
                data['gyroscope_variation_x'], data['gyroscope_variation_y'], data['gyroscope_variation_z'],
                data['lat'], data['lng'], data['speed'], data['acceleration'], data['datahora']))
            db.commit()

            return({"status": "sucesso"})
    except Exception as e:
        print('erro no cadastro',e)
        return ({"status": "erro", "resultado": e})
