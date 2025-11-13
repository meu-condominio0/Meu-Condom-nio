import random
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# 🔹 Função para gerar CPF válido e aleatório
def gerar_cpf_teste():
    base = [random.randint(0, 9) for _ in range(9)]
    soma1 = sum([(10 - i) * n for i, n in enumerate(base)]) % 11
    d1 = 0 if soma1 < 2 else 11 - soma1
    soma2 = sum([(11 - i) * n for i, n in enumerate(base + [d1])]) % 11
    d2 = 0 if soma2 < 2 else 11 - soma2
    cpf = ''.join(map(str, base + [d1, d2]))
    return cpf

def gerar_email_teste():
    numero = random.randint(1000, 9999)
    return f"usuario{numero}@meucondominio.com"



# 🔹 Dados de exemplo para criação de usuário (CPF aleatório)
novo_usuario = {
    "nome": "Teste Automatizado",
   "email": gerar_email_teste(),
    "cpf": gerar_cpf_teste(),  # 👈 gera um CPF único em cada execução
    "telefone": "11999999999",
    "apartamento": "101",
    "bloco": "A",
    "tipo": "morador",
    "observacoes": "Usuário criado automaticamente pelo Pytest"
}


def test_crud_usuario_completo():
    """
    Teste de integração completo do módulo de Usuários:
    - Cria um novo usuário (POST)
    - Lista usuários (GET)
    - Atualiza informações (PUT)
    - Altera status (PUT /status)
    - Exclui o usuário (DELETE)
    """

    # 1️⃣ Criar usuário
    response = client.post("/api/usuarios", json=novo_usuario)
    assert response.status_code in [200, 201], f"Erro ao criar: {response.text}"
    data = response.json()
    usuario_id = data.get("id")
    assert usuario_id is not None, "ID não retornado na criação"
    assert data["nome"] == novo_usuario["nome"]

    # 2️⃣ Listar usuários
    response = client.get("/api/usuarios")
    assert response.status_code == 200
    usuarios = response.json()
    assert isinstance(usuarios, list)
    assert any(u["id"] == usuario_id for u in usuarios)

    # 3️⃣ Atualizar nome e bloco
    atualizacao = {"nome": "Usuário Atualizado", "bloco": "B"}
    response = client.put(f"/api/usuarios/{usuario_id}", json=atualizacao)
    assert response.status_code in [200, 201]
    atualizado = response.json()
    assert atualizado["nome"] == "Usuário Atualizado"
    assert atualizado["bloco"] == "B"

    # 4️⃣ Alterar status para 'inativo'
    response = client.put(f"/api/usuarios/{usuario_id}/status?status=inativo")
    assert response.status_code in [200, 201]
    alterado = response.json()
    assert alterado["status"] == "inativo"

    # 5️⃣ Excluir usuário
    response = client.delete(f"/api/usuarios/{usuario_id}")
    assert response.status_code in [200, 204]
    assert "Usuário excluído" in response.text


def test_listar_usuarios_vazio_ou_existente():
    """Verifica se a listagem de usuários retorna lista (mesmo se vazia)"""
    response = client.get("/api/usuarios")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
