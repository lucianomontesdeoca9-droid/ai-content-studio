export function Sidebar() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Navigation</p>
        <ul className="mt-5 space-y-3 text-sm text-slate-600">
          <li className="rounded-2xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100">
            Dashboard overview
          </li>
          <li className="rounded-2xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100">
            Project setup
          </li>
          <li className="rounded-2xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100">
            Style guide
          </li>
          <li className="rounded-2xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100">
            Resources
          </li>
        </ul>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-900">Workspace essentials</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Start with this layout and add your own sections for products, team, or documentation.
        </p>
      </div>
    </div>
  );
}
