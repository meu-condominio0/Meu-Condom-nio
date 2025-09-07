declare namespace React {
  interface ComponentProps<T = any> {
    className?: string;
    [key: string]: any;
  }
  type ReactNode = any;
  interface FC<P = {}> {
    (props: P & { children?: ReactNode }): any;
  }
  interface MutableRefObject<T> { current: T }
  type Dispatch<A> = (value: A) => void;
  function useState<S>(initialState: S | (() => S)): [S, Dispatch<S>];
  function useEffect(effect: (...args: any[]) => any, deps?: any[]): void;
  function useReducer<R extends (state: any, action: any) => any, I>(reducer: R, init: I, initializer?: any): [I, Dispatch<any>];
  function useContext<T>(context: any): T;
  function createContext<T>(defaultValue: T): any;
  function useRef<T>(initialValue: T): MutableRefObject<T>;
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
