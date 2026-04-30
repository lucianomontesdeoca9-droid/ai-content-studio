'use client';

type ToastType = 'success' | 'error' | 'info';

type ToastMessage = {
  id: string;
  type: ToastType;
  text: string;
};

type ToastContainerProps = {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
};

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex flex-col items-end gap-3 px-4 sm:right-6 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto w-full max-w-sm rounded-3xl border p-4 shadow-xl transition transform duration-300 ${
            toast.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : toast.type === 'error'
              ? 'border-rose-200 bg-rose-50 text-rose-900'
              : 'border-slate-200 bg-white text-slate-900'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm leading-6">{toast.text}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export type { ToastMessage, ToastType };
