import { useState, useEffect } from 'react';

interface UseFetchState<T> {
  dados: T | null;
  carregando: boolean;
  erro: string | null;
}

export function useFetch<T>(url: string): UseFetchState<T> {
  const [estado, setEstado] = useState<UseFetchState<T>>({
    dados: null,
    carregando: true,
    erro: null,
  });

  useEffect(() => {
    let isMontado = true;

    const buscarDados = async () => {
      try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
          throw new Error(`Erro na requisição: ${resposta.status}`);
        }
        const dados = await resposta.json();
        if (isMontado) {
          setEstado({ dados, carregando: false, erro: null });
        }
      } catch (erro) {
        if (isMontado) {
          setEstado({
            dados: null,
            carregando: false,
            erro: erro instanceof Error ? erro.message : 'Erro desconhecido',
          });
        }
      }
    };

    buscarDados();

    return () => {
      isMontado = false;
    };
  }, [url]);

  return estado;
}
