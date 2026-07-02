import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCarrinho } from '@/contexts/CarrinhoContext';

export default function Header() {
  const { itens } = useCarrinho();
  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);

  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer hover:text-primary transition-colors">
            Loja Online
          </h1>
        </Link>
        <div className="flex gap-4">
          <Link href="/cadastro">
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Produto
            </Button>
          </Link>
          <Link href="/carrinho">
            <Button size="sm" className="gap-2 relative">
              <ShoppingCart className="w-4 h-4" />
              Carrinho
              {totalItens > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItens}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
