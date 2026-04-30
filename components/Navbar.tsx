import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm shadow-slate-900/10">
            W
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Web App</p>
            <p className="text-xs text-slate-500">Next.js starter</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/" className="transition hover:text-slate-900">
            Inicio
          </Link>
          <Link href="/login" className="transition hover:text-slate-900">
            Iniciar sesión
          </Link>
          <Link href="/register" className="transition hover:text-slate-900">
            Registrarse
          </Link>
          <Link href="/dashboard" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-700 transition hover:bg-slate-100">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
