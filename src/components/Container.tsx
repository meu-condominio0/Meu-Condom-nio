import type { HTMLAttributes } from 'react';

import { cn } from '../../components/ui/utils';

type ContainerProps = HTMLAttributes<HTMLDivElement>;

/**
 * Container responsável por aplicar limites de largura e espaçamento horizontal
 * consistentes em todas as páginas.
 */
export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        'max-w-[min(100vw-2rem,64rem)] sm:max-w-[min(100vw-4rem,72rem)]',
        'lg:max-w-[min(100vw-6rem,80rem)] xl:max-w-[min(100vw-8rem,96rem)] 2xl:max-w-[min(100vw-10rem,112rem)]',
        className,
      )}
      {...props}
    />
  );
}
