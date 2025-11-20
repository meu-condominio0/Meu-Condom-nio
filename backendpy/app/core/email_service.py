# app/core/email_service.py

import smtplib
from email.mime.text import MIMEText
from os import getenv
from dotenv import load_dotenv

load_dotenv()  # carrega o .env

EMAIL_HOST = getenv("EMAIL_HOST")
EMAIL_PORT = int(getenv("EMAIL_PORT", "587"))
EMAIL_USER = getenv("EMAIL_USER")
EMAIL_PASS = getenv("EMAIL_PASS")

def enviar_email(destinatario: str, assunto: str, mensagem: str):
    print("🔵 Entrou na função enviar_email")
    print("HOST:", EMAIL_HOST)
    print("PORT:", EMAIL_PORT)
    print("USER:", EMAIL_USER)
    print("PASS existe?:", EMAIL_PASS is not None)

    msg = MIMEText(mensagem, "html")
    msg["Subject"] = assunto
    msg["From"] = EMAIL_USER
    msg["To"] = destinatario

    try:
        print("🟡 Conectando ao servidor SMTP...")
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as smtp:
            print("🟡 Iniciando TLS...")
            smtp.starttls()
            print("🟡 Fazendo login...")
            smtp.login(EMAIL_USER, EMAIL_PASS)
            print("🟢 Login OK!")
            print("🟡 Enviando e-mail...")
            smtp.sendmail(EMAIL_USER, destinatario, msg.as_string())
            print("🟢 E-mail enviado com sucesso!")
    except Exception as e:
        print("❌ ERRO SMTP:", e)
        raise e