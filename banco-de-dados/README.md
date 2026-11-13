# EP3 Orion: Banco de Dados

Esta pasta contém os exercícios de SQL e MongoDB. O Compose principal inicia PostgreSQL e MongoDB. Os Compose de desenvolvimento e produção também iniciam uma API pequena para consultar a coleção `posts` e demonstrar os dois ambientes pedidos no exercício 4.

## Bancos do exercício

Com Docker Desktop aberto, execute nesta pasta:

```powershell
docker compose up -d
docker compose ps
```

| Banco | Host | Porta | Banco / autenticação | Usuário | Senha |
|---|---|---:|---|---|---|
| PostgreSQL | localhost | 5432 | orion_db | orion_user | orion_password |
| MongoDB | localhost | 27017 | orion_db, autenticação em admin | orion_admin | orion_admin_pass |

MongoDB URI: `mongodb://orion_admin:orion_admin_pass@localhost:27017/orion_db?authSource=admin`

## Exercícios 1 e 2: PostgreSQL

Conecte-se ao PostgreSQL com os dados acima usando DBeaver, Beekeeper Studio ou pgAdmin. Execute `exercicio-1/exercicio-1.sql` e depois `exercicio-2/exercicio-2.sql`.

O primeiro arquivo cria as tabelas `cursos` e `alunos`, insere três cursos e quatro alunos e demonstra a relação entre as tabelas. O segundo demonstra `INNER JOIN`, filtro, atualização da matrícula de Maria e consulta extra de cursos sem alunos.

## Exercícios 3 e 4: MongoDB

Use MongoDB Compass com a URI acima, ou execute os arquivos com mongosh:

```powershell
mongosh "mongodb://orion_admin:orion_admin_pass@localhost:27017/orion_db?authSource=admin" --file exercicio-3/exercicio-3.js
mongosh "mongodb://orion_admin:orion_admin_pass@localhost:27017/orion_db?authSource=admin" --file exercicio-4/exercicio-4.js
```

Execute o exercício 3 antes do 4. O exercício 3 limpa e recria somente a coleção `posts` para permitir repetir a prática. O exercício 4 atualiza um post com comentários e filtra por tag, autor e campo aninhado.

## Docker em desenvolvimento e produção

Os dois ambientes são independentes e usam os mesmos arquivos-fonte. O banco e a API do modo dev usam as portas 5435, 27018 e 3006. O modo prod usa 5436, 27019 e 3007. As portas diferentes permitem deixar os dois ambientes no ar ao mesmo tempo.

Desenvolvimento, com volume de código e reinício automático:

```powershell
docker compose -f docker-compose.dev.yml up --build -d
```

Produção, com imagem otimizada e sem volume de código:

```powershell
docker compose -f docker-compose.prod.yml up --build -d
```

A API oferece `/health`, `/posts?tag=nosql` e `/posts?autor=Ana%20Costa`. Acesse as portas 3006 no ambiente dev e 3007 no prod. Para parar um ambiente sem apagar os dados, use o mesmo comando `docker compose -f <arquivo>` com `down`.

## Arquivos e capturas

- `docker-compose.yml`: inicia os dois bancos nas portas padrão do exercício.
- `docker-compose.dev.yml` e `docker-compose.prod.yml`: ambientes dev e prod.
- `Dockerfile`: estágio dev com nodemon e estágio production sem dependências de desenvolvimento.
- `.dockerignore`: exclui dependências locais, credenciais e capturas do contexto de build.
- `src/index.js`: API de consulta à coleção `posts`.
- `exercicio-1/` e `exercicio-2/`: scripts SQL.
- `exercicio-3/` e `exercicio-4/`: comandos MongoDB.

O enunciado pede prints dos resultados. Depois de executar, salve capturas reais em `prints/`: JOIN com alunos e cursos, atualização de Maria, documentos com e sem `tags`, post com comentários e consultas dos ambientes dev e prod. Não inclua arquivos `.env` nas capturas.
