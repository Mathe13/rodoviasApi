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
    print(data)
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
                sql, (data['accelerometer']['x'], data['accelerometer']['y'], data['accelerometer']['z'],
                      data['accelerometer_variation']['x'], data['accelerometer_variation']['y'], data['accelerometer_variation']['z'],
                      data['gyroscope']['x'], data['gyroscope']['y'], data['gyroscope']['z'],
                      data['gyroscope_variation']['x'], data['gyroscope_variation']['y'], data['gyroscope_variation']['z'],
                      data['location']['lat'], data['location']['lng'], data['speed'], data['acceleration'], data['datahora']))
            db.commit()

            return({"status": "sucesso"})
    except Exception as e:
        print('erro no cadastro', e)
        return ({"status": "erro", "resultado": e})
