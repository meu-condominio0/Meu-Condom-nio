from sqlalchemy.orm import Session
from app.models.anuncio import AnuncioMarketplace
from app.models.usuario import Usuario # Ou Morador
from app.schemas.anuncio import AnuncioCreate
from decimal import Decimal
from fastapi import HTTPException, status as status_http

class AnuncioCRUD:
    
    def create_anuncio(self, db: Session, anuncio: AnuncioCreate, morador_id: int):
        
        # 1. Validação de Regra de Negócio (Consistência do Valor)
        if anuncio.categoria == 'venda' and anuncio.valor is None:
            raise HTTPException(
                status_code=status_http.HTTP_400_BAD_REQUEST,
                detail="Para a categoria 'venda', o campo valor é obrigatório."
            )
        
        # 2. Validação de Morador (Garantia de que o fk_morador existe e está ativo)
        morador = db.query(Usuario).filter(Usuario.id_morador == morador_id).first()
        if not morador or not morador.ativo:
             raise HTTPException(
                status_code=status_http.HTTP_401_UNAUTHORIZED,
                detail="Morador não autorizado ou inativo para criar anúncios."
            )
        
        # 3. Preparação dos Dados e Persistência
        
        # Garante que o valor é None/Null no DB para categorias que não são 'venda'
        valor_final = anuncio.valor if anuncio.categoria == 'venda' else None

        db_anuncio = AnuncioMarketplace(
            fk_morador=morador_id,
            titulo=anuncio.titulo,
            categoria=anuncio.categoria,
            subcategoria=anuncio.subcategoria,
            descricao=anuncio.descricao,
            telefone=anuncio.telefone,
            whatsapp=anuncio.whatsapp,
            valor=valor_final,
            status='ativo' # Garante que o status inicial é 'ativo' (Auditável)
        )

        db.add(db_anuncio)
        db.commit()
        db.refresh(db_anuncio)
        
        # Log de Auditoria (Opcional, mas recomendado)
        # log_auditoria_service.registrar("Marketplace", db_anuncio.id_anuncio, "CRIACAO", morador_id)
        
        return db_anuncio

# Instância para uso nas rotas
crud_anuncio = AnuncioCRUD()