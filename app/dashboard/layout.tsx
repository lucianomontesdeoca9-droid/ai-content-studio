'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/login');
        return;
      }
      setAuthorized(true);
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700">
        <p className="rounded-3xl border border-slate-200 bg-white/95 px-6 py-4 shadow-sm">
          Verificando sesión...
        </p>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <div className="min-h-screen bg-slate-50 py-10">{children}</div>;
}
