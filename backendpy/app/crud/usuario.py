from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from ..models.usuario import Usuario
from ..schemas.usuario import UsuarioCreate, UsuarioUpdate, TipoUsuario, StatusUsuario, UsuarioResponse
from datetime import date

def usuario_to_response(usuario: Usuario) -> UsuarioResponse:
      data_ultimo = usuario.data_ultimo_acesso.strftime('%Y-%m-%d') if usuario.data_ultimo_acesso else 'Nunca'
      data_cad = usuario.data_cadastro.strftime('%Y-%m-%d') if usuario.data_cadastro else ''
      
      return UsuarioResponse(
          id=usuario.id,
          nome=usuario.nome,
          email=usuario.email,
          telefone=usuario.telefone,
          apartamento=usuario.apartamento,
          bloco=usuario.bloco,
          tipo=usuario.tipo,
          status=usuario.status,
          dataUltimoAcesso=data_ultimo,
          dataCadastro=data_cad,
          observacoes=usuario.observacoes
      )

def create_usuario(db: Session, usuario: UsuarioCreate, created_by: int):
      # Verifica email único
      existing = db.query(Usuario).filter(Usuario.email == usuario.email).first()
      if existing:
          raise ValueError("Email já cadastrado")
      
      db_usuario = Usuario(
          nome=usuario.nome,
          email=usuario.email,
          telefone=usuario.telefone,
          apartamento=usuario.apartamento,
          bloco=usuario.bloco,
          tipo=usuario.tipo,
          status='ativo',  # Default
          data_ultimo_acesso=None,  # 'Nunca'
          observacoes=usuario.observacoes,
          created_by=created_by
      )
      db.add(db_usuario)
      db.commit()
      db.refresh(db_usuario)
      return db_usuario

def get_usuarios(db: Session, skip: int = 0, limit: int = 100, search: str = None, tipo: TipoUsuario = None, status: StatusUsuario = None):
      query = db.query(Usuario)
      if search:
          query = query.filter(
              or_(
                  func.lower(Usuario.nome).contains(search.lower()),
                  func.lower(Usuario.email).contains(search.lower()),
                  Usuario.apartamento.contains(search),
                  func.lower(Usuario.bloco).contains(search.lower())
              )
          )
      if tipo:
          query = query.filter(Usuario.tipo == tipo)
      if status:
          query = query.filter(Usuario.status == status)
      return query.offset(skip).limit(limit).all()

def update_usuario_status(db: Session, usuario_id: int, status: StatusUsuario):
      usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
      if not usuario:
          raise ValueError("Usuário não encontrado")
      usuario.status = status
      db.commit()
      db.refresh(usuario)
      return usuario

def delete_usuario(db: Session, usuario_id: int):
      usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
      if not usuario:
          raise ValueError("Usuário não encontrado")
      db.delete(usuario)
      db.commit()
      return True

def redefinir_senha(db: Session, usuario_id: int):
      usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
      if not usuario:
          raise ValueError("Usuário não encontrado")
      # Simula: Atualiza data de acesso
      usuario.data_ultimo_acesso = date.today()
      db.commit()
      return {"message": "Senha redefinida e enviada por email (simulado)"}
  