from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db # Função para obter a sessão do DB
from app.crud.anuncio import crud_anuncio
from app.schemas.anuncio import AnuncioCreate, Anuncio

router = APIRouter(
    prefix="/marketplace",
    tags=["Marketplace Anúncios"]
)

# Assumindo que você tem uma função que retorna o ID do Morador autenticado
def get_current_morador_id():
    # Esta função DEVE ser implementada com sua lógica de autenticação (JWT, etc.)
    # Por enquanto, retorna um ID fixo para teste:
    return 1 # ID do morador autenticado

@router.post(
    "/anuncios", 
    response_model=Anuncio, 
    status_code=status.HTTP_201_CREATED,
    summary="Cria um novo anúncio no Marketplace"
)
def create_anuncio_endpoint(
    anuncio_in: AnuncioCreate, # Dados validados pelo Pydantic
    db: Session = Depends(get_db),
    morador_id: int = Depends(get_current_morador_id) # Pega o ID do usuário logado
):
    """
    Cria um novo anúncio verificando:
    1. Validação de formato (feita pelo Pydantic na entrada).
    2. Regra de negócio: valor obrigatório se categoria for 'venda'.
    3. FK_Morador é inserido automaticamente pelo usuário logado (auditável).
    """
    
    # A lógica complexa e a persistência estão no CRUD/Service
    novo_anuncio = crud_anuncio.create_anuncio(db=db, anuncio=anuncio_in, morador_id=morador_id)
    
    return novo_anuncio