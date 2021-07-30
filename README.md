<br>
<div align="center">
  <img src="https://github.com/andraderafa72/myfinances/blob/master/src/assets/logo.svg" alt="dtmoney" width="300px" />
</div>

<br>
<p align="center">
  <i>Uma API para uma plataforma de controle de finanças</i>
  <div align="center">
    <a href="https://"><img src="https://img.shields.io/static/v1?label=&message=Typescript&color=%231570B6&style=for-the-badge&logo=typescript&logoColor=whitesmoke" alt="Typescript"> </a>
    <a href="https://"><img src="https://img.shields.io/static/v1?label=&message=Node.js&color=darkgreen&style=for-the-badge&logo=node.js&logoColor=whitesmoke" alt="Node.js"> </a>
    <a href="https://"><img src="https://img.shields.io/static/v1?label=&message=MongoDB&color=green&style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"> </a>
</div>
</p> <br>

![Dt money](https://i.ibb.co/McdPwfx/screencapture-localhost-3000-2021-07-29-13-18-00.png)

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-uso-da-api">Uso da API</a>
</p>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/pt-br)
 
 ## 💻 Projeto

API desenvolvida para ser integrada na plataforma <a href="https://github.com/andraderafa72/myfinances">MyFinances</a>

## 🚀 Como executar

- Clone o repositório
- Instale as dependências com `npm i`
- Inicie o servidor com `npm start`

Agora você pode conectar a API pelo endereço: [`localhost:3334`](http://localhost:3334).

<br>

# 🌌 Uso da API
✔️ API rodando em produção

<ul>
  <li><a href="#-registro-de-usuario">Registro de usuário</a> </li>
  <li><a href="#-autenticaçao-com-token">Autenticação</a> </li>
  <li><a href="#-como-executar">Cadastro de transação</a> </li>
  <li><a href="#-listar-transaçoes">Listar Transações</a></li>
  <li><a href="#-listar-transaçao">Listar Transação</a></li>
</ul>

Link para API em produção: [`https://myfinances-web.herokuapp.com`](https://myfinances-web.herokuapp.com) <br>
Usa o Insomnia para fazer suas requests? [Baixe e importe a collection aqui](https://github.com/andraderafa72/my-finances-api/blob/master/insomnia.MyFinancesApi.json)

<br>

## 🕵🏻 Registro de usuário

É necessário a criação de um `User` com email e senha:

- Método: `POST` 
- Rota em desenvolvimento: `http://localhost:3334/user/create`
- Rota em produção: `https://myfinances-web.herokuapp.com/user/create`

### 💪 Body
```json
{
  "name": "Rafael Andrade",
  "email": "rafa@email.com",
  "password": "secretpassword"
}
```

### 📝 Response 
```json
{
  "status": "Created Successfully!",
  "user": {
    "name": "Rafael Andrade",
    "email": "rafa@email.com",
    "password": "Sua senha criptografada"
  }
}
```

<br>

## 🕵🏻 Autenticação com Token
Após a criação de um `User`, gere seu token de acesso:

- Método: `POST` 
- Rota em desenvolvimento: `http://localhost:3334/api/auth`
- Rota em produção: `https://myfinances-web.herokuapp.com/api/auth`

#### 💪 Body
```json
{
  "email": "rafa@email.com",
  "password": "secretpassword"
}
```

#### 📝 Response 
```json
{
  "status": "Authenticated!",
  "token": "Seu Token de Acesso"
}
```

<i>Após gerar esse token, guarde ele com carinho! Você vai precisar dele para ter acesso às próximas requisições.</i>

<br>

## 💰 Criar de transação
- Método: `POST` 
- Rota em desenvolvimento: `http://localhost:3334/transactions/`
- Rota em produção: `https://myfinances-web.herokuapp.com/transactions/`


Agora que você criou seu usuário e guardou seu token, para criar uma transação vamos precisar de:

#### ⚙ Headers
```js
{
  `authorization`: `Bearer ${oTokenQueVocêGuardou}`,
}
```

#### 💪 Body
```json
{
	"title": "Desenvolvimento de API",
	"amount": 1100,
	"category": "Desenvolvimento",
	"type": "deposit"
}
```

#### 📝 Isso vai nos retornar:
```json
{
  "status": "Created Successfully!",
  "transaction": {
    "title": "Desenvolvimento de API",
    "amount": 1100,
    "type": "deposit",
    "category": "Desenvolvimento",
    "user": "6100280aabccc225cc7b369b"
  }
}
```

## 💰 Listar transações

- Método: `GET` 
- Rota em desenvolvimento: `http://localhost:3334/transactions/`
- Rota em produção: `https://myfinances-web.herokuapp.com/transactions/`


#### ⚙ Headers
```js
{
  `authorization`: `Bearer ${oTokenQueVocêGuardou}`,
}
```

#### 📝 Response 
```json
{
  "transactions": [
    {
      "createdAt": "DataDeCriação",
      "_id": "IdDaTransacao",
      "title": "Desenvolvimento de API",
      "amount": 1100,
      "type": "deposit",
      "category": "Desenvolvimento",
      "user": "IdDoUser"
    }
  ]
}
```

## 💰 Listar Transação
- Método: `GET` 
- Rota em desenvolvimento: `http://localhost:3334/transactions/:idDaTransação`
- Rota em produção: `https://myfinances-web.herokuapp.com/transactions/:idDaTransação`


#### ⚙ Headers
```js
{
  `authorization`: `Bearer ${oTokenQueVocêGuardou}`,
}
```

#### 📝 Response 
```json
{
  "transactions": {
      "createdAt": "DataDeCriação",
      "_id": "IdDaTransacao",
      "title": "Desenvolvimento de API",
      "amount": 1100,
      "type": "deposit",
      "category": "Desenvolvimento",
      "user": "IdDoUser"
    }
}
```

<br>

Made with 💜 by Rafael Andrade 👋 [Check out my LinkedIn](https://www.linkedin.com/in/andraderafa72)
