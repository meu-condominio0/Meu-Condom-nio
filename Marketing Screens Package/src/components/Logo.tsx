import { useEffect, useRef } from 'react';

type LogoProps = {
  onClick?: () => void;
  ariaLabel?: string;
};

export default function Logo({ onClick, ariaLabel = 'MeuCondomínio' }: LogoProps = {}) {
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = shimmerRef.current;
    if (!node) {
      return undefined;
    }

    const play = () => {
      node.classList.remove('animate-shimmer');
      void node.offsetWidth;
      node.classList.add('animate-shimmer');
    };

    play();
    const interval = window.setInterval(play, 6000);
    return () => window.clearInterval(interval);
  }, []);

  const content = (
    <div className="relative inline-block">
      <span className="relative z-10 font-semibold tracking-tight text-[var(--text-title)]">
        Meu<span className="text-brand-900 dark:text-[var(--accent)]">Condomínio</span>
      </span>
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-md">
        <span ref={shimmerRef} className="shimmer block h-full w-[28%] -translate-x-[130%]" />
      </span>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className="group inline-flex items-center rounded-xl px-2 py-1 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
      >
        {content}
      </button>
    );
  }

  return content;
}
