-- EP3 Orion, exercício 1. Execute no banco orion_db.

CREATE TABLE IF NOT EXISTS cursos (
    id INTEGER PRIMARY KEY,
    nome_curso VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    curso_id INTEGER NOT NULL,
    CONSTRAINT fk_alunos_cursos FOREIGN KEY (curso_id) REFERENCES cursos (id)
);

-- Reinicia os dados de exemplo para permitir repetir a atividade.
DELETE FROM alunos;
DELETE FROM cursos;

INSERT INTO cursos (id, nome_curso)
VALUES (1, 'Desenvolvimento Web'), (2, 'Ciência de Dados'), (3, 'Banco de Dados');

INSERT INTO alunos (id, nome, email, curso_id)
VALUES
    (1, 'João Silva', 'joao.silva@orion.dev', 1),
    (2, 'Maria Santos', 'maria.santos@orion.dev', 1),
    (3, 'Ana Costa', 'ana.costa@orion.dev', 2),
    (4, 'Pedro Lima', 'pedro.lima@orion.dev', 2);

-- Lista os alunos inseridos.
SELECT id, nome, email, curso_id FROM alunos ORDER BY id;

-- Confere a relação entre alunos e cursos.
SELECT alunos.nome AS nome_aluno, cursos.nome_curso
FROM alunos
INNER JOIN cursos ON cursos.id = alunos.curso_id
ORDER BY alunos.id;
