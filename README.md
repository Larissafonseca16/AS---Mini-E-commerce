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

## Funcionalidades Implementadas

### ✅ Obrigatórias
- Listagem de produtos com imagem, nome, preço e botão "Ver Detalhes"
- Página de detalhes do produto com descrição e estoque
- Adicionar produtos ao carrinho respeitando o estoque
- Aumentar e diminuir quantidade no carrinho
- Remover itens do carrinho
- Gerenciamento global do carrinho com Context API
- Cadastro de novos produtos com validações
- Deletar produtos
- Navegação entre múltiplas páginas com React Router
- Consumo de dados da API com fetch
- Hooks essenciais: useState, useEffect, useContext, useRef
- Estilização com TailwindCSS
- Validações de estoque (não ultrapassar limite)
- Página 404

### ✅ Opcionais Implementadas
- Persistência do carrinho no localStorage
- Mensagens de erro e sucesso com toast
- Indicador de quantidade no carrinho no header
- Responsividade mobile-first
- Header sticky com navegação

## Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)

### Instalação

1. Instale as dependências:
```bash
pnpm install
```

2. Em um terminal, inicie o JSON Server:
```bash
pnpm db
```

3. Em outro terminal, inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

4. Acesse a aplicação em `http://localhost:3000`

## Endpoints da API (JSON Server)

### Produtos
- `GET /produtos` - Lista todos os produtos
- `GET /produtos/:id` - Obtém um produto específico
- `POST /produtos` - Cria um novo produto
- `DELETE /produtos/:id` - Deleta um produto

## Context API - Carrinho

O contexto do carrinho gerencia:
- `itens` - Array de itens no carrinho
- `adicionarAoCarrinho(produto)` - Adiciona um produto
- `removerDoCarrinho(produtoId)` - Remove um item
- `aumentarQuantidade(produtoId)` - Aumenta a quantidade
- `diminuirQuantidade(produtoId)` - Diminui a quantidade
- `limparCarrinho()` - Limpa todo o carrinho
- `obterTotal()` - Calcula o total da compra

## Validações Implementadas

### Formulário de Cadastro
- Todos os campos são obrigatórios
- Preço deve ser um número ≥ 0
- Estoque deve ser um número ≥ 0
- Foco automático no primeiro campo inválido com useRef

### Carrinho
- Não permite ultrapassar o estoque disponível
- Exibe mensagem quando estoque máximo é atingido
- Bloqueia adição de produtos sem estoque

## Fluxo de Uso

1. **Home** - Visualize todos os produtos disponíveis
2. **Ver Detalhes** - Clique em um produto para ver mais informações
3. **Adicionar ao Carrinho** - Adicione produtos ao seu carrinho
4. **Carrinho** - Gerencie os itens (aumentar, diminuir, remover)
5. **Finalizar Compra** - Conclua a compra
6. **Novo Produto** - Crie novos produtos pelo formulário

## Notas Importantes

- O carrinho é persistido no localStorage, então os dados são mantidos mesmo após fechar o navegador
- O JSON Server simula uma API real, armazenando dados em `db.json`
- Não há autenticação implementada (conforme especificação do professor)
- Não há gerenciamento de estoque no backend (apenas validação no frontend)
- Não há tela de edição de produtos (conforme especificação do professor)

## Build para Produção

```bash
pnpm build
```

Os arquivos otimizados estarão em `dist/`
