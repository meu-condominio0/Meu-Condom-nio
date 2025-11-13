🏢 Meu Condomínio — Sistema de Gerenciamento Condominial

Aplicação completa para controle de moradores, visitantes e serviços de condomínios,
desenvolvida com FastAPI (backend), React + Vite (frontend) e MySQL (banco de dados).

Suporte total à execução:

🔹 Local (modo desenvolvedor)

🔹 Docker (modo integrado produção/dev)

🧰 Pré-requisitos

Antes de rodar o projeto, verifique se possui:

🐳 Docker e Docker Compose instalados

🐍 Python 3.12+ (para rodar localmente)

⚙️ Node.js 20+ (para frontend local)

🔓 Portas 80 e 8000 livres no sistema

⚙️ 1. Clonar o repositório
git clone https://github.com/SeuUsuario/Meu-Condominio.git
cd Meu-Condominio

🧱 2. Subir os containers (modo Docker)

O comando abaixo cria e inicia automaticamente:

🐬 Banco de dados MySQL

🐍 Backend FastAPI

⚛️ Frontend React

docker-compose up --build


⏳ Aguarde até aparecer:

✅ Banco pronto, iniciando o backend...
INFO:     Uvicorn running on http://0.0.0.0:8000

🌐 3. Acessar o sistema
Serviço	Endereço	Descrição
🖥️ Frontend	http://localhost
	Interface React (usuário)
🧠 API	http://localhost:8000/docs
	Documentação Swagger do backend
🧩 Estrutura dos containers
Serviço	Porta	Descrição
frontend	80	Interface React (Vite + Nginx)
backend	8000	API FastAPI
meu-condominio-db	3308	Banco MySQL
🧠 Banco de Dados

O banco é criado automaticamente via SQLAlchemy.

Nome: condominio_system

📂 Localização dos dados (volume persistente):

./mysql_data/


🔄 Resetar o banco (recriar do zero):

docker-compose down
Remove-Item -Recurse -Force .\mysql_data
docker-compose up --build


💡 Em Linux/Mac use:

rm -rf ./mysql_data

🧱 Estrutura técnica
🐍 Backend (/backendpy)

Framework: FastAPI

ORM: SQLAlchemy

Banco: MySQL

Validação: Pydantic v2

Rotas principais:

/api/usuarios

/api/visitante

/api/anexos

⚛️ Frontend (raiz do projeto)

Framework: React + Vite

Linguagem: TypeScript

UI: Shadcn/UI + Lucide Icons + TailwindCSS

🧩 Comandos úteis do Docker
Comando	Descrição
docker-compose up -d	Sobe os containers em background
docker-compose logs -f	Exibe logs em tempo real
docker-compose down	Para e remove containers
docker exec -it condominio_db_container mysql -u root -p	Acessa o MySQL diretamente no container
🧰 Execução manual (modo desenvolvedor)
🔹 Backend local (FastAPI)

Com o Python instalado:

cd backendpy
.\start_local.ps1


O script ativa o ambiente virtual, instala dependências (se faltarem) e inicia o servidor automaticamente.
O backend ficará disponível em:
👉 http://127.0.0.1:8000/docs

🔹 Frontend local (React + Vite)

Com o Node.js instalado:

npm install
npm run dev


O frontend será acessível em:
👉 http://localhost:5173

❗ Erros Comuns e Soluções Rápidas
🐍 exec ./start.sh: no such file or directory

Causa:
O arquivo start.sh foi salvo com quebras de linha no formato Windows (CRLF)
e o Linux não conseguiu interpretá-lo.

Solução:

No VS Code, clique em CRLF (canto inferior direito) → selecione LF

Salve o arquivo

Rode:

dos2unix backendpy/start.sh
docker-compose down -v
docker-compose up --build


💡 Dica: o repositório possui .gitattributes que já força LF automaticamente.

🐳 container is restarting ou backend exited with code 255

Causa:
O backend entrou em loop porque o start.sh falhou ao executar.

Solução:

Verifique se o start.sh existe dentro do container:

docker exec -it backend sh
ls /app


Se o arquivo não estiver lá, revise os volumes do docker-compose.yml.

⚙️ uvicorn : comando não reconhecido

Causa:
Você tentou rodar o backend localmente sem ativar o ambiente virtual.

Solução:

cd backendpy
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload

🧱 ExecutionPolicy bloqueando .ps1

Causa:
O Windows bloqueia scripts PowerShell por segurança.

Solução (rodar como administrador):

Set-ExecutionPolicy RemoteSigned


Depois:

.\start_local.ps1

🐬 Banco não conecta (erro 2002 ou 10061)

Causa:
O backend iniciou antes do MySQL estar pronto.

Solução:
O docker-compose.yml já tem depends_on e healthcheck.
Se mesmo assim ocorrer, rode novamente:

docker-compose down -v
docker-compose up --build

⚠️ UserWarning: 'orm_mode' has been renamed to 'from_attributes'

Causa:
Aviso da migração do Pydantic v1 → v2.

Solução (opcional):

class Config:
    orm_mode = True


Troque por:

class Config:
    from_attributes = True