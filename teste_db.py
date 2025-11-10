from db_conection import conectar

con = conectar()

if con:
    con.close()