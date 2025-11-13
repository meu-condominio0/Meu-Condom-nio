import pytest
from fastapi.testclient import TestClient
from app.main import app # Importa a instância principal do seu FastAPI
from app.models.anuncio import AnuncioMarketplace
from app.database import TestingSessionLocal, Base, engine

# 1. Configuração do Banco de Dados de Teste (Mock ou DB temporário)
# Se você usar um DB de teste, ajuste esta seção:
@pytest.fixture(scope="module")
def client():
    # Cria as tabelas (Se estiver usando um DB de teste em memória ou Docker)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
    # Derruba as tabelas ao final
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def db_session():
    # Cria uma sessão limpa para cada teste
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# 2. Testes de Integração (Testando o Endpoint)

def test_criar_anuncio_venda_sucesso(client, db_session):
    # Mock do morador_id = 1 (Ajuste conforme a necessidade de mock do seu Morador)
    
    dados = {
        "titulo": "Vendo Bicicleta Usada",
        "categoria": "venda",
        "descricao": "Bicicleta semi-nova, ótimo estado.",
        "valor": 500.00
    }
    
    # O mock de autenticação deve garantir que get_current_morador_id retorna um ID válido
    response = client.post("/marketplace/anuncios", json=dados) 

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["titulo"] == "Vendo Bicicleta Usada"
    assert data["valor"] == 500.0
    assert data["status"] == "ativo"
    assert data["fk_morador"] == 1 # Checa a auditoria/segurança


def test_criar_anuncio_venda_sem_valor_deve_falhar(client):
    dados_invalido = {
        "titulo": "Vendo Carro",
        "categoria": "venda",
        "descricao": "Falta o valor"
        # 'valor' está faltando
    }
    
    response = client.post("/marketplace/anuncios", json=dados_invalido) 

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY # Erro Pydantic
    # Se o Pydantic passar, a camada CRUD deve capturar:
    # assert response.json()["detail"] == "Para a categoria 'venda', o campo valor é obrigatório."