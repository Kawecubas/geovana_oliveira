# Site Geovana de Oliveira Imóveis

Projeto em **Next.js + Node.js + Tailwind CSS + MySQL + Prisma**, preparado para site imobiliário premium com captação de leads e integração com CRM.

## Páginas criadas

- `/`
- `/lancamentos`
- `/alto-padrao`
- `/sobre-geovana`
- `/contato`
- `/curadoria-imobiliaria`

## Funcionalidades

- Visual premium nas cores marrom, dourado fosco e bege.
- Posicionamento de alto padrão e lançamentos.
- Botão fixo de WhatsApp em todas as páginas.
- Menu superior com navegação.
- Formulário de lead.
- API em Next.js/Node.js: `/api/leads`.
- Persistência em MySQL usando Prisma.
- Camada genérica para integração com CRM via webhook.

## Configuração

Crie um arquivo `.env` baseado no `.env.example`.

Exemplo:

```env
DATABASE_URL="mysql://root:senha@localhost:3306/geovana_imoveis"
NEXT_PUBLIC_WHATSAPP_NUMBER="5547999999999"
CRM_WEBHOOK_URL=""
CRM_API_TOKEN=""
CRM_PROVIDER="generic"
```

## Criar banco MySQL

Crie o banco:

```sql
CREATE DATABASE geovana_imoveis CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Instalação

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Acesse:

```bash
http://localhost:3000
```

## Como funciona a integração com CRM

Quando o formulário é enviado:

1. O lead é salvo na tabela `leads` do MySQL.
2. O sistema tenta enviar os dados para `CRM_WEBHOOK_URL`.
3. O retorno do CRM é salvo nos campos `crmStatus` e `crmResponse`.

Essa estrutura permite integrar com Kommo CRM, RD Station, HubSpot, Pipedrive ou outro sistema que aceite webhook/API.

## Arquivos importantes

- `app/api/leads/route.ts`: endpoint de cadastro de leads.
- `lib/crm.ts`: camada de integração com CRM.
- `lib/prisma.ts`: conexão com banco.
- `prisma/schema.prisma`: modelo da tabela `leads`.
- `lib/site.ts`: número do WhatsApp, mensagens e navegação.
