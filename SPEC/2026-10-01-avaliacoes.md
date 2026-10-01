# Avaliações e Feedback de Eventos

## O quê e por quê

Permite que os alunos avaliem a qualidade do evento acadêmico após sua realização, fornecendo indicadores para o organizador aprimorar futuras edições e auxiliando a administração na governança acadêmica.

## Funcionalidades

- Submissão de avaliação (nota e comentário) pelo aluno após o evento.
- Visualização das avaliações e média geral pelo Organizador do evento.
- Exibição pública da nota média e quantidade de avaliações na página do evento.
- Moderação/remoção de comentários ofensivos pelo Administrador.

## Regras de negócio

1. Apenas alunos que tiveram sua **presença confirmada** (`presente = true`) podem avaliar o evento.
2. Cada aluno pode enviar apenas **uma única avaliação** por evento (avaliação imutável após envio).
3. A submissão da avaliação só é permitida após a `dataInicio` do evento.
4. A nota deve ser um valor inteiro na escala de 1 a 5 (onde 1 é péssimo e 5 é excelente).
5. O comentário é opcional, com limite máximo de 500 caracteres.
6. A média do evento é calculada aritmeticamente: $\text{Média} = \frac{\sum notas}{totalAvaliacoes}$.
7. O Administrador pode ocultar comentários inadequados, mas a nota numérica permanece no cômputo da média geral a menos que a avaliação inteira seja invalidada por fraude.

## Dados envolvidos

- `Avaliacao`:
  - `id`: string (UUID v4)
  - `eventoId`: string (FK para Evento)
  - `alunoId`: string (FK para Usuario)
  - `nota`: integer (1 a 5)
  - `comentario`: string (opcional, até 500 caracteres)
  - `visivel`: boolean (default: true, alterável por Admin)
  - `criadoEm`: datetime (ISO 8601)

## Fluxos

- **Submissão de Avaliação:**
  1. Aluno autenticado envia `eventoId`, `nota` e `comentario`.
  2. Sistema verifica se o evento já iniciou ou encerrou.
  3. Sistema verifica se o aluno tem presença atestada (`presente = true`).
  4. Sistema valida se o aluno já avaliou este evento previamente.
  5. Registro de avaliação é salvo.
- **Consulta de Feedback:**
  1. Usuário acessa o evento.
  2. Sistema retorna a nota média, o número de avaliações e a lista de comentários com `visivel = true`.

## Critérios de aceitação

- [ ] Tentativa de avaliação por aluno sem presença confirmada retorna HTTP 403 (`PRESENCA_OBRIGATORIA`).
- [ ] Envio de nota menor que 1 ou maior que 5 retorna HTTP 422.
- [ ] Tentativa de segunda avaliação pelo mesmo aluno no mesmo evento retorna HTTP 409 (`AVALIACAO_JA_REALIZADA`).
- [ ] Média e total de avaliações atualizados de forma consistente a cada nova submissão.
- [ ] Comentários com `visivel = false` não são retornados nas consultas públicas ou do organizador.

## Casos de erro

- `PRESENCA_OBRIGATORIA`: aluno inscrito, porém sem presença validada.
- `EVENTO_NAO_INICIADO`: tentativa de avaliar antes do início do evento.
- `AVALIACAO_JA_REALIZADA`: aluno já enviou avaliação para o evento.
- `NOTA_INVALIDA`: valor fora do intervalo de 1 a 5.

## Permissões

- **Aluno:** Criar avaliação para eventos em que esteve presente; visualizar avaliações públicas.
- **Organizador:** Visualizar relatório detalhado de avaliações e comentários de seus eventos.
- **Admin:** Visualizar todas as avaliações e alternar a visibilidade de comentários moderados.

## Fora do escopo

- Resposta formal do organizador ao comentário do aluno.
- Critérios de avaliação subdivididos (ex.: avaliar separadamente palestrante, infraestrutura e pontualidade).

## Dependências

- `SPEC/2026-10-01-autenticacao.md`
- `SPEC/2026-10-01-eventos.md`
- `SPEC/2026-10-01-presenca.md`
