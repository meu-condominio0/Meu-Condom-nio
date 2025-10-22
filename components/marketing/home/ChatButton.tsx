import { MessageCircle } from 'lucide-react';

export function ChatButton() {
  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 inline-flex items-center justify-center rounded-full bg-emerald-500 p-4 text-white shadow-xl transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      aria-label="Abrir chat de suporte"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </button>
  );
}
