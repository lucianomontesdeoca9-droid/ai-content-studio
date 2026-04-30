import { Sidebar } from '../components/Sidebar';

export default function Home() {
  return (
    <section className="min-h-screen py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm">
            <Sidebar />
          </aside>

          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-10 text-white shadow-2xl shadow-slate-900/10 sm:p-12">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-slate-700/80 px-3 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-slate-200">
                Launch-ready layout
              </span>
              <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
                Build a modern landing page with Next.js and Tailwind.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                A clean homepage layout with a fixed navigation bar, sidebar navigation, and a polished hero section designed for fast iteration.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/10 transition hover:bg-slate-100"
                >
                  Iniciar sesión
                </a>
                <a
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Regístrate
                </a>
              </div>
            </div>
          </div>
        </div>

        <section id="features" className="grid gap-6 rounded-3xl bg-white/95 p-8 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Fast setup',
              description: 'Tailwind styling and Next.js app router ready to use.',
            },
            {
              title: 'Responsive layout',
              description: 'Navbar, sidebar, and landing page optimized for mobile and desktop.',
            },
            {
              title: 'Modern UI',
              description: 'Clean design with subtle gradients, rounded cards, and easy theming.',
            },
          ].map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-slate-200 p-6 transition hover:border-slate-300/80 hover:shadow-lg hover:shadow-slate-200/50">
              <h2 className="text-xl font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </section>

        <section id="contact" className="rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Ready to get started?</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Use this starter page as a clean foundation for your next web app, then extend it with your own content and components.
          </p>
        </section>
      </div>
    </section>
  );
}
