<p align="center">
    <b>Teste para empresa Vylex</b>
    <h4 align="center">Código feito para gestão de filmes assistidos</h4>
</p>

---
### 🛠 Techs
  - [Node.js](https://nodejs.org/en/)
  - [Express](https://expressjs.com/pt-br/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Prisma](https://www.prisma.io/?via=start&gad_source=1)
  - [MongoDB](https://www.mongodb.com/products/platform/atlas-database)
---

## :mega: About
Este projeto foi desenvolvido com o intuito de gerenciar os filmes assistidos pelos usuários, garantindo que eles possam registrar apenas aqueles que inseriram no sistema. A aplicação tem como objetivo oferecer uma experiência de organização e controle sobre o que foi assistido, com um sistema que evita duplicações e garante a integridade dos dados.

## Running

#### :floppy_disk: Cloning
```ps
  # Clone o repositório utilizando o git
  $ git clone https://github.com/BrenoVieira41/test-vylex.git

```
#### :gift: Installation

```bash
$ npm install
```

#### run migration
```bash
- criar ou adicionar .env

# run migration
npx prisma migrate dev

# caso não possua algo para rodar visualizar o codigo
npx prisma studio
```

#### :arrow_forward: Running code
```bash
# prod mode
$ npm run build
$ npm run start

# dev mode
$ npm run dev
```

#### :watch: Init Cron
```bash
# iniciar agendamento
$ npm run cron
```

#### :whale: Running docker
```bash
# Inicie os containers
$ docker-compose up
```
