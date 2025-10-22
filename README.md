🧰 Pré-requisitos

Docker e Docker Compose instalados

Portas 80 e 8000 livres no sistema

⚙️ 1. Clonar o repositório
git clone https://github.com/SeuUsuario/Meu-Condominio.git
cd Meu-Condominio

🧱 2. Subir os containers

O comando abaixo cria e inicia:

Banco de dados MySQL

Backend FastAPI

Frontend React

docker-compose up --build


⏳ Aguarde até aparecer:

✅ Banco pronto, iniciando o backend...
INFO: Uvicorn running on http://0.0.0.0:8000

🌐 3. Acessar o sistema

Frontend (interface): http://localhost

API (Swagger): http://localhost:8000/docs

⚙️ Estrutura dos containers
Serviço	Porta	Descrição
frontend	80	Interface React
backend	8000	API FastAPI
meu-condominio-db	3308 (externa)	Banco MySQL
🧩 Banco de Dados

O banco é criado automaticamente pelo SQLAlchemy, com o nome:

condominio_system


📁 Os dados ficam salvos em:

./mysql_data/

🔄 Para resetar o banco (recriar do zero):
docker-compose down
Remove-Item -Recurse -Force .\mysql_data
docker-compose up --build


💡 (Se estiver no Linux/Mac, use rm -rf ./mysql_data em vez de Remove-Item.)

🧠 Estrutura técnica
🐍 Backend (backendpy)

Framework: FastAPI

ORM: SQLAlchemy

Banco: MySQL

Validação: Pydantic v2

Rotas:

/api/usuarios

/api/visitante

/api/anexos

⚛️ Frontend (raiz do projeto)

Framework: React + Vite

Linguagem: TypeScript

UI: Shadcn + Lucide Icons + TailwindCSS

🧩 Comandos úteis do Docker
Comando	Descrição
docker-compose up -d	Sobe os containers em background
docker-compose logs -f	Exibe logs em tempo real
docker-compose down	Para e remove containers
docker exec -it condominio_db_container mysql -u root -p	Acessa o MySQL no container

===========

🧰 Execução manual (modo dev)

Durante o desenvolvimento local, você pode rodar apenas o backend com:

cd backendpy
uvicorn app.main:app --reload


E o frontend com:

npm run dev


🧩 Status do projeto
Componente	Status
Backend	✅ Estável
Frontend	✅ Integrado
Banco MySQL	✅ Automático
CORS	✅ Configurado (localhost e Docker)