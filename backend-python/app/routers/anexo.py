from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, status, Path
from sqlalchemy.orm import Session
from uuid import uuid4, UUID
import os
import shutil
from ..models.anexo import Anexo

from ..database import get_db
from ..schemas.anexo import Anexo as SchemaAnexo, AnexoCreate
from ..crud import crud_anexo

router = APIRouter(
    prefix="/anexos",
    tags=["Anexos"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# --- Upload de Anexo ---
@router.post("/upload", response_model=SchemaAnexo)
async def upload_anexo(
    file: UploadFile = File(...),
    nome: str = Form(...),
    categoria: str = Form(...),
    descricao: str = Form(None),
    db: Session = Depends(get_db)
):
    ext = file.filename.split(".")[-1]
    filename = f"{uuid4()}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    # Salvar o arquivo físico no servidor
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Criar registro no banco
    anexo = AnexoCreate(
        nome=nome,
        categoria=categoria,
        descricao=descricao,
        tipo=ext,
        tamanho="0 MB",
        url=f"/{UPLOAD_DIR}/{filename}"
    )
    return crud_anexo.criar_anexo(db, anexo)

# --- Listar todos os anexos ---
@router.get("/", response_model=list[SchemaAnexo])
def listar_anexos(db: Session = Depends(get_db)):
    return crud_anexo.listar_anexos(db)

# --- Excluir anexo ---
@router.delete("/{anexo_id}", response_model=SchemaAnexo)
def deletar_anexo(anexo_id: str = Path(..., description="ID do anexo"), db: Session = Depends(get_db)):
    # Converter string para UUID (proteção de erro)
    try:
        anexo_uuid = UUID(anexo_id)
    except (ValueError, TypeError):
        raise HTTPException(status_code=400, detail="ID do anexo inválido")

    anexo = crud_anexo.deletar_anexo(db, anexo_uuid)
    if not anexo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Anexo não encontrado"
        )
    return anexo
