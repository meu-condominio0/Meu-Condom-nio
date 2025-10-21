import { useEffect, useRef } from 'react';

type LogoProps = {
  onClick?: () => void;
  ariaLabel?: string;
};

const SHIMMER_STYLE_ID = 'logo-shimmer-styles';
const SHIMMER_STYLES = `
.logo-shimmer {
  position: relative;
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.logo-shimmer__overlay {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 16px;
  pointer-events: none;
}

.logo-shimmer__ray {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 70%;
  transform: translateX(-140%);
  opacity: 0;
  background: linear-gradient(110deg, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0.7) 48%, rgba(255, 255, 255, 0) 90%);
  filter: blur(1px);
}

.logo-shimmer__ray--active {
  animation: logo-quick-light-reveal 1.3s ease-in-out forwards;
}

@keyframes logo-quick-light-reveal {
  0% {
    opacity: 0;
    transform: translateX(-140%);
  }

  20% {
    opacity: 0.35;
  }

  45% {
    opacity: 0.55;
  }

  100% {
    opacity: 0;
    transform: translateX(140%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-shimmer__ray {
    animation: none !important;
    opacity: 0 !important;
  }
}
`;

function ensureShimmerStyles() {
  if (typeof document === 'undefined') {
    return;
  }

  if (document.getElementById(SHIMMER_STYLE_ID)) {
    return;
  }

  const styleElement = document.createElement('style');
  styleElement.id = SHIMMER_STYLE_ID;
  styleElement.textContent = SHIMMER_STYLES;
  document.head.appendChild(styleElement);
}

const ACTIVE_CLASS = 'logo-shimmer__ray--active';

export function LogoShimmer({ onClick, ariaLabel = 'MeuCondomínio' }: LogoProps = {}) {
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    ensureShimmerStyles();
  }, []);

  useEffect(() => {
    const shimmerNode = shimmerRef.current;
    if (!shimmerNode) {
      return undefined;
    }

    if (typeof window === 'undefined') {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      return undefined;
    }

    const trigger = () => {
      shimmerNode.classList.remove(ACTIVE_CLASS);
      void shimmerNode.offsetWidth;
      shimmerNode.classList.add(ACTIVE_CLASS);
    };

    trigger();
    const interval = window.setInterval(trigger, 6000);

    return () => {
      window.clearInterval(interval);
      shimmerNode.classList.remove(ACTIVE_CLASS);
    };
  }, []);

  const content = (
    <span className="logo-shimmer">
      <span className="relative z-10 text-[var(--text-title)]">
        Meu
        <span className="text-brand-900 dark:text-[var(--accent)]">Condomínio</span>
      </span>
      <span aria-hidden className="logo-shimmer__overlay">
        <span ref={shimmerRef} className="logo-shimmer__ray" />
      </span>
    </span>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className="group inline-flex items-center rounded-[16px] px-2 py-1 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
      >
        {content}
      </button>
    );
  }

  return content;
}

export default function Logo(props: LogoProps = {}) {
  return <LogoShimmer {...props} />;
}
