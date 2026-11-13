// EP3 Orion, exercício 4. Execute depois do exercício 3.

db.posts.updateOne(
  { titulo: "Primeiros passos com MongoDB" },
  {
    $set: {
      comentarios: [
        { autor: "Maria Santos", texto: "A flexibilidade ficou clara.", curtidas: 2 },
        { autor: "João Silva", texto: "Bom exemplo de arrays.", curtidas: 1 }
      ]
    }
  }
);

// Confere o post e seu array de comentários.
db.posts.find(
  { titulo: "Primeiros passos com MongoDB" },
  { _id: 0, titulo: 1, autor: 1, tags: 1, comentarios: 1 }
).forEach((post) => printjson(post));

// Posts que contêm "nosql" no array tags.
db.posts.find(
  { tags: "nosql" },
  { _id: 0, titulo: 1, autor: 1, tags: 1 }
).forEach((post) => printjson(post));

// Posts de Ana Costa.
db.posts.find(
  { autor: "Ana Costa" },
  { _id: 0, titulo: 1, autor: 1 }
).forEach((post) => printjson(post));

// Busca por campo dentro de documentos do array comentarios.
db.posts.find(
  { "comentarios.autor": "Maria Santos" },
  { _id: 0, titulo: 1, comentarios: 1 }
).forEach((post) => printjson(post));
