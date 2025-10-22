declare namespace React {

  interface CSSProperties {
    [key: string]: string | number;
  }
  type ReactNode = any;
  type Key = string | number;
  interface RefObject<T> {
    readonly current: T | null;
  }
  interface ComponentProps<T = any> {
    className?: string;
    children?: ReactNode;
    [key: string]: any;
  }
  interface Attributes {
    key?: Key;
  }
  interface DOMAttributes<T> {
    [key: string]: any;
  }
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    className?: string;
    [key: string]: any;
  }
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    [key: string]: any;
  }
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: string;
    fetchPriority?: 'high' | 'low' | 'auto';
    [key: string]: any;
  }
  interface SVGAttributes<T> extends HTMLAttributes<T> {
    [key: string]: any;
  }
  type SVGProps<T> = SVGAttributes<T>;
  interface DetailedHTMLProps<P, T> extends P {}
  type ComponentPropsWithoutRef<T> = ComponentProps<T>;
  type ElementRef<T> = any;
  interface KeyboardEvent<T = any> { [key: string]: any }
  interface MouseEvent<T = any> { [key: string]: any }
  interface FormEvent<T = any> { [key: string]: any }
  interface ChangeEvent<T = any> extends FormEvent<T> {}
  class Component<P = {}, S = {}, SS = any> {
    constructor(props: P, context?: any);
    props: Readonly<P> & { children?: ReactNode };
    state: Readonly<S>;
    context: any;
    refs: any;
    setState(
      state:
        | Partial<S>
        | ((prevState: Readonly<S>, props: Readonly<P>) => Partial<S> | S | null),
      callback?: () => void,
    ): void;
    forceUpdate(callback?: () => void): void;
  }
  type ComponentType<P = {}> = (props: P) => any | (new (...args: any[]) => Component<P>);
  interface MutableRefObject<T> { current: T }
  type SetStateAction<S> = S | ((prevState: S) => S);
  type Dispatch<A> = (value: A) => void;
  interface FC<P = {}> {
    (props: P & { children?: ReactNode }): any;
  }
  type LazyExoticComponent<T extends ComponentType<any>> = T;
  function memo<T extends ComponentType<any>>(component: T, propsAreEqual?: (prevProps: any, nextProps: any) => boolean): T;
  function lazy<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>): LazyExoticComponent<T>;
  function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  function useEffect(effect: (...args: any[]) => any, deps?: any[]): void;
  function useReducer<R extends (state: any, action: any) => any, I>(reducer: R, init: I, initializer?: any): [I, Dispatch<any>];
  function useContext<T = any>(context: any): T;
  function createContext<T>(defaultValue: T): any;
  function useRef<T>(initialValue: T): MutableRefObject<T>;
  function useMemo<T>(factory: () => T, deps: any[]): T;
  function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  function useId(): string;
  function forwardRef<T, P = {}>(render: (props: P, ref: any) => ReactNode): any;

  const StrictMode: any;
  const Fragment: any;
  const Suspense: any;
}

declare module 'react' {
  export = React;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface ElementClass {
    props: any;
  }
  interface ElementAttributesProperty {
    props: any;
  }
}
