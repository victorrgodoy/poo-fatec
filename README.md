# Atividade 4 - Integração Front-end e Back-end RESTful

Este projeto tem como objetivo desenvolver uma aplicação **front-end em React** capaz de se comunicar com um **micro-serviço back-end RESTful** já existente. A aplicação realiza operações de **listagem, cadastro, atualização e exclusão de clientes** por meio de requisições HTTP utilizando o formato JSON.

> O back-end já está implementado parcialmente em **Java** e não será modificado. Ele está disponível em um arquivo executável `.jar` com base de dados em memória, pronto para uso em ambiente local.

## Funcionalidades Implementadas

- Listagem de todos os clientes
- Cadastro de um novo cliente
- Atualização de dados de cliente existente
- Exclusão de cliente

## Tecnologias Utilizadas

- **React** – com **componentes funcionais** e uso de **hooks**
- **TypeScript** – para tipagem estática e segurança de tipos
- **Ant Design** – para layout 
- **Vite** – *build tool* moderna para desenvolvimento rápido

##  Como Executar o Projeto

Certifique-se de ter a **Java Virtual Machine (JVM) versão 17 ou superior** instalada.

```bash
-- server
cd backend/executavel
java -jar pl.jar

--- client
cd frontend
npm install
npm run dev
```