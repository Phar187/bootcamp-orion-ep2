# Bootcamp Orion EP2 — Docker e Docker Compose

Este repositório reúne os exercícios de Docker do EP2 do Bootcamp Orion. É um projeto educacional, executado localmente para estudo e testes; não é uma aplicação publicada nem preparada para uso em produção.

## Conteúdo

- `docker/exercicio-1`: aplicação Node.js simples, imagem própria e Compose para responder `Hello from Docker!`.
- `docker/exercicio-2`: API Node.js conectada a PostgreSQL, com variáveis de ambiente, healthcheck, rede e volume nomeados.
- `docker/exercicio-3`: a mesma ideia em ambientes de desenvolvimento e produção, com Compose separado e Dockerfile multi-stage.
- `docker/exercicio-extra`: desafio completo com API, PostgreSQL persistente, rota `/health`, healthcheck do banco, variáveis de ambiente, rede e volume nomeados e interface Adminer.

As instruções para executar cada parte estão em [`docker/README.md`](docker/README.md). Os arquivos Compose usam credenciais de demonstração para uso local. Não reutilize essas senhas em serviços reais.

## Tecnologias

- Node.js em imagem Alpine
- PostgreSQL em imagem oficial Alpine
- Dockerfile e Docker Compose
- Express e `pg` nas APIs
- Adminer no desafio extra

## Execução rápida do desafio completo

No terminal, a partir da raiz deste repositório:

```powershell
cd docker/exercicio-extra
Copy-Item .env.example .env
docker compose up --build -d
```

- API: <http://localhost:3005/health> e <http://localhost:3005/messages>
- Adminer: <http://localhost:8080>

Para encerrar os serviços sem apagar os dados, execute `docker compose down`. Para apagar também os dados do banco, execute `docker compose down -v`.

## Entrega do bootcamp

O link deste repositório deve ser informado na descrição da tarefa no PDIA. Conforme as orientações do bootcamp, a atividade conta como entregue após a aprovação e o merge do pull request pelo mentor.
