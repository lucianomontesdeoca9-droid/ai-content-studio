'use client';

import { useMemo, useState } from 'react';

const projects = [
  { title: 'AI Content Studio', category: 'AI', stack: ['Next.js', 'OpenAI', 'Supabase'], status: 'Live', score: 98 },
  { title: 'Crypto Dashboard', category: 'Data', stack: ['JavaScript', 'REST API', 'CSS'], status: 'Live', score: 94 },
  { title: 'Weather Pro', category: 'API', stack: ['HTML', 'CSS', 'JavaScript'], status: 'Live', score: 91 },
  { title: 'Snake Game', category: 'Games', stack: ['JavaScript', 'Canvas', 'CSS'], status: 'Completed', score: 88 },
  { title: 'SocialHub', category: 'Full Stack', stack: ['React', 'Node.js', 'SQL'], status: 'Beta', score: 96 },
  { title: 'Portfolio CMS', category: 'Full Stack', stack: ['Next.js', 'PostgreSQL', 'Tailwind'], status: 'Building', score: 93 },
];

const stats = [['12', 'Projects'], ['8', 'Technologies'], ['99.9%', 'Uptime'], ['24/7', 'Automation']];

export default function Home() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);
  const visibleProjects = useMemo(() => projects.filter((project) => {
    const matchesFilter = filter === 'All' || project.category === filter;
    const text = `${project.title} ${project.stack.join(' ')}`.toLowerCase();
    return matchesFilter && text.includes(query.toLowerCase());
  }), [filter, query]);
  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];

  return (
    <main className={dark ? 'min-h-screen bg-slate-950 text-white' : 'min-h-screen bg-slate-50 text-slate-950'}>
      <nav className={dark ? 'sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur' : 'sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur'}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#home" className="text-xl font-black tracking-tight"><span className="text-cyan-500">&lt;/&gt;</span> DevForge</a>
          <div className="hidden gap-7 text-sm font-semibold md:flex"><a href="#home" className="hover:text-cyan-500">Home</a><a href="#projects" className="hover:text-cyan-500">Projects</a><a href="#stack" className="hover:text-cyan-500">Stack</a><a href="#contact" className="hover:text-cyan-500">Contact</a></div>
          <button onClick={() => setDark(!dark)} className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold transition hover:border-cyan-400 hover:text-cyan-500">{dark ? '☀ Light' : '◐ Dark'}</button>
        </div>
      </nav>

      <section id="home" className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-16 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
        <div><span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-500">Full-stack playground</span><h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl">Code ideas.<br /><span className="text-cyan-500">Ship products.</span></h1><p className={dark ? 'mt-6 max-w-2xl text-lg leading-8 text-slate-300' : 'mt-6 max-w-2xl text-lg leading-8 text-slate-600'}>A portfolio-grade web application built around modern frontend, backend, database and automation concepts. HTML, CSS, JavaScript, SQL, APIs, authentication and AI in one project.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#projects" className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-400">Explore projects →</a><a href="#stack" className={dark ? 'rounded-xl border border-white/15 px-6 py-3 font-bold transition hover:bg-white/5' : 'rounded-xl border border-slate-300 px-6 py-3 font-bold transition hover:bg-white'}>View tech stack</a></div></div>
        <div className={dark ? 'rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl' : 'rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200'}><div className="rounded-3xl bg-slate-950 p-6 text-white"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-widest text-slate-400">System status</span><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">● Online</span></div><div className="mt-8 grid grid-cols-2 gap-3">{stats.map(([value, label]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="text-2xl font-black">{value}</div><div className="mt-1 text-xs text-slate-400">{label}</div></div>)}</div><div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4"><div className="text-xs text-cyan-300">Latest deployment</div><div className="mt-1 font-bold">Production build passed ✓</div></div></div></div>
      </section>

      <section id="projects" className={dark ? 'border-y border-white/10 bg-white/[.03] py-16' : 'border-y border-slate-200 bg-white py-16'}><div className="mx-auto max-w-7xl px-5"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-widest text-cyan-500">Portfolio database</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Selected projects</h2></div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-cyan-400 md:w-64" /></div><div className="mt-7 flex flex-wrap gap-2">{categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={filter === category ? 'rounded-full bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950' : 'rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:border-cyan-400 hover:text-cyan-500'}>{category}</button>)}</div><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visibleProjects.map((project) => <article key={project.title} className={dark ? 'group rounded-3xl border border-white/10 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40' : 'group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-xl'}><div className="flex items-start justify-between"><span className="rounded-lg bg-cyan-400/10 px-2.5 py-1 text-xs font-bold text-cyan-500">{project.category}</span><span className="text-sm font-bold">{project.score}%</span></div><h3 className="mt-7 text-xl font-black">{project.title}</h3><p className="mt-2 text-sm opacity-60">Production-ready project with reusable architecture and responsive UI.</p><div className="mt-6 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="rounded-md border border-slate-300/50 px-2 py-1 text-xs">{tech}</span>)}</div><div className="mt-6 flex items-center justify-between border-t border-slate-300/20 pt-4 text-xs"><span>{project.status}</span><button className="font-bold text-cyan-500 transition group-hover:translate-x-1">Open →</button></div></article>)}</div>{!visibleProjects.length && <p className="py-12 text-center opacity-60">No projects found.</p>}</div></section>

      <section id="stack" className="mx-auto max-w-7xl px-5 py-16"><p className="text-sm font-bold uppercase tracking-widest text-cyan-500">Technology</p><h2 className="mt-2 text-3xl font-black">Built to demonstrate real-world skills</h2><div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">{['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'SQL'].map((tech) => <div key={tech} className={dark ? 'rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm font-bold' : 'rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm font-bold shadow-sm'}>{tech}</div>)}</div></section>
      <section id="contact" className="mx-5 mb-12 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white sm:px-12"><div className="mx-auto max-w-5xl text-center"><p className="text-sm font-bold uppercase tracking-widest text-cyan-400">Contact</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">Turn your next idea into a real product.</h2><p className="mx-auto mt-5 max-w-2xl text-slate-400">Ready to evolve into an authenticated SaaS with PostgreSQL/Supabase, REST APIs, analytics and AI features.</p><a href="mailto:hello@example.com" className="mt-8 inline-flex rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-400">Start a project</a></div></section>
      <footer className={dark ? 'border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500' : 'border-t border-slate-200 px-5 py-8 text-center text-sm text-slate-500'}>DevForge · Full-stack web project · Built with Next.js, TypeScript, Tailwind CSS & SQL</footer>
    </main>
  );
}
