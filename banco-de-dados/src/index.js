const http = require("node:http");
const { MongoClient } = require("mongodb");

const port = Number(process.env.PORT || 3000);
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("A variável MONGODB_URI é obrigatória.");
}

const client = new MongoClient(mongoUri);

function sendJson(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body, null, 2));
}

async function start() {
  await client.connect();
  const database = client.db("orion_db");
  const posts = database.collection("posts");

  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, "http://localhost");

    if (request.method === "GET" && url.pathname === "/health") {
      try {
        await database.command({ ping: 1 });
        sendJson(response, 200, { status: "ok", database: "orion_db" });
      } catch {
        sendJson(response, 503, { status: "unavailable" });
      }
      return;
    }

    if (request.method === "GET" && url.pathname === "/posts") {
      const filter = {};
      const tag = url.searchParams.get("tag");
      const author = url.searchParams.get("autor");

      if (tag) filter.tags = tag;
      if (author) filter.autor = author;

      try {
        const results = await posts.find(filter, { projection: { _id: 0 } }).toArray();
        sendJson(response, 200, results);
      } catch {
        sendJson(response, 500, { error: "Não foi possível consultar posts." });
      }
      return;
    }

    sendJson(response, 404, {
      error: "Rota não encontrada.",
      rotas: ["/health", "/posts", "/posts?tag=nosql", "/posts?autor=Ana%20Costa"]
    });
  });

  server.listen(port, "0.0.0.0", () => {
    console.log(`API disponível na porta ${port}`);
  });

  const stop = async () => {
    server.close(async () => {
      await client.close();
      process.exit(0);
    });
  };

  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}

start().catch(async (error) => {
  console.error("Falha ao iniciar a API:", error.message);
  await client.close();
  process.exit(1);
});
