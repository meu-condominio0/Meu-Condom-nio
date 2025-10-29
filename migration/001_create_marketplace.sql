CREATE TABLE IF NOT EXISTS marketplace (
    id_anuncio INT AUTO_INCREMENT PRIMARY KEY,    
    fk_morador INT NOT NULL,              
    titulo VARCHAR(100) NOT NULL,            
    descricao TEXT NOT NULL,                
    categoria ENUM('troca','venda','servico') NOT NULL, 
    valor DECIMAL(10,2),                               
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,   
    status ENUM('ativo','inativo') DEFAULT 'ativo',    
    FOREIGN KEY (fk_morador) REFERENCES morador(id_morador)
);