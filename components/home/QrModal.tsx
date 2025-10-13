import { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { homeMessages, LocaleKey } from './messages';

interface QrModalProps {
  open: boolean;
  onClose: () => void;
  locale?: LocaleKey;
}

export function QrModal({ open, onClose, locale = 'pt' }: QrModalProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (open) {
      window.addEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <Fragment>
      <div
        role="presentation"
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <div className="w-full max-w-sm rounded-3xl bg-card p-6 text-neutral-900 shadow-2xl">
          <header className="space-y-1">
            <h2 id="qr-modal-title" className="text-lg font-semibold">
              {homeMessages.qr[locale]}
            </h2>
            <p className="text-sm text-neutral-900/70">
              Apresente este código na portaria para liberar o visitante.
            </p>
          </header>
          <div className="mt-6 flex items-center justify-center rounded-2xl bg-brand/10 p-6">
            <div className="aspect-square w-40 rounded-2xl border-4 border-dashed border-brand" aria-hidden>
              <div className="flex h-full items-center justify-center text-brand">
                ###
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              className="w-full rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors duration-250 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2"
            >
              {homeMessages.qr.sendNotification[locale]}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand transition-colors duration-250 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </Fragment>,
    document.body,
  );
}
