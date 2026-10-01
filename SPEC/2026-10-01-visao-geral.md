# CampusHub — Visão Geral

**Data:** 2026-10-01

## O quê e por quê

O CampusHub é uma aplicação web para gerenciamento de eventos acadêmicos universitários.

A plataforma permite que alunos encontrem eventos, consultem informações, realizem inscrições e acompanhem sua participação.

Organizadores podem criar e administrar eventos, controlar vagas e acompanhar os participantes.

Administradores possuem recursos de gerenciamento e moderação da plataforma.

O objetivo é centralizar a divulgação e o gerenciamento de eventos acadêmicos em uma única aplicação.

## Usuários

### Aluno

O aluno poderá:

- criar uma conta;
- realizar login;
- visualizar eventos;
- pesquisar eventos;
- filtrar eventos;
- visualizar detalhes;
- realizar inscrição;
- cancelar inscrição;
- consultar suas inscrições;
- registrar participação quando disponível;
- avaliar eventos dos quais participou.

### Organizador

O organizador poderá:

- criar eventos;
- editar eventos;
- cancelar eventos;
- definir limite de vagas;
- visualizar inscritos;
- controlar presença;
- acompanhar informações dos eventos.

### Administrador

O administrador poderá:

- visualizar usuários;
- gerenciar eventos;
- moderar eventos;
- visualizar inscrições;
- visualizar indicadores da plataforma.

## Fluxo principal

O fluxo principal da aplicação será:

1. usuário acessa a aplicação;
2. usuário realiza cadastro ou login;
3. usuário visualiza eventos disponíveis;
4. usuário pesquisa ou filtra eventos;
5. usuário acessa os detalhes de um evento;
6. usuário realiza inscrição;
7. sistema verifica disponibilidade de vagas;
8. sistema confirma a inscrição;
9. usuário consulta suas inscrições;
10. participação é registrada;
11. usuário pode avaliar o evento após sua participação.

## Regras de negócio iniciais

- Um usuário não pode se inscrever duas vezes no mesmo evento.
- Um evento não pode aceitar inscrições quando atingir o limite de vagas.
- Um usuário pode cancelar uma inscrição enquanto o período permitido estiver aberto.
- Um evento cancelado não deve aceitar novas inscrições.
- Apenas usuários autenticados podem realizar inscrições.
- Um organizador somente pode administrar seus próprios eventos.
- Um administrador pode moderar eventos.
- Uma avaliação somente pode ser realizada por participante elegível.

## Critérios de aceitação

- O usuário consegue criar uma conta.
- O usuário consegue realizar login.
- O usuário consegue visualizar eventos.
- O usuário consegue pesquisar eventos.
- O usuário consegue visualizar detalhes de um evento.
- O usuário consegue realizar uma inscrição.
- O sistema impede inscrição duplicada.
- O sistema impede inscrição quando não existem vagas.
- O usuário consegue consultar suas inscrições.
- O organizador consegue visualizar seus eventos.
- O organizador consegue visualizar os inscritos.
- O administrador consegue visualizar e moderar eventos.

## Fora do escopo inicial

As seguintes funcionalidades não fazem parte da primeira versão:

- pagamentos;
- integração com Google Calendar;
- envio real de e-mails;
- notificações push;
- certificados automáticos;
- integração com serviços externos;
- aplicativo mobile nativo.

Funcionalidades futuras identificadas durante o desenvolvimento deverão ser registradas em `BACKLOG.md`.

## Requisitos não funcionais

- A aplicação deve possuir interface responsiva.
- O sistema deve possuir validação de dados.
- As funcionalidades devem possuir testes.
- O acesso às funcionalidades deve respeitar o perfil do usuário.
- O código deve ser organizado e modular.
- O projeto deve seguir Spec-Driven Development.
- O histórico Git deve preservar a ordem entre especificação e implementação.
