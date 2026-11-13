-- EP3 Orion, exercício 2. Execute depois do exercício 1.

-- Alunos e respectivos cursos.
SELECT alunos.nome AS nome_aluno, cursos.nome_curso
FROM alunos
INNER JOIN cursos ON cursos.id = alunos.curso_id
ORDER BY alunos.id;

-- Alunos de Desenvolvimento Web.
SELECT alunos.nome AS nome_aluno, cursos.nome_curso
FROM alunos
INNER JOIN cursos ON cursos.id = alunos.curso_id
WHERE cursos.nome_curso = 'Desenvolvimento Web'
ORDER BY alunos.nome;

-- Move Maria Santos para Ciência de Dados.
UPDATE alunos
SET curso_id = (SELECT id FROM cursos WHERE nome_curso = 'Ciência de Dados')
WHERE email = 'maria.santos@orion.dev';

-- Confirma a alteração.
SELECT alunos.nome AS nome_aluno, cursos.nome_curso
FROM alunos
INNER JOIN cursos ON cursos.id = alunos.curso_id
WHERE alunos.email = 'maria.santos@orion.dev';

-- Extra: cursos sem alunos.
SELECT cursos.id, cursos.nome_curso
FROM cursos
LEFT JOIN alunos ON alunos.curso_id = cursos.id
WHERE alunos.id IS NULL
ORDER BY cursos.id;
