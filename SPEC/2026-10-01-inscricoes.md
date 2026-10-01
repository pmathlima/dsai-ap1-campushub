# Inscrições em Eventos

## O quê e por quê

Permite que alunos garantam sua participação em eventos acadêmicos, gerenciem suas inscrições ativas e cancelem participações com antecedência, liberando vagas para outros interessados.

## Funcionalidades

- Realização de inscrição pelo aluno em evento publicado.
- Cancelamento voluntário de inscrição pelo aluno.
- Listagem das inscrições do aluno autenticado (histórico e futuras).
- Listagem dos participantes inscritos acessível ao Organizador e ao Administrador.

## Regras de negócio

1. Apenas usuários com perfil `ALUNO` podem se inscrever em eventos.
2. O aluno não pode se inscrever mais de uma vez no mesmo evento (inscrição ativa única).
3. O aluno só pode se inscrever em eventos no status `PUBLICADO` e cuja `dataFim` esteja no futuro.
4. Não é permitida a inscrição se o evento estiver com vagas esgotadas.
5. O aluno pode cancelar sua própria inscrição a qualquer momento antes do início do evento (`dataInicio`).
6. Após o início do evento, o cancelamento voluntário fica bloqueado.
7. Estados possíveis da inscrição: `CONFIRMADA`, `CANCELADA_PELO_ALUNO`, `CANCELADA_PELO_EVENTO`.
8. Ao cancelar a inscrição, a vaga correspondente é liberada imediatamente.

## Dados envolvidos

- `Inscricao`:
  - `id`: string (UUID v4)
  - `eventoId`: string (FK para Evento)
  - `alunoId`: string (FK para Usuario)
  - `status`: enum (`CONFIRMADA`, `CANCELADA_PELO_ALUNO`, `CANCELADA_PELO_EVENTO`)
  - `dataInscricao`: datetime (ISO 8601)
  - `dataCancelamento`: datetime (opcional, ISO 8601)

## Fluxos

- **Realizar Inscrição:**
  1. Aluno autenticado solicita inscrição para o `eventoId`.
  2. Sistema verifica se o evento existe e está `PUBLICADO`.
  3. Sistema valida se o aluno já possui inscrição com status `CONFIRMADA`.
  4. Sistema valida e debita uma vaga no controle de lotação.
  5. Inscrição é registrada com status `CONFIRMADA`.
- **Cancelar Inscrição:**
  1. Aluno solicita cancelamento de sua inscrição ativa.
  2. Sistema verifica se o evento ainda não iniciou (`agora < dataInicio`).
  3. Status da inscrição é alterado para `CANCELADA_PELO_ALUNO` e data de cancelamento é preenchida.
  4. Sistema devolve a vaga para o evento.

## Critérios de aceitação

- [ ] Aluno autenticado consegue se inscrever com sucesso caso haja vagas (retorno HTTP 201).
- [ ] Tentativa de nova inscrição por aluno já inscrito com status `CONFIRMADA` retorna HTTP 409 (`INSCRICAO_DUPLICADA`).
- [ ] Cancelamento solicitado após o horário de início do evento retorna HTTP 422 (`CANCELAMENTO_EXPIRADO`).
- [ ] Listagem de "Minhas Inscrições" exibe apenas os registros pertencentes ao aluno autenticado.
- [ ] Inscrição em evento no status `RASCUNHO`, `CANCELADO` ou `CONCLUIDO` retorna HTTP 400.

## Casos de erro

- `INSCRICAO_DUPLICADA`: aluno já possui inscrição ativa no evento.
- `EVENTO_LOTADO`: sem vagas disponíveis no momento da solicitação.
- `EVENTO_NAO_DISPONIVEL`: evento cancelado, rascunho ou encerrado.
- `CANCELAMENTO_EXPIRADO`: tentativa de cancelamento após o início do evento.
- `INSCRICAO_NAO_ENCONTRADA`: ID de inscrição inexistente ou pertencente a outro aluno.

## Permissões

- **Aluno:** Criar e cancelar suas próprias inscrições; consultar seu histórico de inscrições.
- **Organizador:** Visualizar lista de alunos inscritos no evento que gerencia.
- **Admin:** Visualizar inscrições de qualquer evento e de qualquer aluno.

## Fora do escopo

- Cobrança financeira ou taxa de inscrição (todos os eventos acadêmicos são gratuitos nesta etapa).
- Transferência de inscrição para outro aluno.

## Dependências

- `SPEC/2026-10-01-autenticacao.md`
- `SPEC/2026-10-01-eventos.md`
- `SPEC/2026-10-01-vagas.md`
