import os
import smtplib
from email.message import EmailMessage

GMAIL_USER = os.getenv("GMAIL_USER")
GMAIL_PASS = os.getenv("GMAIL_PASS")


def enviar_email_senha(destinatario: str, nome: str, senha: str):
    if not GMAIL_USER or not GMAIL_PASS:
        print("⚠️ [DEV-MODE] Email não enviado. Senha gerada:", senha)
        return

    msg = EmailMessage()
    msg["Subject"] = "Acesso ao MeuCondomínio"
    msg["From"] = GMAIL_USER
    msg["To"] = destinatario

    msg.set_content(
        f"Olá, {nome}!\n\n"
        f"Sua senha de acesso é: {senha}\n"
        f"Recomendamos alterar após o primeiro login.\n\n"
        "Atenciosamente,\nEquipe MeuCondomínio"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(GMAIL_USER, GMAIL_PASS)
        smtp.send_message(msg)
