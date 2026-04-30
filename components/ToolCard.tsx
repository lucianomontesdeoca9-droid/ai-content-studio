'use client';

import { useState } from 'react';
type ToolCardResult = {
  tool: string;
  input: string;
  output: string;
};

type ToolCardProps = {
  name: string;
  description: string;
  icon: string;
  placeholder: string;
  onResult?: (result: ToolCardResult) => void;
  onToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
};

export function ToolCard({ name, description, icon, placeholder, onResult, onToast }: ToolCardProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Ingresa texto o contexto para generar el resultado.');
      onToast?.('Completa el campo antes de generar.', 'error');
      return;
    }

    setLoading(true);
    setError(null);
    setOutput('');

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: name, input }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error ?? 'Error al comunicarse con el servidor.';
        setError(errorMessage);
        onToast?.(errorMessage, 'error');
      } else {
        setOutput(data.output);
        onResult?.({ tool: name, input, output: data.output });
        onToast?.('Resultado generado con éxito.', 'success');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error de red inesperado.';
      setError(message);
      onToast?.(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-2xl text-white">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          className="h-28 w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        />

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? 'Generando...' : 'Generar'}
        </button>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {output ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Resultado</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  onToast?.('Copiado al portapapeles.', 'info');
                }}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Copiar
              </button>
            </div>
            <pre className="whitespace-pre-wrap break-words">{output}</pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}
