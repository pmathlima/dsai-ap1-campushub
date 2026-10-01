# Categorias de Eventos

## O quê e por quê

Taxonomia padronizada para classificar os eventos acadêmicos (ex.: Simpósio, Workshop, Palestra, Semana Acadêmica, Minicurso). Permite a organização consistente do catálogo e a aplicação de filtros eficientes pelos alunos.

## Funcionalidades

- Listagem pública de categorias ativas.
- Cadastro de nova categoria (Administrador).
- Edição do nome e descrição de categoria existente (Administrador).
- Ativação/Desativação de categoria (Administrador).

## Regras de negócio

1. O nome da categoria deve ser único no sistema (comparação sem diferenciação de maiúsculas/minúsculas).
2. Não é permitido excluir fisicamente uma categoria que possua eventos vinculados; deve-se apenas inativá-la (`status = INATIVA`).
3. Eventos só podem ser criados ou editados associando categorias com status `ATIVA`.
4. Categorias inativas continuam sendo exibidas historicamente nos eventos já existentes, mas não aparecem como opção para novos cadastros.

## Dados envolvidos

- `Categoria`:
  - `id`: string (UUID v4)
  - `nome`: string (3 a 50 caracteres, único)
  - `slug`: string (gerado a partir do nome, único)
  - `descricao`: string (opcional, até 255 caracteres)
  - `status`: enum (`ATIVA`, `INATIVA`)
  - `criadoEm`: datetime (ISO 8601)

## Fluxos

- **Criação de Categoria:**
  1. Administrador envia nome e descrição da categoria.
  2. O sistema normaliza o nome e gera o `slug`.
  3. O sistema valida se já existe categoria com o mesmo nome.
  4. O registro é persistido com status `ATIVA`.
- **Listagem de Categorias:**
  1. Qualquer usuário solicita a lista de categorias.
  2. O sistema retorna todas as categorias com status `ATIVA` ordenadas alfabeticamente.

## Critérios de aceitação

- [ ] Listagem pública retorna apenas categorias com status `ATIVA`.
- [ ] Cadastro com nome duplicado retorna HTTP 409.
- [ ] Tentativa de criação por usuário que não seja `ADMIN` retorna HTTP 403.
- [ ] Desativação de categoria mantém íntegros os eventos previamente cadastrados nela.

## Casos de erro

- `CATEGORIA_DUPLICADA`: nome da categoria já cadastrado.
- `CATEGORIA_NAO_ENCONTRADA`: ID inexistente na consulta ou alteração.
- `CATEGORIA_INATIVA`: tentativa de vincular categoria inativa a novo evento.

## Permissões

- **Público / Aluno / Organizador:** Apenas listagem e visualização de categorias ativas.
- **Admin:** Criar, editar e alterar status de categorias.

## Fora do escopo

- Subcategorias ou hierarquias em árvore.
- Cores e ícones customizados por categoria.

## Dependências

- `SPEC/2026-10-01-autenticacao.md`
