'use client';

import type { User } from '@supabase/supabase-js';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { ToolCard } from '../../components/ToolCard';
import { ToastContainer, type ToastMessage } from '../../components/Toast';

type HistoryItem = {
  id: string;
  tool: string;
  input: string;
  output: string;
  favorite: boolean;
  createdAt: number;
};

const HISTORY_STORAGE_KEY = 'aiToolHistory';

const tools = [
  {
    name: 'README Generator',
    description: 'Genera documentación clara y profesional para tu proyecto en segundos.',
    icon: '📘',
    placeholder: 'Describe tu proyecto, características y público objetivo...',
  },
  {
    name: 'CV Assistant',
    description: 'Crea un currículum adaptado a tu experiencia y al estilo profesional moderno.',
    icon: '🧾',
    placeholder: 'Escribe tu experiencia laboral, habilidades y logros...',
  },
  {
    name: 'LinkedIn Post Generator',
    description: 'Escribe publicaciones efectivas para LinkedIn y mejora tu presencia profesional.',
    icon: '💼',
    placeholder: 'Describe el tema, industria y tipo de público para tu post...',
  },
  {
    name: 'Text Summarizer',
    description: 'Resume textos largos y obtén versiones claras y fáciles de compartir.',
    icon: '✂️',
    placeholder: 'Pega aquí el texto que quieres resumir...',
  },
];

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const router = useRouter();

  const favoriteItems = useMemo(() => history.filter((item) => item.favorite), [history]);

  useEffect(() => {
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.replace('/login');
    } else {
      setUser(session.user);
      setLoading(false);
    }
  };

  checkSession();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    if (!session) {
      router.replace('/login');
    } else {
      setUser(session.user);
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}, [router]);


  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(HISTORY_STORAGE_KEY) : null;
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const persistHistory = (nextHistory: HistoryItem[]) => {
    setHistory(nextHistory);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));
  };

  const addToast = (text: string, type: ToastMessage['type'] = 'info') => {
    const id = createId();
    setToasts((prev) => [{ id, text, type }, ...prev]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const handleAddHistory = (toolResult: Omit<HistoryItem, 'id' | 'favorite' | 'createdAt'>) => {
    const nextItem: HistoryItem = {
      id: createId(),
      tool: toolResult.tool,
      input: toolResult.input,
      output: toolResult.output,
      favorite: false,
      createdAt: Date.now(),
    };
    persistHistory([nextItem, ...history].slice(0, 30));
    addToast('Resultado guardado en el historial.', 'success');
  };

  const toggleFavorite = (id: string) => {
    const nextHistory = history.map((item) =>
      item.id === id ? { ...item, favorite: !item.favorite } : item,
    );
    persistHistory(nextHistory);
    const item = nextHistory.find((item) => item.id === id);
    addToast(item?.favorite ? 'Agregado a favoritos.' : 'Removido de favoritos.', 'info');
  };

  const clearHistory = () => {
    persistHistory([]);
    addToast('Historial borrado.', 'info');
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/login');
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700">
        <p className="rounded-3xl border border-slate-200 bg-white/95 px-6 py-4 shadow-sm">
          Cargando dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-10 text-white shadow-2xl shadow-slate-900/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Herramientas inteligentes</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Bienvenido, {user?.email}
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300/90">
                Accede a tu suite de productividad: genera README, crea CVs, escribe posts para LinkedIn y resume textos con un solo panel.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {error ? (
          <p className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>
        ) : null}

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.name}
                  {...tool}
                  onResult={(result) => handleAddHistory(result)}
                  onToast={addToast}
                />
              ))}
            </div>

            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Historial de generación</h2>
                  <p className="mt-2 text-sm text-slate-600">Guarda y revisa tus últimos resultados rápidamente.</p>
                </div>
                <button
                  type="button"
                  onClick={clearHistory}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Borrar historial
                </button>
              </div>

              {history.length === 0 ? (
                <div className="mt-8 rounded-3xl bg-slate-50 p-6 text-sm text-slate-600">
                  No hay entradas todavía. Genera tu primer resultado para que aparezca aquí.
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {history.slice(0, 5).map((item) => (
                    <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.tool}</p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">{new Date(item.createdAt).toLocaleString()}</p>
                          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{item.input}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(item.id)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            item.favorite ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {item.favorite ? 'Favorito' : 'Marcar favorito'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Favoritos</h2>
              <p className="mt-2 text-sm text-slate-600">Tus resultados preferidos para reutilizar rápidamente.</p>

              {favoriteItems.length === 0 ? (
                <p className="mt-6 rounded-3xl bg-slate-50 p-6 text-sm text-slate-600">
                  Marca como favorito cualquier entrada de tu historial.
                </p>
              ) : (
                <div className="mt-6 space-y-4">
                  {favoriteItems.slice(0, 5).map((item) => (
                    <div key={item.id} className="rounded-3xl bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.tool}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(item.id)}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Consejos rápidos</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>Usa prompts claros para obtener mejores resultados.</li>
                <li>Marca lo mejor como favorito para reutilizarlo.</li>
                <li>El historial se guarda localmente en tu navegador.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
