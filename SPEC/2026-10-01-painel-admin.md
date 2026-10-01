# Painel Administrativo e Governança

## O quê e por quê

Central de controle para os administradores institucionais monitorarem a operação geral do CampusHub, garantirem conformidade com as diretrizes acadêmicas, moderarem publicações inadequadas e visualizarem indicadores consolidados do sistema.

## Funcionalidades

- Gestão de usuários: listagem, pesquisa, suspensão de contas e alteração de perfil (ex.: promover Aluno a Organizador ou Admin).
- Moderação de eventos: listagem global de todos os eventos com poder de cancelamento compulsório ou alteração forçada de status.
- Visão global de inscrições em nível institucional.
- Painel analítico de indicadores gerais do sistema:
  - Total de usuários ativos por perfil.
  - Total de eventos realizados, ativos e cancelados.
  - Taxa média geral de ocupação de vagas.
  - Taxa geral de no-show (inscritos que não registraram presença).
  - Média institucional de avaliação dos eventos.

## Regras de negócio

1. Apenas usuários com perfil `ADMIN` autenticados podem acessar os recursos desta especificação.
2. Um administrador não pode suspender a si próprio nem revogar o próprio perfil de `ADMIN`.
3. Ao suspender um usuário:
   - Se for Aluno: todas as suas inscrições em eventos futuros são canceladas.
   - Se for Organizador: seus eventos com status `PUBLICADO` são pausados/suspensos para novas inscrições até deliberação.
4. Qualquer cancelamento moderador de evento deve conter justificativa registrada para auditoria.

## Dados envolvidos

- Estruturas de auditoria e agregadores analíticos:
  - `Usuario`
  - `Evento`
  - `Inscricao`
  - `Presenca`
  - `Avaliacao`
  - `LogModeracao` (entidade de rastreabilidade)

## Fluxos

- **Suspensão de Usuário:**
  1. Admin seleciona o usuário e aciona "Suspender Conta", informando o motivo.
  2. Sistema impede auto-bloqueio.
  3. Status do usuário torna-se `SUSPENSO`.
  4. Sessões ativas/tokens do usuário são invalidados.
- **Consulta de Indicadores:**
  1. Admin requisita `/painel-admin/indicadores`.
  2. Sistema consolida queries agregadas de eventos, usuários, presenças e avaliações.
  3. Retorna objeto consolidado com métricas acadêmicas.

## Critérios de aceitação

- [ ] Qualquer rota administrativa acessada por `ALUNO` ou `ORGANIZADOR` deve retornar HTTP 403.
- [ ] Tentativa de auto-suspensão ou auto-rebaixamento de perfil por um `ADMIN` deve retornar HTTP 422 (`OPERACAO_ADMIN_INVALIDA`).
- [ ] Indicador de taxa de no-show deve respeitar a fórmula: $\frac{(\text{Total Confirmadas} - \text{Total Presentes})}{\text{Total Confirmadas}} \times 100$ considerando apenas eventos encerrados.
- [ ] Moderação de evento gera registro imutável com data, admin responsável e justificativa.

## Casos de erro

- `ACESSO_RESTRITO_ADMIN`: credenciais válidas, mas perfil não administrativo.
- `AUTO_MODERACAO_PROIBIDA`: administrador tentando suspender a própria conta.
- `JUSTIFICATIVA_OBRIGATORIA`: tentativa de cancelar evento ou suspender usuário sem justificativa (mínimo de 15 caracteres).

## Permissões

- **Admin:** Acesso total e irrestrito a todos os módulos e operações de governança.
- **Organizador / Aluno:** Acesso bloqueado.

## Fora do escopo

- Gestão multi-campus com partição federada de banco de dados.
- Relatórios fiscais ou contábeis.

## Dependências

- `SPEC/2026-10-01-autenticacao.md`
- `SPEC/2026-10-01-categorias.md`
- `SPEC/2026-10-01-eventos.md`
- `SPEC/2026-10-01-inscricoes.md`
- `SPEC/2026-10-01-vagas.md`
- `SPEC/2026-10-01-presenca.md`
- `SPEC/2026-10-01-avaliacoes.md`
