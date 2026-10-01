# PLAN — CampusHub

## 1. Objetivo

Este plano estabelece o roteiro ordenado, incremental e verificável para a construção da aplicação web **CampusHub**, seguindo a metodologia **Spec-Driven Development (SDD)**. O propósito é assegurar que toda linha de código produzida corresponda estritamente a especificações prévias (`SPEC/`), respeite a hierarquia de dependências funcionais, atenda aos critérios de aceitação e mantenha o escopo blindado contra acréscimos arbitrários por meio do controle explícito de débitos técnicos em `BACKLOG.md`.

---

## 2. Arquitetura

O CampusHub será concebido com separação estrita de responsabilidades em arquitetura em camadas orientada a casos de uso (_Clean Architecture_ pragmática), garantindo testabilidade isolada e substituição gradual de infraestrutura.

- **Frontend:**
  - Aplicação Single Page Application (SPA) estruturada por componentes e páginas vinculadas aos perfis (Aluno, Organizador, Administrador).
  - Camada de serviços HTTP isolada consumindo a API REST.
  - Gerenciamento de estado de autenticação (JWT) e controle de rotas protegidas por perfil (RBAC).

- **Backend:**
  - API RESTful em camadas bem delimitadas:
    - _Domínio / Core:_ Entidades e regras de negócio puras (sem dependências de frameworks).
    - _Casos de Uso (Use Cases):_ Orquestração de fluxos de negócio especificados.
    - _Controladores / Adaptadores:_ Validação de entrada, serialização e exposição das rotas HTTP.
    - _Middlewares:_ Extração de identidade, autenticação via Bearer Token e controle de acesso RBAC.

- **Camada de Dados:**
  - Adoção de _Repository Pattern_.
  - Fase intermediária: Repositórios em memória para validação ágil e desacoplada dos casos de uso e testes.
  - Persistência estruturada: Banco de dados relacional com modelagem referencial respeitando as chaves estrangeiras entre Usuários, Categorias, Eventos, Inscrições, Presenças e Avaliações.

- **Testes:**
  - Pirâmide de testes composta por testes unitários de domínio e casos de uso, testes de integração de rotas e persistência, e testes ponta a ponta (E2E) simulando a jornada real do usuário.

- **Infraestrutura:**
  - Conteinerização (Docker e Docker Compose) para padronização de ambiente de desenvolvimento e produção.
  - Configuração de pipelines de linting, checagem estática de tipos e suíte automatizada de testes.

---

## 3. Ordem de implementação

A ordem de implementação obedece estritamente às pré-condições definidas nas dependências de cada especificação:

1. **Fundação e Estrutura Técnica:** Setup, pipeline de validação e base de testes.
2. **Autenticação e Usuários (`autenticacao`):** Pré-requisito para identificar e autorizar qualquer ator no sistema.
3. **Categorias de Eventos (`categorias`):** Pré-requisito taxonômico para classificar eventos.
4. **Ciclo de Vida de Eventos (`eventos`):** Depende de Autenticação e Categorias.
5. **Controle de Vagas (`vagas`):** Depende da entidade de Eventos para reger capacidades.
6. **Inscrições em Eventos (`inscricoes`):** Depende de Eventos, Usuários (Aluno) e Controle de Vagas.
7. **Registro de Presença (`presenca`):** Depende de Inscrições ativas e Eventos em andamento.
8. **Avaliações e Feedback (`avaliacoes`):** Depende estritamente de presença confirmada.
9. **Painel do Organizador (`painel-organizador`):** Agregação de Eventos, Inscrições, Presença e Avaliações do organizador logado.
10. **Painel Administrativo (`painel-admin`):** Governança global, moderação e métricas consolidadas de todo o sistema.

---

## 4. Fases

### Fase 1 — Fundação

- **Objetivo:** Estabelecer a infraestrutura básica de projeto, padronização de código, estrutura de pastas e ecossistema de testes.
- **SPECs envolvidas:** `SPEC/2026-10-01-visao-geral.md`.
- **Dependências:** Nenhuma.
- **Principais tarefas:**
  - Configurar repositório, linter, formatador e tipagem estrita.
  - Estruturar diretórios do frontend, backend e testes.
  - Configurar runner de testes unitários e de integração.
  - Criar base de scripts de automação.
- **Testes necessários:** Teste de sanidade do pipeline de execução de testes (_smoke test_ de infraestrutura).
- **Critério de conclusão:** Pipeline de execução de testes e build executando com sucesso e sem advertências.

### Fase 2 — Autenticação

- **Objetivo:** Implementar o cadastro de contas, autenticação segura, geração de token JWT e autorização por perfil (RBAC).
- **SPECs envolvidas:** `SPEC/2026-10-01-autenticacao.md`.
- **Dependências:** Fase 1.
- **Principais tarefas:**
  - Modelar entidade `Usuario` e regras de validação de e-mail e complexidade de senha.
  - Implementar caso de uso de cadastro de usuários (bloqueando criação direta de `ADMIN`).
  - Implementar caso de uso de login com hash criptográfico irreversível e emissão de JWT.
  - Criar middlewares de autenticação e autorização por perfil (`ALUNO`, `ORGANIZADOR`, `ADMIN`).
  - Implementar interfaces de tela de login e cadastro no frontend.
- **Testes necessários:**
  - Unitários: Validação de força de senha, integridade de e-mail e hash de senhas.
  - Integração: Endpoints de registro e login verificando status HTTP 201, 200, 401, 409 e 422.
- **Critério de conclusão:** Todos os critérios de aceitação da SPEC de autenticação verificados e validados por testes.

### Fase 3 — Eventos e categorias

- **Objetivo:** Implementar a taxonomia de categorias e o ciclo de vida completo de eventos (criação, edição, cancelamento, busca e filtros).
- **SPECs envolvidas:** `SPEC/2026-10-01-categorias.md`, `SPEC/2026-10-01-eventos.md`.
- **Dependências:** Fase 2.
- **Principais tarefas:**
  - Implementar CRUD administrativo de categorias com controle de unicidade de nome e slug.
  - Implementar criação e edição de eventos por organizadores (validações de data e categoria ativa).
  - Implementar máquina de estados do evento (`RASCUNHO`, `PUBLICADO`, `CANCELADO`, `CONCLUIDO`).
  - Implementar motor de busca textual e filtros combinados (categoria, datas, modalidade, status).
  - Construir telas de catálogo público, busca de eventos e formulário de gestão de eventos.
- **Testes necessários:**
  - Unitários: Transição de estados do evento, consistência de intervalos de datas (`dataInicio < dataFim`).
  - Integração: Endpoints de categorias e eventos, garantindo que usuários anônimos e alunos só vejam eventos `PUBLICADO`.
- **Critério de conclusão:** Organizador apto a criar eventos válidos e alunos aptos a pesquisar e filtrar eventos publicados.

### Fase 4 — Inscrições e vagas

- **Objetivo:** Implementar a gestão transacional de vagas e o fluxo de inscrição e cancelamento pelo aluno.
- **SPECs envolvidas:** `SPEC/2026-10-01-vagas.md`, `SPEC/2026-10-01-inscricoes.md`.
- **Dependências:** Fase 3.
- **Principais tarefas:**
  - Implementar regras de capacidade e recálculo atômico de vagas disponíveis.
  - Implementar caso de uso de inscrição (validação de perfil `ALUNO`, duplicidade e lotação).
  - Implementar cancelamento voluntário de inscrição antes da `dataInicio`.
  - Implementar cancelamento em cascata de inscrições ao cancelar um evento.
  - Construir tela "Minhas Inscrições" para o aluno e controle de vagas no detalhe do evento.
- **Testes necessários:**
  - Unitários: Bloqueio de redução de limite de vagas abaixo dos inscritos ativos; cálculo de vagas restantes.
  - Integração: Concorrência básica em inscrições no limite de vagas; bloqueio de cancelamento retroativo; respostas HTTP 201, 400, 409 e 422.
- **Critério de conclusão:** Aluno capaz de se inscrever, visualizar suas inscrições e cancelar com liberação atômica da vaga correspondente.

### Fase 5 — Presença e avaliações

- **Objetivo:** Viabilizar o registro de presença por código ou pelo organizador e a submissão de avaliações pós-evento.
- **SPECs envolvidas:** `SPEC/2026-10-01-presenca.md`, `SPEC/2026-10-01-avaliacoes.md`.
- **Dependências:** Fase 4.
- **Principais tarefas:**
  - Implementar geração de código alfanumérico de check-in e abertura da janela de presença.
  - Implementar auto-check-in do aluno e marcação manual de presença pelo organizador.
  - Implementar caso de uso de envio de avaliação (nota de 1 a 5 e comentário) condicionado a `presente = true`.
  - Implementar agregação dinâmica de nota média do evento.
  - Construir interfaces de check-in e formulário de avaliação na visão do aluno.
- **Testes necessários:**
  - Unitários: Validação de janela temporal para check-in; verificação de nota entre 1 e 5; unicidade de avaliação por aluno/evento.
  - Integração: Tentativa de avaliação sem presença confirmada (HTTP 403); validação de check-in com código incorreto (HTTP 400).
- **Critério de conclusão:** Presença confirmada habilitando exclusivamente o envio da avaliação e atualização imediata da média pública do evento.

### Fase 6 — Painel do organizador

- **Objetivo:** Estruturar a visão consolidada de gestão operacional exclusiva para os organizadores de eventos.
- **SPECs envolvidas:** `SPEC/2026-10-01-painel-organizador.md`.
- **Dependências:** Fase 5.
- **Principais tarefas:**
  - Implementar consulta com isolamento estrito de eventos pelo `organizadorId`.
  - Implementar visualização detalhada de inscritos com status de presença.
  - Implementar cálculo dinâmico de taxa de ocupação dos eventos do organizador.
  - Implementar visualização dos comentários e feedbacks recebidos.
  - Desenvolver o layout do dashboard do organizador.
- **Testes necessários:**
  - Unitários: Cálculo de taxa de ocupação percentual.
  - Integração: Garantir que organizadores recebam HTTP 403 ao tentar visualizar ou alterar eventos de outros organizadores.
- **Critério de conclusão:** Organizador com acesso centralizado a todos os seus eventos, métricas de ocupação e lista de chamada funcional.

### Fase 7 — Painel administrativo

- **Objetivo:** Implementar as ferramentas de governança, suspensão de usuários, moderação de eventos e métricas globais para a administração.
- **SPECs envolvidas:** `SPEC/2026-10-01-painel-admin.md`.
- **Dependências:** Fase 6.
- **Principais tarefas:**
  - Implementar gestão e suspensão de contas de usuários (com bloqueio de auto-suspensão do próprio admin).
  - Implementar moderação forçada de eventos e cancelamentos compulsórios com registro de justificativa.
  - Implementar consolidação de indicadores institucionais: usuários ativos, taxa global de ocupação, taxa de _no-show_ e média geral de satisfação.
  - Implementar controle de visibilidade de comentários ofensivos nas avaliações.
  - Desenvolver o dashboard analítico administrativo.
- **Testes necessários:**
  - Unitários: Fórmula matemática de cálculo do _no-show_; impedimento de rebaixamento ou auto-bloqueio de administrador.
  - Integração: Verificação de proteção de rotas administrativas contra acessos de `ALUNO` e `ORGANIZADOR` (HTTP 403).
- **Critério de conclusão:** Painel administrativo operacional, com moderação ativa e consolidação fidedigna de métricas de todo o sistema.

### Fase 8 — Testes e qualidade

- **Objetivo:** Consolidar a cobertura de testes automatizados, validar cenários integrados entre múltiplos módulos e auditar consistência estática.
- **SPECs envolvidas:** Todas as SPECs.
- **Dependências:** Fase 7.
- **Principais tarefas:**
  - Implementar fluxos de testes de ponta a ponta (E2E) simulando a jornada completa (Cadastro $\to$ Criação de Evento $\to$ Inscrição $\to$ Presença $\to$ Avaliação $\to$ Métricas Administrativas).
  - Executar análise de cobertura de código assegurando testes nos caminhos críticos e regras de exceção.
  - Revisão estática de segurança e linting rigoroso.
- **Testes necessários:** Suíte de regressão automatizada (unitários, integração e E2E).
- **Critério de conclusão:** 100% dos testes da suíte automatizada passando sem falhas intermitentes.

### Fase 9 — Deploy

- **Objetivo:** Empacotar e preparar a distribuição do sistema em ambiente conteinerizado e reproduzível.
- **SPECs envolvidas:** Todas as SPECs.
- **Dependências:** Fase 8.
- **Principais tarefas:**
  - Construir e otimizar imagens Docker para frontend e backend.
  - Elaborar arquivo `docker-compose.yml` para orquestração da aplicação e dados.
  - Configurar rotinas de inicialização e dados semente (_seed_) contendo usuário administrador padrão e categorias iniciais.
  - Elaborar instruções claras de execução local e em servidor.
- **Testes necessários:** _Smoke tests_ executados contra a aplicação rodando via containers Docker.
- **Critério de conclusão:** Aplicação inicializada com sucesso a partir de um único comando de orquestração de containers.

### Fase 10 — Auditoria final

- **Objetivo:** Verificar a conformidade estrita de todo o sistema entregue em relação às especificações e ao fluxo SDD.
- **SPECs envolvidas:** Todas as SPECs e `BACKLOG.md`.
- **Dependências:** Fase 9.
- **Principais tarefas:**
  - Checar rastreabilidade entre cada funcionalidade entregue e sua respectiva SPEC.
  - Auditar o histórico de commits no Git para validar ausência de práticas vedadas.
  - Confirmar que nenhuma funcionalidade do `BACKLOG.md` foi indevidamente implementada.
  - Realizar validação cruzada dos critérios de aceitação de cada arquivo em `SPEC/`.
- **Testes necessários:** Execução completa da suíte de testes em ambiente limpo de demonstração.
- **Critério de conclusão:** Relatório de conformidade atestando cumprimento integral das SPECs, sem débitos técnicos vazados para a base de código.

---

## 5. Estratégia de testes

A validação de qualidade será guiada pelos critérios de aceitação objetivos de cada SPEC:

1. **Testes Unitários:**
   - **Foco:** Entidades de domínio, funções de cálculo matemático (ex.: vagas, no-show, média ponderada), validações de formatos e regras de negócio isoladas nos casos de uso.
   - **Isolamento:** Uso de dublês de teste (_mocks_ ou implementações em memória) para quaisquer interfaces de persistência ou rede.

2. **Testes de Integração:**
   - **Foco:** Ciclo de requisição/resposta HTTP, middlewares de autenticação JWT e autorização RBAC, validação de serialização/deserialização e integridade referencial dos repositórios.
   - **Garantia:** Validação dos códigos de status HTTP (200, 201, 400, 401, 403, 409, 422) e payloads de erro padronizados.

3. **Testes E2E (Ponta a Ponta):**
   - **Foco:** Jornadas completas dos três atores interagindo entre si no sistema.
   - **Cenários Centrais:**
     - Aluno se cadastra, encontra evento por busca/filtro, inscreve-se e cancela.
     - Organizador publica evento com 1 vaga, dois alunos tentam se inscrever concorrentemente, o segundo é bloqueado por lotação esgotada.
     - Organizador abre check-in, aluno registra presença via código e preenche avaliação com nota; média é refletida no evento.
     - Administrador suspende usuário e modera evento cancelando-o com justificativa.

---

## 6. Estratégia de Git

O histórico Git constituirá a evidência formal do processo metodológico de desenvolvimento:

- **Precedência da Especificação:** Nenhuma funcionalidade de código deve ser commitada antes que a respectiva SPEC já esteja formalizada e commitada no repositório.
- **Granularidade dos Commits:** Os commits devem ser atômicos e pequenos, contendo alterações coesas e associadas a uma única tarefa ou caso de uso específico.
- **Proibições Estritas:**
  - Não utilizar `git squash` (manter a granularidade original).
  - Não utilizar `git rebase` sobre branches ou históricos já publicados.
  - Não utilizar `git push --force` sob nenhuma hipótese.
- **Padronização de Mensagens e Metadados:**
  - Todas as mensagens de commit devem seguir o padrão Conventional Commits (ex.: `feat:`, `test:`, `docs:`, `fix:`).
  - Cada commit de implementação ou teste deverá obrigatoriamente conter no rodapé (trailers) a indicação do agente de IA e a SPEC referenciada:

    ```
    feat: adiciona caso de uso para inscricao em eventos

    Implementa a validacao de vagas e persistencia da inscricao do aluno.

    Spec: SPEC/2026-10-01-inscricoes.md
    Agent: Claude
    ```

---

## 7. Estratégia de BACKLOG

- O escopo do projeto é rigorosamente delimitado pelas 9 especificações aprovadas.
- Qualquer melhoria, funcionalidade periférica, recurso complementar ou sofisticação técnica identificada durante a implementação (como envio de e-mails, emissão de PDFs de certificados, upload de imagens ou leitura por QR Code dinâmico) **não** será implementada no momento da identificação.
- Tais itens devem ser imediatamente documentados no arquivo `BACKLOG.md` contendo:
  - Identificador único (ex.: `[BL-00X]`);
  - Nome da funcionalidade;
  - Motivo pelo qual não será implementada agora;
  - Dependências futuras para viabilização;
  - Comportamento esperado detalhado.
- Isso assegura o foco na entrega das regras essenciais e na previsibilidade do cronograma acadêmico.

---

## 8. Critério de conclusão do projeto

O projeto CampusHub será considerado concluído e apto para apresentação acadêmica quando atender simultaneamente aos seguintes requisitos:

1. **Conformidade Documental:** Todas as 9 SPECs presentes em `SPEC/` implementadas e com 100% dos seus critérios de aceitação atendidos.
2. **Qualidade Automatizada:** Suíte de testes unitários, integrados e E2E executando sem falhas em ambiente isolado.
3. **Escopo Protegido:** Nenhuma implementação não-especificada existente no código; todos os itens complementares devidamente isolados no `BACKLOG.md`.
4. **Execução Reproduzível:** Aplicação executando localmente via container Docker sem necessidade de intervenções manuais complexas.
5. **Auditoria de Histórico:** Histórico de commits linear, rastreável, atômico, sem alterações forçadas e com os devidos trailers de auditoria (`Spec` e `Agent`).
