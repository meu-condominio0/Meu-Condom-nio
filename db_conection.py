import mysql.connector
import os
from dotenv import load_dotenv

# Carrega o arquivo .env
load_dotenv()

def conectar():
    try:
        conexao = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )

        print("✅ Conexão com o banco bem-sucedida!")
        return conexao

    except mysql.connector.Error as err:
        print(f"❌ Erro ao conectar: {err}")
        return None
