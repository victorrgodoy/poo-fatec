# PetLover - Sistema de Gerenciamento para Petshops

Sistema completo para gestão de clientes, pets, produtos, serviços e consumos em petshops.

### Funcionalidades Principais
- CRUD clientes e pets
- CRUD produtos e serviços
- Registro de consumo
- Top 10 clientes por quantidade consumida
- Produtos/serviços mais consumidos
- Consumo por tipo e raça de pets
- Top 5 clientes por valor consumido

### Como Executar o Projeto
#### Pré-requisitos
- Node.js 
- PostgreSQL 

### Configuração do Servidor

```bash
# Clone o repositório
https://github.com/seu_usuario/atvv-pl-typescript.git

# Acesse a pasta do servidor
cd server

# Instale as dependências
npm install

# Configure o arquivo .env
echo 'DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco?schema=public"' > .env
echo 'CORS_URL="http://localhost:5173"' >> .env
echo 'PORT=3000' >> .env

# Execute as migrações
npx prisma migrate dev --name init

# (Opcional) Popule o banco com dados iniciais
psql -U seu_usuario -d nome_banco -f database/populate.sql

# Compile o projeto TypeScript
tsc

# Inicie o servidor
node out/index.js
```

### Configuração do Client
```bash
# Acesse a pasta do cliente
cd ../client

# Instale as dependências
npm install

# Inicie o aplicativo
npm run dev
```

### Tecnologias utilizadas
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

