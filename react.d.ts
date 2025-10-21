declare namespace React {

  interface CSSProperties {
    [key: string]: string | number;
  }
  type ReactNode = any;
  interface ComponentProps<T = any> {
    className?: string;
    children?: ReactNode;
    [key: string]: any;
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
    [key: string]: any;
  }
  type ComponentPropsWithoutRef<T> = ComponentProps<T>;
  type ElementRef<T> = any;
  interface KeyboardEvent<T = any> { [key: string]: any }
  interface FormEvent<T = any> { [key: string]: any }
  interface ChangeEvent<T = any> extends FormEvent<T> {}
  type ComponentType<P = {}> = (props: P) => any;
  interface MutableRefObject<T> { current: T }
  type SetStateAction<S> = S | ((prevState: S) => S);
  type Dispatch<A> = (value: A) => void;
  interface FC<P = {}> {
    (props: P & { children?: ReactNode }): any;
  }
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
}

declare module 'react' {
  export = React;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
