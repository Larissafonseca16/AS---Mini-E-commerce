import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { Produto } from '@/contexts/CarrinhoContext';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [deletandoIds, setDeletandoIds] = useState<number[]>([]);

  const buscarProdutos = async () => {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await fetch('http://localhost:3001/produtos');
      if (!resposta.ok) throw new Error('Erro ao buscar produtos');
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (erro) {
      setErro(erro instanceof Error ? erro.message : 'Erro desconhecido');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  const handleDeleteProduto = async (produtoId: number) => {
    const produto = produtos.find((item) => item.id === produtoId);
    if (!produto) return;

    const confirmar = window.confirm(`Deseja realmente excluir '${produto.nome}' da loja?`);
    if (!confirmar) return;

    setDeletandoIds((prev) => [...prev, produtoId]);

    try {
      const resposta = await fetch(`http://localhost:3001/produtos/${produtoId}`, {
        method: 'DELETE',
      });
      if (!resposta.ok) throw new Error('Erro ao excluir produto');

      setProdutos((prev) => prev.filter((item) => item.id !== produtoId));
      toast.success('Produto excluído com sucesso');
    } catch (erro) {
      toast.error(erro instanceof Error ? erro.message : 'Erro ao excluir produto');
    } finally {
      setDeletandoIds((prev) => prev.filter((id) => id !== produtoId));
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando produtos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-4">Erro: {erro}</p>
            <p className="text-sm text-muted-foreground mb-4">
              Certifique-se de que o JSON Server está rodando em http://localhost:3001
            </p>
            <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container py-8 flex-1">
        <h2 className="text-3xl font-bold mb-8">Produtos Disponíveis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <Card key={produto.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="aspect-square overflow-hidden bg-muted relative">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
                {produto.estoque === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Esgotado</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-2">{produto.nome}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                  {produto.descricao}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href={`/produto/${produto.id}`}>
                    <Button 
                      className="w-full"
                      disabled={produto.estoque === 0}
                    >
                      Ver Detalhes
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleDeleteProduto(produto.id)}
                    disabled={deletandoIds.includes(produto.id)}
                  >
                    {deletandoIds.includes(produto.id) ? 'Excluindo...' : 'Excluir Produto'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {produtos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum produto disponível no momento.</p>
          </div>
        )}
      </main>
    </div>
  );
}
