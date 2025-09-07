import { useState, useRef, useEffect } from 'react';
import { Send, Phone, User, Clock, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { usarContextoApp } from '../../contexts/AppContext';

interface Mensagem {
  id: string;
  remetente: 'morador' | 'portaria';
  nomeRemetente: string;
  conteudo: string;
  timestamp: string;
  lida: boolean;
}

const mensagensIniciais: Mensagem[] = [
  {
    id: '1',
    remetente: 'portaria',
    nomeRemetente: 'Marcus - Portaria',
    conteudo: 'Boa tarde! Como posso ajudá-lo hoje?',
    timestamp: '14:30',
    lida: true
  },
  {
    id: '2',
    remetente: 'morador',
    nomeRemetente: 'Você',
    conteudo: 'Olá! Estou esperando uma entrega da Amazon. Podem me avisar quando chegar?',
    timestamp: '14:32',
    lida: true
  },
  {
    id: '3',
    remetente: 'portaria',
    nomeRemetente: 'Marcus - Portaria',
    conteudo: 'Claro! Vou anotar aqui. Qual o seu apartamento mesmo?',
    timestamp: '14:33',
    lida: true
  },
  {
    id: '4',
    remetente: 'morador',
    nomeRemetente: 'Você',
    conteudo: 'Apartamento 302. Obrigado!',
    timestamp: '14:34',
    lida: true
  },
  {
    id: '5',
    remetente: 'portaria',
    nomeRemetente: 'Marcus - Portaria',
    conteudo: 'Perfeito! Assim que chegar, subo para avisar. Tenha um bom dia! 👍',
    timestamp: '14:35',
    lida: true
  }
];

const statusPortaria = {
  online: true,
  nomePorteiro: 'Marcus Silva',
  turno: 'Tarde (12h às 20h)'
};

export function PaginaChat() {
  const { usuarioLogado } = usarContextoApp();
  const [mensagens, setMensagens] = useState(mensagensIniciais);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [digitando, setDigitando] = useState(false);
  const mensagensRef = useRef<HTMLDivElement>(null);

  // Auto scroll para a última mensagem
  useEffect(() => {
    if (mensagensRef.current) {
      mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight;
    }
  }, [mensagens]);

  const enviarMensagem = () => {
    if (novaMensagem.trim()) {
      const mensagem: Mensagem = {
        id: (mensagens.length + 1).toString(),
        remetente: 'morador',
        nomeRemetente: 'Você',
        conteudo: novaMensagem,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        lida: true
      };

      setMensagens([...mensagens, mensagem]);
      setNovaMensagem('');

      // Simular resposta da portaria após alguns segundos
      setTimeout(() => {
        setDigitando(true);
        setTimeout(() => {
          const respostaPortaria: Mensagem = {
            id: (mensagens.length + 2).toString(),
            remetente: 'portaria',
            nomeRemetente: 'Marcus - Portaria',
            conteudo: 'Recebi sua mensagem! Vou providenciar isso para você.',
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            lida: false
          };
          setMensagens(prev => [...prev, respostaPortaria]);
          setDigitando(false);
        }, 2000);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Chat - Portaria</h2>
        <p className="text-muted-foreground">
          Comunicação direta com a equipe da portaria
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 min-h-0">
        {/* Info da portaria */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Portaria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{statusPortaria.nomePorteiro}</p>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${statusPortaria.online ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-xs text-muted-foreground">
                      {statusPortaria.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Turno atual:</span>
                </div>
                <p className="text-xs">{statusPortaria.turno}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Informações úteis:</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>• Entregas: 8h às 18h</p>
                  <p>• Emergências: 24h</p>
                  <p>• Acesso visitantes até 22h</p>
                </div>
              </div>

              <Button variant="outline" className="w-full gap-2">
                <Phone className="h-4 w-4" />
                Ligar para Portaria
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Área do chat */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Conversa com a Portaria</CardTitle>
                <Badge variant={statusPortaria.online ? 'default' : 'secondary'}>
                  {statusPortaria.online ? 'Online' : 'Offline'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Mensagens */}
              <div 
                ref={mensagensRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {mensagens.map((mensagem) => (
                  <div
                    key={mensagem.id}
                    className={`flex ${mensagem.remetente === 'morador' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        mensagem.remetente === 'morador'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {mensagem.remetente === 'portaria' && (
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs">MS</AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium">
                            {mensagem.nomeRemetente}
                          </span>
                        </div>
                      )}
                      <p className="text-sm">{mensagem.conteudo}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className={`text-xs ${
                          mensagem.remetente === 'morador' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {mensagem.timestamp}
                        </span>
                        {mensagem.remetente === 'morador' && (
                          <div className={`w-1 h-1 rounded-full ${
                            mensagem.lida ? 'bg-blue-400' : 'bg-gray-400'
                          }`} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Indicador de digitação */}
                {digitando && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">MS</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">Marcus - Portaria</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">digitando...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input de mensagem */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Input
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="flex-1"
                    disabled={!statusPortaria.online}
                  />
                  <Button 
                    onClick={enviarMensagem}
                    disabled={!novaMensagem.trim() || !statusPortaria.online}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {!statusPortaria.online && (
                  <p className="text-xs text-muted-foreground mt-2">
                    A portaria está offline. Sua mensagem será enviada quando voltarem.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}