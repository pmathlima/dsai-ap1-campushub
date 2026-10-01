# TASKS — CampusHub

## Fase 1 — Fundação

- [ ] TASK-001 — Inicializar repositório e configurações base de ambiente e linter
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Configuração de linting, formatação e verificação estática de tipos executando sem erros via script no terminal.

- [ ] TASK-002 — Configurar ambiente e runner de testes automatizados
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Test runner executando com sucesso com um teste de fumaça (_smoke test_) em verde.

- [ ] TASK-003 — Estruturar layout de diretórios do backend em arquitetura em camadas
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Diretórios `core`, `use-cases`, `interfaces` e `infrastructure` criados e referenciados nas importações.

- [ ] TASK-004 — Estruturar layout de diretórios e roteador base do frontend
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Aplicação frontend inicializando com rotas base configuradas e renderizando sem erros de console.

---

## Fase 2 — Autenticação e Usuários

- [ ] TASK-005 — Modelar entidade Usuario e regras de validação de senha e e-mail
  - SPEC: SPEC/2026-10-01-autenticacao.md
  - Critério de conclusão: Entidade instanciável com validação de formato de e-mail e regras de complexidade de senha (mínimo 8 caracteres, maiúscula, número, caractere especial).

- [ ] TASK-006 — Criar interface e adaptador InMemory para repositório de usuários
  - SPEC: SPEC/2026-10-01-autenticacao.md
  - Critério de conclusão: Métodos de busca por id, busca por e-mail e persistência de usuário implementados e validados em memória.

- [ ] TASK-007 — Implementar caso de uso de cadastro de usuário
  - SPEC: SPEC/2026-10-01-autenticacao.md
  - Critério de conclusão: Usuário cadastrado com senha em hash; tentativa de criação direta com perfil ADMIN rejeitada ou forçada a ALUNO; erro retornado se e-mail duplicado.

- [ ] TASK-008 — Implementar caso de uso de login e emissão de token JWT
  - SPEC: SPEC/2026-10-01-autenticacao.md
  - Critério de conclusão: Credenciais válidas retornam token JWT contendo id, email e perfil; credenciais inválidas ou usuário com status SUSPENSO rejeitados.

- [ ] TASK-009 — Implementar middleware de autenticação JWT e autorização RBAC
  - SPEC: SPEC/2026-10-01-autenticacao.md
  - Critério de conclusão: Requisições sem Bearer token retornam HTTP 401; requisições com perfis sem permissão retornam HTTP 403.

- [ ] TASK-010 — Implementar rotas e controladores HTTP de autenticação
  - SPEC: SPEC/2026-10-01-autenticacao.md
  - Critério de conclusão: Endpoints de `/auth/cadastro`, `/auth/login` e `/auth/perfil` respondendo com os códigos de status HTTP previstos (200, 201, 401, 403, 409, 422).

- [ ] TASK-011 — Criar telas de cadastro e login no frontend com controle de sessão
  - SPEC: SPEC/2026-10-01-autenticacao.md
  - Critério de conclusão: Formulários de login e cadastro funcionais com persistência do JWT no cliente e redirecionamento pós-autenticação.

- [ ] TASK-012 — Implementar testes unitários e de integração de autenticação
  - SPEC: SPEC/2026-10-01-autenticacao.md
  - Critério de conclusão: 100% dos cenários de sucesso e erro da SPEC de autenticação cobertos por testes e passando.

---

## Fase 3 — Eventos e Categorias

- [ ] TASK-013 — Modelar entidade Categoria e repositório InMemory
  - SPEC: SPEC/2026-10-01-categorias.md
  - Critério de conclusão: Entidade Categoria com controle de status (ATIVA/INATIVA), validação de unicidade de nome e repositório funcional.

- [ ] TASK-014 — Implementar casos de uso de criação, listagem e alteração de categorias
  - SPEC: SPEC/2026-10-01-categorias.md
  - Critério de conclusão: Apenas ADMIN cria/inativa categorias; listagem pública retorna exclusivamente categorias ativas.

- [ ] TASK-015 — Modelar entidade Evento e repositório InMemory
  - SPEC: SPEC/2026-10-01-eventos.md
  - Critério de conclusão: Entidade Evento implementando a máquina de estados (`RASCUNHO`, `PUBLICADO`, `CANCELADO`, `CONCLUIDO`) e validações de período (`dataInicio < dataFim`).

- [ ] TASK-016 — Implementar casos de uso de criação, edição e cancelamento de eventos
  - SPEC: SPEC/2026-10-01-eventos.md
  - Critério de conclusão: Organizador cria/edita/cancela seus próprios eventos; eventos cancelados/concluídos tornam-se inalteráveis; ADMIN pode cancelar qualquer evento com justificativa.

- [ ] TASK-017 — Implementar caso de uso de consulta, busca textual e filtros de eventos
  - SPEC: SPEC/2026-10-01-eventos.md
  - Critério de conclusão: Busca textual por título e descrição e filtros por categoria, modalidade, status e período retornando apenas eventos publicados para o público geral.

- [ ] TASK-018 — Implementar rotas e controladores HTTP de categorias e eventos
  - SPEC: SPEC/2026-10-01-categorias.md e SPEC/2026-10-01-eventos.md
  - Critério de conclusão: Endpoints REST respondendo com status 200, 201, 400, 403 e 422 conforme especificações.

- [ ] TASK-019 — Construir páginas de catálogo público, busca de eventos e detalhes no frontend
  - SPEC: SPEC/2026-10-01-eventos.md
  - Critério de conclusão: Usuário consegue navegar pelo catálogo, aplicar filtros de categoria/modalidade, realizar busca por termo e visualizar detalhes completos do evento.

- [ ] TASK-020 — Construir formulário de criação e edição de eventos no frontend
  - SPEC: SPEC/2026-10-01-eventos.md
  - Critério de conclusão: Organizador consegue preencher e submeter os campos obrigatórios do evento vinculando categorias ativas.

- [ ] TASK-021 — Implementar testes unitários e de integração de eventos e categorias
  - SPEC: SPEC/2026-10-01-categorias.md e SPEC/2026-10-01-eventos.md
  - Critério de conclusão: Testes cobrindo validações de datas, transições de estado, visibilidade pública e restrições de permissão executando com sucesso.

---

## Fase 4 — Inscrições e Vagas

- [ ] TASK-022 — Modelar regras de controle de capacidade e vagas da entidade Evento
  - SPEC: SPEC/2026-10-01-vagas.md
  - Critério de conclusão: Cálculo de `vagasDisponiveis = limiteVagas - totalInscricoesAtivas`; bloqueio de ajuste de `limiteVagas` para número inferior ao total de inscritos confirmados.

- [ ] TASK-023 — Modelar entidade Inscricao e repositório InMemory
  - SPEC: SPEC/2026-10-01-inscricoes.md
  - Critério de conclusão: Entidade Inscricao com estados (`CONFIRMADA`, `CANCELADA_PELO_ALUNO`, `CANCELADA_PELO_EVENTO`) e repositório com suporte a operações atômicas de contagem.

- [ ] TASK-024 — Implementar caso de uso de inscrição do aluno em evento
  - SPEC: SPEC/2026-10-01-inscricoes.md e SPEC/2026-10-01-vagas.md
  - Critério de conclusão: Inscrição permitida apenas para perfil ALUNO em eventos PUBLICADOS com vagas disponíveis; duplicidade rejeitada com HTTP 409; reserva atômica de vaga efetuada.

- [ ] TASK-025 — Implementar caso de uso de cancelamento de inscrição pelo aluno
  - SPEC: SPEC/2026-10-01-inscricoes.md e SPEC/2026-10-01-vagas.md
  - Critério de conclusão: Cancelamento permitido apenas antes de `dataInicio`; alteração de status para `CANCELADA_PELO_ALUNO` e devolução imediata de +1 vaga disponível.

- [ ] TASK-026 — Implementar cancelamento em cascata de inscrições no cancelamento de evento
  - SPEC: SPEC/2026-10-01-eventos.md e SPEC/2026-10-01-inscricoes.md
  - Critério de conclusão: Cancelamento do evento marca automaticamente todas as inscrições ativas como `CANCELADA_PELO_EVENTO`.

- [ ] TASK-027 — Implementar caso de uso de listagem de inscrições do aluno autenticado
  - SPEC: SPEC/2026-10-01-inscricoes.md
  - Critério de conclusão: Retorno estrito das inscrições ativas e histórico pertencentes ao aluno da requisição.

- [ ] TASK-028 — Implementar rotas e controladores HTTP de inscrições e vagas
  - SPEC: SPEC/2026-10-01-inscricoes.md e SPEC/2026-10-01-vagas.md
  - Critério de conclusão: Endpoints de `/eventos/:id/inscricao`, `/inscricoes/:id/cancelar` e `/minhas-inscricoes` respondendo adequadamente com 200, 201, 400, 409 e 422.

- [ ] TASK-029 — Construir tela de "Minhas Inscrições" e botão de inscrição na página do evento no frontend
  - SPEC: SPEC/2026-10-01-inscricoes.md
  - Critério de conclusão: Aluno visualiza status das suas inscrições, aciona inscrição direta em eventos abertos e realiza cancelamento com atualização visual de vagas.

- [ ] TASK-030 — Implementar testes unitários e de integração de inscrições e vagas
  - SPEC: SPEC/2026-10-01-vagas.md e SPEC/2026-10-01-inscricoes.md
  - Critério de conclusão: Testes de concorrência com evento lotado, cancelamento retroativo bloqueado e integridade de liberação de vagas passando com sucesso.

---

## Fase 5 — Presença e Avaliações

- [ ] TASK-031 — Modelar entidade Presenca e campos de check-in no Evento
  - SPEC: SPEC/2026-10-01-presenca.md
  - Critério de conclusão: Estrutura de Presenca com flags de status, vínculo a inscrição confirmada e geração de código de 6 caracteres alfanuméricos no Evento.

- [ ] TASK-032 — Implementar caso de uso de abertura e fechamento de janela de check-in
  - SPEC: SPEC/2026-10-01-presenca.md
  - Critério de conclusão: Organizador gera código e abre check-in; verificação temporal bloqueando check-in fora do intervalo (-15 min da `dataInicio` até +2h da `dataFim`).

- [ ] TASK-033 — Implementar casos de uso de auto-check-in do aluno e registro manual pelo organizador
  - SPEC: SPEC/2026-10-01-presenca.md
  - Critério de conclusão: Aluno valida presença com código alfanumérico correto; organizador altera status de presença diretamente na listagem de inscritos.

- [ ] TASK-034 — Modelar entidade Avaliacao e repositório InMemory
  - SPEC: SPEC/2026-10-01-avaliacoes.md
  - Critério de conclusão: Entidade com nota numérica de 1 a 5, comentário opcional até 500 caracteres, flag de visibilidade e unicidade por par (aluno, evento).

- [ ] TASK-035 — Implementar caso de uso de submissão e listagem de avaliações
  - SPEC: SPEC/2026-10-01-avaliacoes.md
  - Critério de conclusão: Submissão permitida estritamente para alunos com `presente = true` após `dataInicio`; recálculo dinâmico da média de notas do evento.

- [ ] TASK-036 — Implementar rotas e controladores HTTP de presença e avaliações
  - SPEC: SPEC/2026-10-01-presenca.md e SPEC/2026-10-01-avaliacoes.md
  - Critério de conclusão: Endpoints de `/eventos/:id/checkin`, `/eventos/:id/presenca` e `/eventos/:id/avaliacoes` respondendo com 200, 201, 400, 403 e 422.

- [ ] TASK-037 — Construir interfaces de check-in e envio de avaliação no frontend
  - SPEC: SPEC/2026-10-01-presenca.md e SPEC/2026-10-01-avaliacoes.md
  - Critério de conclusão: Aluno insere código de check-in no evento e, após confirmação de presença, acessa o formulário com estrelas (1 a 5) e comentário.

- [ ] TASK-038 — Implementar testes unitários e de integração de presença e avaliações
  - SPEC: SPEC/2026-10-01-presenca.md e SPEC/2026-10-01-avaliacoes.md
  - Critério de conclusão: Tentativa de avaliação sem presença rejeitada (HTTP 403); auto-check-in com código inválido rejeitado (HTTP 400); testes passando.

---

## Fase 6 — Painel do Organizador

- [ ] TASK-039 — Implementar serviço de agregação de métricas para o painel do organizador
  - SPEC: SPEC/2026-10-01-painel-organizador.md
  - Critério de conclusão: Cálculo consolidado de taxa de ocupação, total de inscritos, presenças confirmadas e média de avaliações dos eventos do organizador.

- [ ] TASK-040 — Implementar caso de uso de listagem gerencial de eventos do organizador autenticado
  - SPEC: SPEC/2026-10-01-painel-organizador.md
  - Critério de conclusão: Retorno isolado estritamente dos eventos vinculados ao `organizadorId` do token de sessão.

- [ ] TASK-041 — Implementar caso de uso de visualização de lista de presença e participantes inscritos
  - SPEC: SPEC/2026-10-01-painel-organizador.md
  - Critério de conclusão: Organizador visualiza relação de alunos com nome, e-mail institucional, status da inscrição e indicador de presença.

- [ ] TASK-042 — Implementar rotas e controladores HTTP do painel do organizador
  - SPEC: SPEC/2026-10-01-painel-organizador.md
  - Critério de conclusão: Endpoints de `/painel-organizador/eventos` e `/painel-organizador/eventos/:id/participantes` respondendo com restrição de acesso a organizadores (HTTP 403 para alunos).

- [ ] TASK-043 — Construir interface web do Painel do Organizador no frontend
  - SPEC: SPEC/2026-10-01-painel-organizador.md
  - Critério de conclusão: Dashboard gerencial renderizando cards com métricas de ocupação, tabela de eventos criados e controle de lista de chamada.

- [ ] TASK-044 — Implementar testes unitários e de integração do painel do organizador
  - SPEC: SPEC/2026-10-01-painel-organizador.md
  - Critério de conclusão: Testes comprovando isolamento de dados entre organizadores distintos e cálculos percentuais corretos executando com sucesso.

---

## Fase 7 — Painel Administrativo

- [ ] TASK-045 — Implementar casos de uso de gestão de usuários (listagem, alteração de papel e suspensão)
  - SPEC: SPEC/2026-10-01-painel-admin.md
  - Critério de conclusão: Admin gerencia contas e suspende usuários com cancelamento automático de inscrições futuras de alunos; auto-bloqueio de admin bloqueado com erro 422.

- [ ] TASK-046 — Implementar casos de uso de moderação global de eventos e avaliações
  - SPEC: SPEC/2026-10-01-painel-admin.md
  - Critério de conclusão: Cancelamento compulsório de eventos com justificativa de auditoria e controle de visibilidade (`visivel = false`) de comentários inadequados.

- [ ] TASK-047 — Implementar consolidação de indicadores institucionais analíticos
  - SPEC: SPEC/2026-10-01-painel-admin.md
  - Critério de conclusão: Cálculo global de usuários ativos por perfil, taxa geral de ocupação, taxa de no-show $\left(\frac{\text{Confirmadas} - \text{Presentes}}{\text{Confirmadas}} \times 100\right)$ e média global de avaliação.

- [ ] TASK-048 — Implementar rotas e controladores HTTP do painel administrativo
  - SPEC: SPEC/2026-10-01-painel-admin.md
  - Critério de conclusão: Endpoints de `/painel-admin/usuarios`, `/painel-admin/moderacao/eventos` e `/painel-admin/indicadores` protegidos com RBAC exclusivo para perfil ADMIN.

- [ ] TASK-049 — Construir interface web do Painel do Administrador no frontend
  - SPEC: SPEC/2026-10-01-painel-admin.md
  - Critério de conclusão: Visualização de tabelas de moderação de usuários, listagem global de eventos e visualização gráfica/tabular dos indicadores acadêmicos.

- [ ] TASK-050 — Implementar testes unitários e de integração do painel administrativo
  - SPEC: SPEC/2026-10-01-painel-admin.md
  - Critério de conclusão: Testes de bloqueio de acesso para papéis não-admin, fórmula de no-show e validação de auto-suspensão passando sem erros.

---

## Fase 8 — Testes, Qualidade e Segurança

- [ ] TASK-051 — Implementar testes ponta a ponta (E2E) da jornada do Aluno
  - SPEC: SPEC/2026-10-01-autenticacao.md, SPEC/2026-10-01-eventos.md, SPEC/2026-10-01-inscricoes.md e SPEC/2026-10-01-avaliacoes.md
  - Critério de conclusão: Fluxo automatizado: cadastro $\to$ busca de evento $\to$ inscrição $\to$ cancelamento $\to$ reinscrição $\to$ check-in $\to$ avaliação executando com sucesso.

- [ ] TASK-052 — Implementar testes ponta a ponta (E2E) da jornada do Organizador
  - SPEC: SPEC/2026-10-01-eventos.md, SPEC/2026-10-01-vagas.md e SPEC/2026-10-01-painel-organizador.md
  - Critério de conclusão: Fluxo automatizado: login $\to$ criação de evento com lotação $\to$ publicação $\to$ controle de vagas $\to$ abertura de check-in $\to$ conferência de presença executando com sucesso.

- [ ] TASK-053 — Implementar testes ponta a ponta (E2E) da jornada do Administrador
  - SPEC: SPEC/2026-10-01-categorias.md e SPEC/2026-10-01-painel-admin.md
  - Critério de conclusão: Fluxo automatizado: login admin $\to$ cadastro de categoria $\to$ moderação de evento $\to$ suspensão de usuário $\to$ consulta a indicadores institucionais executando com sucesso.

- [ ] TASK-054 — Realizar auditoria de segurança estática e tratamento de payloads
  - SPEC: SPEC/2026-10-01-visao-geral.md e SPEC/2026-10-01-autenticacao.md
  - Critério de conclusão: Sanitização de entradas contra injeções, validação de expiração e assinatura de tokens JWT e blindagem contra vazamento de senhas em endpoints.

- [ ] TASK-055 — Executar checagem de cobertura de testes de regras de negócio
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Relatório de cobertura confirmando que todos os caminhos críticos e regras de negócio das 9 SPECs estão testados e verdes.

---

## Fase 9 — Infraestrutura e Deploy

- [ ] TASK-056 — Criar Dockerfile para o backend com build em multi-stage
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Imagem do backend construída com sucesso, executando de forma desacoplada e expondo a porta da aplicação.

- [ ] TASK-057 — Criar Dockerfile para o frontend com servidor estático
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Imagem do frontend construída e servindo a aplicação SPA sem falhas de roteamento.

- [ ] TASK-058 — Criar docker-compose.yml orquestrando frontend, backend e dados
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Todos os serviços inicializados e operacionais em rede interna através de um único comando `docker compose up`.

- [ ] TASK-059 — Criar script de semente (seed) com usuário admin padrão e categorias iniciais
  - SPEC: SPEC/2026-10-01-autenticacao.md e SPEC/2026-10-01-categorias.md
  - Critério de conclusão: Execução do script popula o sistema com 1 usuário ADMIN e ao menos 3 categorias ativas sem duplicidades.

- [ ] TASK-060 — Elaborar documentação operacional de execução e deploy no README.md
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Instruções detalhadas e reprodutíveis para inicialização local via Docker e via ambiente de desenvolvimento documentadas.

---

## Fase 10 — Auditoria Final e Validação SDD

- [ ] TASK-061 — Auditar rastreabilidade dos critérios de aceitação de todas as SPECs
  - SPEC: Todas as SPECs
  - Critério de conclusão: Matriz de rastreabilidade preenchida validando que nenhum critério de aceitação das 9 SPECs deixou de ser atendido.

- [ ] TASK-062 — Auditar integridade do BACKLOG.md e bloqueio de escopo
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Verificação no código confirmando que funcionalidades do BACKLOG (ex.: QR Code, certificados PDF, mailing, lista de espera) não foram implementadas prematuramente.

- [ ] TASK-063 — Auditar histórico de commits Git conforme regras de SDD
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Verificação do log do Git comprovando: ausência de squashes, ausência de pushes forçados, granularidade atômica e presença obrigatória dos trailers `Spec` e `Agent` em todos os commits de código e teste.

- [ ] TASK-064 — Executar ensaio final da demonstração do sistema
  - SPEC: SPEC/2026-10-01-visao-geral.md
  - Critério de conclusão: Demonstração fluida dos fluxos de Aluno, Organizador e Administrador em ambiente limpo, sem erros de runtime ou falhas de estado.
