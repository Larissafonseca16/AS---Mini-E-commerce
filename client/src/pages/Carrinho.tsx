import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCarrinho } from '@/contexts/CarrinhoContext';
import { toast } from 'sonner';

export default function Carrinho() {
  const { itens, removerDoCarrinho, aumentarQuantidade, diminuirQuantidade, obterTotal, limparCarrinho } = useCarrinho();

  const handleFinalizarCompra = () => {
    if (itens.length === 0) {
      toast.error('Carrinho vazio');
      return;
    }
    toast.success('Compra finalizada com sucesso!');
    limparCarrinho();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container py-8 flex-1">
        <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

        {itens.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
            <Link href="/">
              <Button>Continuar Comprando</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Itens */}
            <div className="lg:col-span-2 space-y-4">
              {itens.map((item) => (
                <Card key={item.produto.id} className="p-4">
                  <div className="flex gap-4">
                    {/* Imagem */}
                    <div className="w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.produto.imagem}
                        alt={item.produto.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Informações */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.produto.nome}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Preço unitário: R$ {item.produto.preco.toFixed(2)}
                      </p>
                      <p className="text-sm font-medium mb-3">
                        Estoque máximo: {item.produto.estoque}
                      </p>

                      {/* Controles de Quantidade */}
                      <div className="flex items-center gap-2 mb-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => diminuirQuantidade(item.produto.id)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantidade}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => aumentarQuantidade(item.produto.id)}
                          disabled={item.quantidade >= item.produto.estoque}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {item.quantidade >= item.produto.estoque && (
                        <p className="text-xs text-yellow-600 font-medium mb-3">
                          Estoque máximo atingido
                        </p>
                      )}
                    </div>

                    {/* Preço Total e Remover */}
                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="text-2xl font-bold text-primary">
                          R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removerDoCarrinho(item.produto.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>R$ {obterTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete:</span>
                    <span>R$ 0,00</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {obterTotal().toFixed(2)}
                  </span>
                </div>

                <Button
                  size="lg"
                  className="w-full mb-3"
                  onClick={handleFinalizarCompra}
                >
                  Finalizar Compra
                </Button>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Continuar Comprando
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
