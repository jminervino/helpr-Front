<div align="center">

# Helpr — Frontend

**Sistema de gerenciamento de chamados técnicos**
Interface web construída com Angular 14 e Angular Material

[![Angular](https://img.shields.io/badge/Angular-14-DD0031?logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Angular Material](https://img.shields.io/badge/Angular_Material-13-757575?logo=material-design&logoColor=white)](https://material.angular.io/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

</div>

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Stack e Dependências](#stack-e-dependências)
- [Arquitetura](#arquitetura)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Pré-requisitos](#pré-requisitos)
- [Como Rodar](#como-rodar)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Rotas da Aplicação](#rotas-da-aplicação)
- [Autenticação e Autorização](#autenticação-e-autorização)
- [Integração com a API](#integração-com-a-api)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Build e Deploy](#build-e-deploy)
- [Identidade Visual](#identidade-visual)

---

## Sobre o Projeto

O **Helpr** é um sistema de gestão de chamados técnicos desenvolvido como POC (Proof of Concept) durante o bootcamp BCW18 da Soul Code Academy. A aplicação permite o cadastro e gerenciamento de técnicos, clientes e chamados de suporte, com controle de acesso baseado em papéis (ADMIN, TÉCNICO, CLIENTE).

Este repositório contém o **frontend Angular**, que se comunica com uma [API REST Spring Boot](https://github.com/jminervino/helpr).

---

## Funcionalidades

| Módulo | O que faz |
|--------|-----------|
| **Autenticação** | Login com e-mail e senha, JWT com expiração de 24h |
| **Dashboard** | Visão geral dos chamados por status (aberto, andamento, encerrado) |
| **Chamados** | Criar, visualizar e atualizar chamados com prioridade e status |
| **Clientes** | CRUD completo de clientes; listagem dos chamados abertos por cliente |
| **Técnicos** | CRUD completo de técnicos |
| **Admin** | Painel exclusivo para administradores |
| **Manual** | Documentação de uso integrada à aplicação |

---

## Stack e Dependências

### Core
| Dependência | Versão | Uso |
|------------|--------|-----|
| Angular | 14.0.4 | Framework principal |
| TypeScript | 4.7 | Linguagem |
| RxJS | 7.5.0 | Programação reativa |

### UI
| Dependência | Versão | Uso |
|------------|--------|-----|
| Angular Material | 13.3.8 | Componentes de UI |
| Angular CDK | 13.3.8 | Utilitários de componentes |
| @ngneat/hot-toast | 4.1.0 | Notificações toast |
| ngx-mask | 13.1.15 | Máscara de campos (CPF) |

### Autenticação
| Dependência | Versão | Uso |
|------------|--------|-----|
| @auth0/angular-jwt | 5.0.2 | Decodificação e validação de JWT |

### Infraestrutura
| Dependência | Versão | Uso |
|------------|--------|-----|
| Angular Service Worker | 14.0.4 | Suporte a PWA |

---

## Arquitetura

A aplicação segue a arquitetura modular do Angular com lazy loading em todos os módulos de feature.

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                                                         │
│  ┌──────────┐   ┌─────────────┐   ┌─────────────────┐  │
│  │  Guards  │──▶│   Router    │──▶│  Feature Module │  │
│  └──────────┘   └─────────────┘   └────────┬────────┘  │
│                                            │            │
│  ┌──────────────────────────────────────── ▼──────────┐ │
│  │              HTTP Interceptors                      │ │
│  │   AuthInterceptor → ErrorInterceptor               │ │
│  └──────────────────────────────────────────────────┬─┘ │
│                                                     │   │
└─────────────────────────────────────────────────────┼───┘
                                                      │
                                                      ▼
                                         ┌────────────────────┐
                                         │  Spring Boot API   │
                                         │  localhost:8080     │
                                         └────────────────────┘
```

**Padrões utilizados:**
- **OnPush Change Detection** nos componentes de listagem
- **TrackBy** em todos os `*ngFor`
- **takeUntil + Subject** para cancelamento de subscriptions no `OnDestroy`
- **Async Pipe** nos templates para gerenciamento automático de subscriptions
- **Reactive Forms** com validators customizados

---

## Estrutura de Pastas

```
src/app/
├── admin/                    # Módulo administrativo (ROLE_ADMIN)
├── auth/                     # Tela de login
├── chamados/                 # Gestão de chamados
│   └── components/
│       ├── chamado-create/
│       ├── chamado-detail/
│       └── chamado-update/
├── clientes/                 # Gestão de clientes
│   └── components/
│       ├── cliente-aberto/   # Chamados abertos do cliente
│       ├── cliente-create/
│       ├── cliente-detail/
│       └── cliente-update/
├── core/                     # Módulo singleton (serviços, guards, interceptors)
│   ├── components/
│   │   ├── dialog/           # Dialog de confirmação de logout
│   │   ├── header/           # Navegação principal
│   │   └── not-found/
│   ├── guards/
│   │   ├── auth.guard.ts         # Redireciona para /auth se não autenticado
│   │   ├── logged-in.guard.ts    # Impede acesso ao login se já autenticado
│   │   └── role.guard.ts         # Protege rotas por papel (ADMIN)
│   ├── interceptors/
│   │   ├── auth/             # Injeta token JWT em todas as requisições
│   │   └── error/            # Tratamento global de erros HTTP
│   ├── models/
│   │   ├── chamado.ts
│   │   └── pessoa.ts
│   └── services/
│       ├── auth/
│       ├── chamados/
│       ├── clientes/
│       ├── pessoas/
│       └── tecnicos/
├── home/                     # Dashboard
├── landing/                  # Página pública
├── manual-do-software/       # Manual de uso
├── shared/                   # Componentes reutilizáveis
│   └── components/
│       ├── confirm-dialog/
│       ├── empty-state/
│       ├── loader/
│       ├── page-header/
│       ├── prioridade-chip/  # Badge de prioridade (BAIXA/MEDIA/ALTA)
│       └── status-chip/      # Badge de status (ABERTO/ANDAMENTO/ENCERRADO)
├── tecnicos/                 # Gestão de técnicos
└── app-routing.module.ts
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 16
- [npm](https://www.npmjs.com/) >= 8
- [Angular CLI](https://angular.io/cli) 14

```bash
npm install -g @angular/cli@14
```

---

## Como Rodar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/helpr-Front.git
cd helpr-Front
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Edite `src/environments/environment.ts` com a URL do backend:

```typescript
export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:8080',
  },
};
```

### 4. Suba o backend

O frontend depende da [API Spring Boot](https://github.com/jminervino/helpr). Certifique-se de que ela está rodando em `localhost:8080`.

### 5. Inicie a aplicação

```bash
npm start
```

Acesse: [http://localhost:4200](http://localhost:4200)

### Mock API (opcional)

Para desenvolvimento sem o backend real:

```bash
npm run mock
```

---

## Variáveis de Ambiente

Os arquivos de ambiente estão em `src/environments/`:

| Arquivo | Perfil | URL da API |
|---------|--------|-----------|
| `environment.ts` | Desenvolvimento | `http://localhost:8080` |
| `environment.prod.ts` | Produção | Configurar com a URL do seu backend |

---

## Rotas da Aplicação

| Rota | Módulo | Guard | Papel necessário |
|------|--------|-------|-----------------|
| `/landing` | LandingModule | — | Público |
| `/auth` | AuthModule | AuthLogadoGuard | Não autenticado |
| `/home` | HomeModule | AuthGuard | Qualquer autenticado |
| `/chamados` | ChamadosModule | AuthGuard | Qualquer autenticado |
| `/chamados/new` | ChamadosModule | AuthGuard | Qualquer autenticado |
| `/chamados/:id` | ChamadosModule | AuthGuard | Qualquer autenticado |
| `/chamados/edit/:id` | ChamadosModule | AuthGuard | Qualquer autenticado |
| `/clientes` | ClientesModule | AuthGuard | Qualquer autenticado |
| `/clientes/new` | ClientesModule | AuthGuard | Qualquer autenticado |
| `/clientes/edit/:id` | ClientesModule | AuthGuard | Qualquer autenticado |
| `/clientes/chamados/:id` | ClientesModule | AuthGuard | Qualquer autenticado |
| `/tecnicos` | TecnicosModule | AuthGuard | Qualquer autenticado |
| `/tecnicos/new` | TecnicosModule | AuthGuard | Qualquer autenticado |
| `/tecnicos/edit/:id` | TecnicosModule | AuthGuard | Qualquer autenticado |
| `/admin` | AdminModule | RoleGuard | ADMIN |
| `/manual-do-software` | ManualModule | AuthGuard | Qualquer autenticado |

---

## Autenticação e Autorização

### Fluxo de Login

```
Usuário → POST /login → Backend gera JWT → Token no header Authorization
    → Frontend extrai token → Salva no localStorage → Redireciona para /home
```

### Papéis Disponíveis

| Papel | Código | Permissões |
|-------|--------|-----------|
| `ADMIN` | 0 | Acesso total, incluindo `/admin` |
| `TECNICO` | 2 | Gerenciar chamados, clientes e técnicos |
| `CLIENTE` | 1 | Visualizar chamados |

### JWT

- **Algoritmo:** HS512
- **Expiração:** 24 horas
- **Armazenamento:** `localStorage` (chave: `token`)
- **Envio:** Header `Authorization: Bearer {token}` via interceptor automático

### Tratamento de Erros HTTP

| Status | Ação |
|--------|------|
| `401` | Remove o token e redireciona para `/auth` |
| `403` | Toast com mensagem de permissão negada |
| `409` | Toast com mensagem de conflito da API |
| `0` | Toast de servidor indisponível |

---

## Integração com a API

### Base URL

| Ambiente | URL |
|----------|-----|
| Desenvolvimento | `http://localhost:8080` |

### Endpoints Consumidos

#### Autenticação
```
POST /login
Body: { email: string, senha: string }
Response Header: Authorization: Bearer {token}
```

#### Chamados
```
GET    /service/chamados
GET    /service/chamados/{id}
GET    /service/chamados/relatorios/cliente/{clienteId}
POST   /service/chamados
PUT    /service/chamados/{id}
```

#### Clientes
```
GET    /service/clientes
GET    /service/clientes/{id}
POST   /service/clientes
PUT    /service/clientes/{id}
DELETE /service/clientes/{id}
```

#### Técnicos
```
GET    /service/tecnicos
GET    /service/tecnicos/{id}
POST   /service/tecnicos
PUT    /service/tecnicos/{id}
DELETE /service/tecnicos/{id}
```

### Mapeamento de Enums

O frontend converte enums para inteiros antes de enviar para a API:

| Prioridade | Código |
|-----------|--------|
| BAIXA | 0 |
| MEDIA | 1 |
| ALTA | 2 |

| Status | Código |
|--------|--------|
| ABERTO | 0 |
| ANDAMENTO | 1 |
| ENCERRADO | 2 |

---

## Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `npm start` | `ng serve` | Servidor de desenvolvimento |
| `npm run build` | `ng build` | Build de produção |
| `npm test` | `ng test` | Testes unitários (Karma) |
| `npm run mock` | `json-server` | Servidor mock da API |

---

## Build e Deploy

### Build de produção

```bash
npm run build
```

Os arquivos serão gerados em `dist/helpr-front/`.

### PWA

A aplicação tem suporte a PWA configurado via Angular Service Worker. O Service Worker é ativado automaticamente no build de produção.

### Budgets de bundle (angular.json)

| Tipo | Aviso | Erro |
|------|-------|------|
| Bundle inicial | 500 KB | 2.5 MB |
| Estilos de componente | 8 KB | 16 KB |

---

## Identidade Visual

### Banners Internos

![Banner 1](https://user-images.githubusercontent.com/31005408/175540233-f385fa20-1cf9-44c1-86e5-161c9fdc0a9f.png)
![Banner 2](https://user-images.githubusercontent.com/31005408/175540237-dd9c8a51-20bb-4268-b707-8541b1bdf48f.png)
![Banner 3](https://user-images.githubusercontent.com/31005408/175540242-0f130914-ee1f-44f4-8a4d-11456f885bf4.png)

### Logos

![Logo Texto](https://user-images.githubusercontent.com/31005408/175540475-3e0ed730-2794-4a60-a0df-2441eaae2ec5.png)
![Logo Quadrado](https://user-images.githubusercontent.com/31005408/175540569-ba81b652-a198-426d-9362-606a35b3a6ca.png)
![Logo Horizontal](https://user-images.githubusercontent.com/31005408/175540636-a2b67183-55dd-440b-a1f8-5d6484b008ea.png)

---

## Projeto Relacionado

- **Backend (Spring Boot):** [github.com/jminervino/helpr](https://github.com/jminervino/helpr) — API REST com autenticação JWT e banco de dados MySQL
