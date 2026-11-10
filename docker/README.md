# EP2 - ORION | Docker e Docker Compose

Projeto de estudo organizado em quatro etapas. Os exercícios usam Node.js e, a partir do exercício 2, PostgreSQL.

## Antes de começar

- Docker Desktop instalado e aberto.
- Terminal aberto nesta pasta (`docker`).

Confira a instalação com `docker --version` e `docker compose version`.

## Exercício 1 — Hello Container

```powershell
cd exercicio-1
docker compose up --build
```

Abra <http://localhost:3001>. Deve aparecer `Hello from Docker!`. Para encerrar, use `Ctrl+C` e depois `docker compose down`.

Observe `Dockerfile`, `.dockerignore`, `compose.yaml`, `src/server.js` e o mapeamento da porta `3001:3000`.

## Exercício 2 — API e banco

```powershell
cd ..\exercicio-2
Copy-Item .env.example .env
docker compose up --build
```

Teste <http://localhost:3002/health> e <http://localhost:3002/messages>. Para gravar uma mensagem:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3002/messages -ContentType 'application/json' -Body '{"text":"Minha primeira mensagem no PostgreSQL"}'
```

O banco usa o hostname `db` dentro da rede Docker. O volume `postgres_data` mantém os dados mesmo após `docker compose down`. Para apagar os dados também, use `docker compose down -v`.

## Exercício 3 — Desenvolvimento e produção

Use os mesmos dados e a API do exercício 2, com dois Compose independentes:

```powershell
cd ..\exercicio-3
Copy-Item .env.example .env
docker compose -f compose.dev.yaml up --build
```

O modo dev monta `src` como volume e reinicia a API quando o código muda. Em outro terminal, confira `http://localhost:3003/health`. Para parar, `docker compose -f compose.dev.yaml down`.

```powershell
docker compose -f compose.prod.yaml up --build -d
```

O modo prod usa estágio final enxuto, sem volume de código. Confira `http://localhost:3004/health`. Pare com `docker compose -f compose.prod.yaml down`.

## Desafio extra — API, PostgreSQL e Adminer

```powershell
cd ..\exercicio-extra
Copy-Item .env.example .env
docker compose up --build -d
```

- API: <http://localhost:3005/health> e <http://localhost:3005/messages>
- Adminer: <http://localhost:8080>

No Adminer, selecione **PostgreSQL** e use servidor `db`, usuário `orion`, senha `orion_dev_password` e banco `orion`. Crie uma mensagem pela API e consulte a tabela `messages`.

Pare os serviços com `docker compose down`; para remover também os dados persistidos, use `docker compose down -v`.

## Variáveis e segurança

Cada etapa com banco inclui `.env.example`. Copie para `.env` para estudar a configuração. Os valores são apenas locais para estudo: não use senhas de produção e não envie arquivos `.env` ao GitHub. O `.gitignore` ignora esses arquivos.

## Sugestão de estudo

1. Leia o `Dockerfile` e identifique imagem base, diretório de trabalho, cópia dos arquivos e comando de início.
2. Compare `ports`, `environment`, `volumes`, `healthcheck` e `depends_on` nos Compose.
3. Mude a resposta do exercício 1 e observe a diferença entre rebuild e volume de desenvolvimento.
4. Crie mensagens, derrube e suba os serviços novamente para observar persistência.
5. No exercício 3, compare os estágios e os serviços dev/prod.

Os comandos `docker compose down -v` removem o volume do banco e todos os dados de estudo nele.
