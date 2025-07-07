# Pet Lovers (CLI) - Atividade 1

Sistema em **TypeScript** desenvolvido para gerenciamento de **pet shops e clínicas veterinárias**, com interface de linha de comando (**CLI**). Todos os dados são armazenados **em memória** durante a execução.

## Funcionalidades Implementadas

- **CRUD de Clientes**
  - Cadastro, listagem, atualização e remoção de clientes.
  - Registro de CPF, RGs e telefones.
  
- **CRUD de Pets**
  - Cada cliente pode ter múltiplos pets cadastrados.
  - Informações como nome, tipo, raça e sexo.

- **CRUD de Produtos e Serviços**
  - Cadastro, edição, remoção e listagem de produtos e serviços disponíveis.

- **Registro de Consumo**
  - Registro dos produtos e serviços consumidos por cada cliente.
  - Associação do consumo aos pets do cliente.

- **Relatórios e Estatísticas**
  - Top 10 clientes que mais consumiram (por quantidade).
  - Top 5 clientes que mais gastaram (por valor).
  - Itens (produtos e serviços) mais consumidos no geral.
  - Itens mais consumidos por tipo e raça de pet.

## Tecnologias Utilizadas
- **TypeScript**
- **Node.js**

### Execução
   ```bash
   npm install
   tsc
   node out/app.js
   ```