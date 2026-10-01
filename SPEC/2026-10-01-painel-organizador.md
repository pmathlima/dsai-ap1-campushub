# Painel de Gestão do Organizador

## O quê e por quê

Espaço consolidado de trabalho para o Organizador gerenciar suas iniciativas acadêmicas, controlar capacidade, emitir listas de participantes para fins operacionais e acompanhar o engajamento e a presença de forma centralizada.

## Funcionalidades

- Listagem dos eventos criados pelo organizador autenticado com filtros de status (`RASCUNHO`, `PUBLICADO`, `CANCELADO`, `CONCLUIDO`).
- Visão detalhada de um evento com métricas rápidas: vagas totais, vagas ocupadas, taxa de ocupação (%) e presença confirmada.
- Gestão de lista de inscritos com dados do aluno (nome, e-mail institucional, data de inscrição e status de presença).
- Controle centralizado de ações rápidas: Publicar, Cancelar, Editar Dados, Gerar Código de Check-in e Exportar Lista.

## Regras de negócio

1. O Organizador só tem acesso aos eventos vinculados ao seu próprio `organizadorId`.
2. O painel deve calcular dinamicamente a taxa de ocupação: $\text{Ocupação} = \left(\frac{vagasOcupadas}{limiteVagas}\right) \times 100$.
3. O cancelamento de evento realizado pelo painel exige o preenchimento de justificativa formal mínima de 10 caracteres.
4. O organizador não pode alterar o proprietário do evento nem transferi-lo para outro usuário.

## Dados envolvidos

- Estruturas agregadas de leitura consumindo:
  - `Evento`
  - `Inscricao`
  - `Presenca`
  - `Avaliacao`

## Fluxos

- **Acesso ao Painel:**
  1. Organizador autenticado requisita `/painel-organizador/eventos`.
  2. Sistema filtra eventos onde `organizadorId == usuarioLogado.id`.
  3. Sistema agrega métricas de vagas e inscritos de cada evento.
  4. Retorna a listagem gerencial.
- **Gestão de Participantes:**
  1. Organizador seleciona um evento específico.
  2. Sistema lista todas as inscrições ativas e canceladas, indicando presença confirmada.

## Critérios de aceitação

- [ ] Organizador não visualiza nem gerencia eventos de outros organizadores (isolamento estrito de dados).
- [ ] Retorno com paginação e ordenação por data de criação decrescente.
- [ ] Indicadores de vagas ocupadas e presença calculados de forma exata a partir das tabelas/entidades de domínio.
- [ ] Acesso negado com HTTP 403 para usuários com perfil `ALUNO`.

## Casos de erro

- `ACESSO_PROIBIDO`: tentativa de acesso por usuário sem perfil `ORGANIZADOR` ou `ADMIN`.
- `EVENTO_NAO_PERTENCE_AO_ORGANIZADOR`: tentativa de visualizar painel de evento de terceiro.

## Permissões

- **Organizador:** Acesso integral aos seus eventos e respectivos inscritos/presenças.
- **Admin:** Pode visualizar o painel sob a perspectiva de qualquer organizador para suporte.
- **Aluno:** Acesso terminantemente bloqueado.

## Fora do escopo

- Exportação de planilhas nos formatos Excel (.xlsx) ou CSV (ver item no BACKLOG.md).
- Envio de comunicados em massa via e-mail direto do painel.

## Dependências

- `SPEC/2026-10-01-autenticacao.md`
- `SPEC/2026-10-01-eventos.md`
- `SPEC/2026-10-01-inscricoes.md`
- `SPEC/2026-10-01-presenca.md`
- `SPEC/2026-10-01-vagas.md`
