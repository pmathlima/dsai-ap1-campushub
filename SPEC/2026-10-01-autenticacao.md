# Autenticação e Gestão de Contas

## O quê e por quê

Mecanismo central de identidade, autenticação e controle de acesso baseado em papéis (RBAC). É essencial para garantir que cada usuário (Aluno, Organizador, Administrador) acesse apenas as operações e recursos compatíveis com suas atribuições institucionais.

## Funcionalidades

- Cadastro de novos usuários informando nome, e-mail institucional, senha e perfil inicial desejado (Aluno ou Organizador).
- Login com e-mail e senha com emissão de token JWT.
- Consulta ao perfil do usuário autenticado atual.
- Logout lógico por invalidação no cliente.

## Regras de negócio

1. O e-mail deve ser único em toda a base do sistema.
2. A senha deve possuir no mínimo 8 caracteres, contendo ao menos uma letra maiúscula, um número e um caractere especial.
3. Não é permitido criar diretamente uma conta com perfil `ADMIN` via formulário público; o primeiro administrador é provisionado via semente do sistema (seed), e os demais são promovidos por administradores existentes.
4. O usuário com status `SUSPENSO` ou `INATIVO` não pode realizar login nem renovar tokens.
5. As senhas devem ser armazenadas com hash criptográfico irreversível (ex.: Argon2id ou BCrypt com salt).

## Dados envolvidos

- `Usuario`:
  - `id`: string (UUID v4)
  - `nome`: string (3 a 100 caracteres)
  - `email`: string (formato de e-mail válido, case-insensitive)
  - `senhaHash`: string
  - `perfil`: enum (`ALUNO`, `ORGANIZADOR`, `ADMIN`)
  - `status`: enum (`ATIVO`, `SUSPENSO`)
  - `criadoEm`: datetime (ISO 8601)
  - `atualizadoEm`: datetime (ISO 8601)

## Fluxos

- **Cadastro:**
  1. O usuário submete formulário com nome, e-mail, senha e perfil inicial (`ALUNO` ou `ORGANIZADOR`).
  2. O sistema valida formato dos campos e unicidade do e-mail.
  3. O sistema gera o hash da senha e persiste o usuário com status `ATIVO`.
  4. O sistema retorna os dados do usuário cadastrado (sem a senha).
- **Login:**
  1. O usuário submete e-mail e senha.
  2. O sistema busca o usuário pelo e-mail e verifica se o status é `ATIVO`.
  3. O sistema valida o hash da senha informada.
  4. O sistema retorna o token JWT com `sub`, `email`, `perfil` e data de expiração.

## Critérios de aceitação

- [ ] Cadastro rejeitado se o e-mail já estiver registrado (retorno HTTP 409).
- [ ] Cadastro rejeitado se a senha tiver menos de 8 caracteres ou não atender aos requisitos de complexidade (HTTP 422).
- [ ] Cadastro com perfil `ADMIN` solicitado na requisição pública deve retornar erro de permissão (HTTP 403) ou forçar o perfil para `ALUNO`.
- [ ] Login com credenciais válidas retorna código HTTP 200 com token JWT válido contendo `id`, `email` e `perfil`.
- [ ] Login com senha incorreta ou e-mail inexistente retorna HTTP 401 sem detalhar qual dos dois está errado.
- [ ] Usuário com status `SUSPENSO` recebe HTTP 403 ao tentar autenticar.

## Casos de erro

- `EMAIL_JA_CADASTRADO`: tentativa de criar conta com e-mail pré-existente.
- `SENHA_FRACA`: senha em desacordo com as regras de complexidade.
- `CREDENCIAS_INVALIDAS`: e-mail não encontrado ou senha divergente.
- `USUARIO_SUSPENSO`: credenciais corretas, mas conta bloqueada pela administração.

## Permissões

- **Público:** Cadastro de conta, login.
- **Aluno / Organizador / Admin:** Consulta ao próprio perfil.

## Fora do escopo

- Autenticação via Google/OAuth2 institucional.
- Recuperação de senha via e-mail transactional.
- Autenticação de dois fatores (2FA).

## Dependências

- Nenhuma dependência funcional prévia (SPEC fundamental).
