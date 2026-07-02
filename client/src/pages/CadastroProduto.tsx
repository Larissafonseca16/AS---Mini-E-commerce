import { useState, useRef } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  estoque: string;
}

interface Erros {
  nome?: string;
  descricao?: string;
  preco?: string;
  imagem?: string;
  estoque?: string;
}

export default function CadastroProduto() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: '',
    preco: '',
    imagem: '',
    estoque: '',
  });
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const primeiroInputRef = useRef<HTMLInputElement>(null);

  const validarFormulario = (): boolean => {
    const novosErros: Erros = {};

    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    }

    if (!formData.descricao.trim()) {
      novosErros.descricao = 'Descrição é obrigatória';
    }

    if (!formData.preco) {
      novosErros.preco = 'Preço é obrigatório';
    } else {
      const preco = parseFloat(formData.preco);
      if (isNaN(preco) || preco < 0) {
        novosErros.preco = 'Preço deve ser um número válido e maior ou igual a 0';
      }
    }

    if (!formData.imagem.trim()) {
      novosErros.imagem = 'URL da imagem é obrigatória';
    }

    if (!formData.estoque) {
      novosErros.estoque = 'Estoque é obrigatório';
    } else {
      const estoque = parseInt(formData.estoque);
      if (isNaN(estoque) || estoque < 0) {
        novosErros.estoque = 'Estoque deve ser um número válido e maior ou igual a 0';
      }
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      primeiroInputRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setEnviando(true);

    try {
      const resposta = await fetch('http://localhost:3001/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          descricao: formData.descricao,
          preco: parseFloat(formData.preco),
          imagem: formData.imagem,
          estoque: parseInt(formData.estoque),
        }),
      });

      if (!resposta.ok) {
        throw new Error('Erro ao criar produto');
      }

      toast.success('Produto criado com sucesso!');
      setLocation('/');
    } catch (erro) {
      toast.error(erro instanceof Error ? erro.message : 'Erro ao criar produto');
    } finally {
      setEnviando(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (erros[name as keyof Erros]) {
      setErros((prev) => ({ ...prev, [name]: undefined }));
    }
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

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Cadastrar Novo Produto</h1>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium mb-2">
                  Nome do Produto *
                </label>
                <input
                  ref={primeiroInputRef}
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    erros.nome ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="Ex: Notebook Dell"
                />
                {erros.nome && (
                  <p className="text-sm text-destructive mt-1">{erros.nome}</p>
                )}
              </div>

              {/* Descrição */}
              <div>
                <label htmlFor="descricao" className="block text-sm font-medium mb-2">
                  Descrição *
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                    erros.descricao ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="Descreva o produto..."
                />
                {erros.descricao && (
                  <p className="text-sm text-destructive mt-1">{erros.descricao}</p>
                )}
              </div>

              {/* Preço */}
              <div>
                <label htmlFor="preco" className="block text-sm font-medium mb-2">
                  Preço (R$) *
                </label>
                <input
                  type="number"
                  id="preco"
                  name="preco"
                  value={formData.preco}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    erros.preco ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="0.00"
                />
                {erros.preco && (
                  <p className="text-sm text-destructive mt-1">{erros.preco}</p>
                )}
              </div>

              {/* URL da Imagem */}
              <div>
                <label htmlFor="imagem" className="block text-sm font-medium mb-2">
                  URL da Imagem *
                </label>
                <input
                  type="url"
                  id="imagem"
                  name="imagem"
                  value={formData.imagem}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    erros.imagem ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                {erros.imagem && (
                  <p className="text-sm text-destructive mt-1">{erros.imagem}</p>
                )}
              </div>

              {/* Estoque */}
              <div>
                <label htmlFor="estoque" className="block text-sm font-medium mb-2">
                  Estoque *
                </label>
                <input
                  type="number"
                  id="estoque"
                  name="estoque"
                  value={formData.estoque}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    erros.estoque ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="0"
                />
                {erros.estoque && (
                  <p className="text-sm text-destructive mt-1">{erros.estoque}</p>
                )}
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={enviando}
                  className="flex-1"
                >
                  {enviando ? 'Criando...' : 'Criar Produto'}
                </Button>
                <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => setLocation('/')}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
