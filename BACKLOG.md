# BACKLOG.md - Débitos Técnicos e Funcionalidades Futuras

Este documento centraliza todas as regras de negócio, funcionalidades, serviços auxiliares e melhorias que foram concebidas durante a fase de especificação do CampusHub, mas que deliberadamente **não** farão parte da entrega do núcleo mínimo inicial, evitando desvios de escopo e complexidade acidental.

---

### [BL-001] Emissão Automática de Certificados em PDF

- **Funcionalidade:** Geração de documento PDF com código de verificação e autenticidade para alunos com presença confirmada.
- **Motivo:** Depende de bibliotecas pesadas de renderização de PDF (ex.: Puppeteer, PDFKit) e armazenamento de arquivos estáticos em nuvem.
- **Dependência Futura:** Serviço de Object Storage (S3/MinIO) e módulo de assinatura de documentos digitais.
- **Comportamento Esperado:** Aluno com `presente = true` visualiza um botão "Baixar Certificado" na sua página de inscrições. O certificado exibe nome do aluno, título do evento, carga horária e hash criptográfico para validação pública.

---

### [BL-002] Check-in Dinâmico por QR Code

- **Funcionalidade:** Registro de presença por leitura em tempo real de QR Code gerado pelo organizador no projetor ou tela do evento.
- **Motivo:** Na etapa inicial, o check-in por código alfanumérico de 6 caracteres e o registro manual pelo organizador suprem a necessidade sem exigir dependência de câmera e geração de tokens temporais rotativos (TOTP).
- **Dependência Futura:** Interface web com acesso a câmera e biblioteca de geração de QR Codes com tokens efêmeros.
- **Comportamento Esperado:** O organizador projeta um QR Code que se renova a cada 30 segundos. O aluno aponta a câmera do celular autenticado e a presença é computada imediatamente.

---

### [BL-003] Fila de Espera para Vagas Esgotadas

- **Funcionalidade:** Inclusão automática de alunos em uma fila de espera ordenada cronologicamente quando as vagas do evento atingirem 100%.
- **Motivo:** Manter a consistência transacional inicial focada apenas no limite fixo e direto de vagas antes de introduzir regras assíncronas de promoção.
- **Dependência Futura:** Mecanismo de mensageria ou agendamento de jobs em segundo plano com timers de expiração.
- **Comportamento Esperado:** Quando uma inscrição confirmada for cancelada, o primeiro aluno da fila de espera é promovido para a vaga e recebe prazo de 24 horas para confirmar a participação.

---

### [BL-004] Exportação de Relatórios e Listas de Presença (CSV/Excel)

- **Funcionalidade:** Download da lista de participantes, dados de presença e respostas de avaliações em arquivos `.csv` e `.xlsx`.
- **Motivo:** A visualização em tela no Painel do Organizador e no Painel do Administrador atende ao requisito operacional imediato.
- **Dependência Futura:** Utilitários de serialização tabular e streaming de arquivos.
- **Comportamento Esperado:** No painel do organizador e do admin, disponibilizar botão "Exportar (.csv)" que realiza o download da relação de inscritos com status e horários de check-in.

---

### [BL-005] Notificações Transacionais por E-mail

- **Funcionalidade:** Envio de e-mails em eventos-chave: confirmação de inscrição, cancelamento de evento, lembrete 24h antes do início e convocação para avaliação.
- **Motivo:** Evitar dependência de provedores externos de SMTP (SendGrid, Amazon SES, Mailgun) na fase de modelagem de domínio.
- **Dependência Futura:** Gateway de mensageria assíncrona (RabbitMQ/Redis) e provedor de e-mail transacional.
- **Comportamento Esperado:** Eventos de domínio disparam disparos assíncronos de e-mail sem travar a requisição HTTP do usuário.

---

### [BL-006] Autenticação Federada Universitária (OAuth2 / SAML / Gov.br)

- **Funcionalidade:** Login único utilizando credenciais institucionais acadêmicas ou login federado.
- **Motivo:** Requer convênios de infraestrutura e provedores de identidade específicos que inviabilizariam os testes locais da aplicação.
- **Dependência Futura:** Provedor OpenID Connect institucional configurado.
- **Comportamento Esperado:** Usuário clica em "Entrar com Credencial Universitária" e é autenticado via SSO.

---

### [BL-007] Upload e Armazenamento de Banners de Eventos

- **Funcionalidade:** Upload de imagem de capa para o evento pelo organizador.
- **Motivo:** Demanda infraestrutura de bucket de imagens, validação de multipart/form-data e redimensionamento de mídia.
- **Dependência Futura:** Serviço de storage (S3/Cloudinary) e processador de imagens (Sharp).
- **Comportamento Esperado:** Organizador faz upload de imagem JPEG/PNG de até 5MB, que é salva em storage e referenciada por URL pública.
