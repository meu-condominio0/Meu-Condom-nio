import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    icon,
    iconPosition = 'end',
    children,
    className,
    type = 'button',
    ...props
  }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2 rounded-xl border text-base font-medium transition-transform duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed';

    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-[#0F3D2E] text-white border-transparent shadow-sm hover:-translate-y-0.5 hover:shadow-lg focus-visible:shadow-none',
      secondary:
        'bg-white text-[#0F3D2E] border-[#E5E7EB] shadow-sm hover:-translate-y-0.5 hover:shadow-lg focus-visible:shadow-none',
    };

    const paddingClasses = 'px-6 h-12';

    const renderIcon = () => {
      if (!icon) {
        return null;
      }

      const spacingClass = iconPosition === 'end' ? 'ml-1 -mr-1' : '-ml-1 mr-1';

      return (
        <span className={clsx('text-lg', spacingClass)} aria-hidden="true">
          {icon}
        </span>
      );
    };

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(baseClasses, variantClasses[variant], paddingClasses, className)}
        {...props}
      >
        {iconPosition === 'start' && renderIcon()}
        <span>{children}</span>
        {iconPosition === 'end' && renderIcon()}
      </button>
    );
  },
);

Button.displayName = 'Button';
