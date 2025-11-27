import time
import os
import pymysql

MYSQL_HOST = os.getenv("MYSQL_HOST", "mysql")
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "")

print("⏳ Aguardando MySQL ficar disponível...")

while True:
    try:
        conn = pymysql.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            database=MYSQL_DATABASE,
            port=3306
        )
        conn.close()
        print("✅ MySQL está pronto!")
        break
    except Exception as e:
        print(f"⏳ Ainda aguardando MySQL... Erro: {e}")
        time.sleep(2)
