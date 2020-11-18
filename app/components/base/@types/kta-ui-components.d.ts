declare module '*.ico';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.eot';
declare module '*.ttf';
declare module '*.otf';
declare module '*.woff';
declare module '*.woff2';

declare module 'kta-ui-components' {
  // No operation
  export type Noop = (...args: any[]) => any;

  /**
   * Remove null or undefined from properties of a type
   * @see https://stackoverflow.com/a/53050575
   */
  export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

  /**
   * Declare TypeScript Static Method From React Functional Component
   * @see https://stackoverflow.com/a/59526833
   */
  export interface ComponentWithStaticMethod<TProps> extends React.FC<TProps> {
    storyName?: string;
    argTypes?: { [key in keyof TProps]: any };
  }
}
