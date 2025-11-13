import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_rota_principal():
    response = client.get("/")
    assert response.status_code == 200
    # Verifica se a mensagem esperada está presente
    assert "Backend Condomínio rodando" in response.text
