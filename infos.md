Bancos de dados:
```
Optei por utilizar PostgreSQL junto com MongoDB.
- O Mongo foi uma exigência do teste.
- O PostgreSQL é um dos bancos mais populares, e como estou usando um ORM, a diferença entre eles acaba sendo pequena. O ORM que escolhi é bastante similar ao dos outros bancos, porém tenho experiência com os quatro mais famosos: Mongoose, Sequelize, TypeORM e Prisma.
```

Projeto:
```
- Comecei o projeto com NestJS, mas percebi que, de acordo com os requisitos da vaga, eles não utilizam Nest. Por isso, decidi reescrever tudo usando Express puro.
- Utilizo o EditorConfig para manter os arquivos organizados, pois o Husky às vezes crie algumas travas.
```

Filmes e Temas:
```
- Se, ao iniciar o código, alguma das duas tabelas do Mongo estiver vazia, o sistema gera as tabelas antes de seguir adiante.
- Criação de temas e filmes:
  - Ao criar novos registros, o código verifica todos os existentes e evita a duplicação, garantindo que os dados no banco sejam únicos.
- Cron Job:
  - Adicionei uma Cron Job de forma simples que valida os temas da API a cada duas horas.
```

Considerações do Código:
```
Tive duas opções principais:
1. Utilizar uma função que busca os filmes por tema, puxando múltiplos filmes. Essa abordagem levou exatamente 3 horas, sem contar os erros.
2. Consegui encontrar na internet o "tijolo" deles, mas ele não continha os temas. Para corrigir isso, eu teria que atualizar manualmente todos os dados, lembrando que são cerca de 3 requisições por segundo.
3. Deixei o código que utilizei dentro do projeto em `./PickMovies.ts` (caso tenham dúvidas sobre como foi feito).

Pensei em adicionar mais usuários para acelerar o download dos filmes, porém meu pc iria explodir com qualquer milimetro a mais...
```

User:
```
- Por o codigo não ser tão verboso deixei junto a parte de login com usuario e deixei o mais pratico possivel.
- A troca de senha inclui uma etapa de autenticação de 2 fatores, mas sem e-mail...
- (me) do usuario e possivel ver qual o pacote atual.
```

Pack:
```
- O sistema de packs funciona no modelo 1 para 1; ou seja, um usuário pode ter apenas um pack.
- O nome do pacote do usuário é formado pelos dois primeiros nomes, seguido da palavra "pack".
- Não é possível acessar o pack dos amiguinhos.
```

Watched:
```
- Após os filmes, a tabela "watched" foi a que mais teve alterações. Agora, um filme só pode ser assistido uma vez e os temas esperados devem vir "juntos" ao filme. Se o filme existir, mas o tema não, o sistema retornará um erro.
```
