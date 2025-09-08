# Relatórios do Sistema

Este documento resume os relatórios financeiros e administrativos disponíveis e aponta propostas de implementação para os que ainda não existem.

## Funcionalidades existentes

- **Balancete sintético/analítico**: funções utilitárias para gerar ambos os formatos estão em `utils/balancetes.ts`.
- **Extrato financeiro por período**: página com filtros de data e exportação em CSV localizada em `components/paginas/PaginaExtratoFinanceiro.tsx`.
- **Inadimplência**: dashboard para gestão de unidades inadimplentes e geração de carta de cobrança em `components/paginas/PaginaInadimplencia.tsx`.
- **Acordos de cobrança**: cálculo de acordo com parâmetros customizáveis e geração de contrato em `components/paginas/PaginaAcordos.tsx`.
- **Relatórios gerais**: visualização de relatórios mockados (financeiro, reservas, ocorrências, acessos) com gráficos em `components/paginas/PaginaRelatorios.tsx`.

## Funcionalidades a implementar

- **Relatório de composição de receita**: criar página específica com filtros avançados de origem de receitas e exportação.
- **Comprovante de despesas com anexos**: permitir upload e armazenamento de comprovantes associados a lançamentos de despesa.
- **Carta de nada consta/adimplência**: gerar declaração para unidades sem pendências financeiras.
- **Demonstrativo anual**: consolidar receitas e despesas do ano com comparativos mensais.

Cada nova funcionalidade deve ser exposta como página/endpoint próprio, sem alterar componentes existentes, e oferecer filtros avançados e acesso via web/app.

