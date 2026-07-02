# Mini E-commerce

Um mini e-commerce desenvolvido com React, TailwindCSS e Context API para gerenciamento de carrinho.

## Tecnologias Utilizadas

- **React 19** - Framework UI
- **TailwindCSS 4** - Estilização
- **Wouter** - Roteamento
- **Context API** - Gerenciamento de estado global (carrinho)
- **JSON Server** - API simulada
- **Sonner** - Notificações toast

## Estrutura do Projeto

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx              # Listagem de produtos
│   │   ├── DetalheProduto.tsx    # Detalhes do produto
│   │   ├── Carrinho.tsx          # Gerenciamento do carrinho
│   │   ├── CadastroProduto.tsx   # Cadastro de novo produto
│   │   └── NotFound.tsx          # Página 404
│   ├── components/
│   │   └── Header.tsx            # Header reutilizável
│   ├── contexts/
│   │   └── CarrinhoContext.tsx   # Context do carrinho
│   ├── hooks/
│   │   └── useFetch.ts           # Hook customizado para fetch
│   ├── services/
│   │   └── api.ts                # Serviço de API
│   └── App.tsx                   # Rotas principais
├── db.json                        # Banco de dados JSON
└── package.json
```

Como Rodar o Projeto

Pré-requisitos
Node.js versão 18 ou superior
npm ou pnpm como gerenciador de pacotes

Instalação
1. Extraia o arquivo ZIP do projeto
2. Abra o terminal na pasta do projeto
3. Execute: npm install --legacy-peer-deps

Executando o Projeto
Abra DOIS terminais diferentes na pasta do projeto:
Terminal 1 - Inicie o JSON Server (banco de dados):
npm run db
Terminal 2 - Inicie o servidor de desenvolvimento:
npm run dev
Acesse a aplicação em: http://localhost:3000

