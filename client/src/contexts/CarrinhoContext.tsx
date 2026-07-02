import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  estoque: number;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (produtoId: number) => void;
  aumentarQuantidade: (produtoId: number) => void;
  diminuirQuantidade: (produtoId: number) => void;
  limparCarrinho: () => void;
  obterTotal: () => number;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      try {
        setItens(JSON.parse(carrinhoSalvo));
      } catch (erro) {
        console.error('Erro ao carregar carrinho do localStorage:', erro);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itens));
  }, [itens]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.produto.id === produto.id);

      if (itemExistente) {
        if (itemExistente.quantidade < produto.estoque) {
          return itensAtuais.map((item) =>
            item.produto.id === produto.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          );
        }
        return itensAtuais;
      }

      return [...itensAtuais, { produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (produtoId: number) => {
    setItens((itensAtuais) =>
      itensAtuais.filter((item) => item.produto.id !== produtoId)
    );
  };

  const aumentarQuantidade = (produtoId: number) => {
    setItens((itensAtuais) =>
      itensAtuais.map((item) => {
        if (item.produto.id === produtoId && item.quantidade < item.produto.estoque) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      })
    );
  };

  const diminuirQuantidade = (produtoId: number) => {
    setItens((itensAtuais) =>
      itensAtuais.map((item) => {
        if (item.produto.id === produtoId && item.quantidade > 1) {
          return { ...item, quantidade: item.quantidade - 1 };
        }
        return item;
      })
    );
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const obterTotal = () => {
    return itens.reduce((total, item) => total + item.produto.preco * item.quantidade, 0);
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        limparCarrinho,
        obterTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) {
    throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
  }
  return contexto;
}
