Bancos de dados:
```
Dei preferência por utilizar o postgresql + Mongo
    - mongo foi pedido no teste,
    - postgresql é o banco mais utilizado... Porém como estou utilizando ORM não faz diferença (o orm escolhido é bem parecido porém tenho experiência nos 4 mais famosos [mongoose, squelize, typeorm, prisma])
```

Projeto:
```
- Comecei o projeto com nest porém olhando os dados da vaga aparentemente não utilizam nest então optei por refazer com express puro.
- Utilizo o editor config para organizar os arquivos (o husky as vezes quebra.)
```

Filmes e Temas:
```
- Se ao iniciar o código alguma das 2 tabelas do Mongo estiverem vazias, o código gera as tabelas antes de dar início ao código
- Criação de temas e filmes
  - Ao criar ele pega todos que já existem e não adiciona novamente, assim evitando dados duplicados ou quebrar já que o banco esta configurado para dados únicos.
- Cron Job
  - Foi adicionado de forma simples uma cronJob que valida a cada 2 horas os temas da API
```

No código tive 2 opções:
1- Utilizar uma função que busca os filmes pelo tema puxava múltiplos filmes demorou exatamente 3 horas sem contar com os erros.
2- Consegui baixar na internet o tijolo deles porém no tijolo não possuia tema. Para corrigir isso eu teria que passar um pra um de todos os dados, lembrando que são cerca de 3 requisições por segundo.
3- Deixei o código que utilizei dentro do projeto ./PickMovies.ts (caso fiquem em dúvida de como foi feito.);

Pensei em colocar mais usuários para baixar os filmes assim aceleraria o processo, mas como tive que sair de casa aproveitei para deixar um só e não explodir meu pc.
