// EP3 Orion, exercício 3. Execute no banco orion_db.
// Cria a coleção explicitamente e limpa os dados para repetir o exercício.

if (!db.getCollectionNames().includes("posts")) {
  db.createCollection("posts");
}

db.posts.deleteMany({});

db.posts.insertMany([
  {
    titulo: "Introdução ao SQL",
    autor: "João Silva",
    conteudo: "Uma introdução a tabelas, registros e consultas relacionais."
  },
  {
    titulo: "Primeiros passos com MongoDB",
    autor: "Ana Costa",
    conteudo: "Documentos podem ter campos diferentes na mesma coleção.",
    tags: ["nosql", "flexivel"]
  }
]);

// Deve listar dois documentos; apenas o segundo contém tags.
db.posts.find({}, { _id: 0 }).forEach((post) => printjson(post));
