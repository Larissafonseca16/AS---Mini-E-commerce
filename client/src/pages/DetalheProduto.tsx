import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCarrinho, Produto } from '@/contexts/CarrinhoContext';
import { toast } from 'sonner';

export default function DetalheProduto() {
  const [, params] = useRoute('/produto/:id');
  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const { adicionarAoCarrinho, itens } = useCarrinho();

  const produtoId = params?.id ? parseInt(params.id) : null;

  useEffect(() => {
    if (!produtoId) return;

    const buscarProduto = async () => {
      try {
        const resposta = await fetch(`http://localhost:3001/produtos/${produtoId}`);
        if (!resposta.ok) throw new Error('Produto não encontrado');
        const dados = await resposta.json();
        setProduto(dados);
      } catch (erro) {
        setErro(erro instanceof Error ? erro.message : 'Erro desconhecido');
      } finally {
        setCarregando(false);
      }
    };

    buscarProduto();
  }, [produtoId]);

  if (carregando) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando produto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (erro || !produto) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-4">Erro: {erro || 'Produto não encontrado'}</p>
            <Link href="/">
              <Button>Voltar para Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const itemNoCarrinho = itens.find((item) => item.produto.id === produto.id);
  const quantidadeNoCarrinho = itemNoCarrinho?.quantidade || 0;
  const estoqueMaximoAtingido = quantidadeNoCarrinho >= produto.estoque;
  const botaoDesativado = produto.estoque === 0 || estoqueMaximoAtingido;

  const handleAdicionarAoCarrinho = () => {
    if (botaoDesativado) {
      if (estoqueMaximoAtingido) {
        toast.error('Estoque máximo atingido para este produto');
      } else {
        toast.error('Produto esgotado');
      }
      return;
    }
    adicionarAoCarrinho(produto);
    toast.success('Produto adicionado ao carrinho!');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container py-8 flex-1">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Imagem */}
          <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden aspect-square">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Informações */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{produto.nome}</h1>
              
              <div className="mb-6">
                <p className="text-2xl font-bold text-primary mb-2">
                  R$ {produto.preco.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estoque: {produto.estoque} unidades
                </p>
              </div>

              <Card className="p-4 mb-6 bg-muted/50">
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-foreground/80">{produto.descricao}</p>
              </Card>

              {estoqueMaximoAtingido && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-6">
                  <p className="text-sm font-medium">Estoque máximo atingido</p>
                </div>
              )}
            </div>

            <Button
              size="lg"
              className="w-full gap-2"
              onClick={handleAdicionarAoCarrinho}
              disabled={botaoDesativado}
            >
              <ShoppingCart className="w-5 h-5" />
              {produto.estoque === 0 ? 'Produto Esgotado' : 'Adicionar ao Carrinho'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
