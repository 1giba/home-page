/**
 * Global type declarations to ensure TypeScript can find all required modules
 */

// Fix the 'Cannot find module React' error
declare module 'react' {
  export * from 'react';
}

// Fix the 'Cannot find module next/navigation' error
declare module 'next/navigation' {
  export function notFound(): never;
  export function redirect(url: string): never;
}

// Fix the 'Cannot find module next' error
declare module 'next' {
  export type Metadata = Record<string, any>;
}

// Fix the 'Cannot find module next/server' error
declare module 'next/server' {
  interface Cookies {
    get(name: string): { name: string; value: string } | undefined;
    getAll(): Array<{ name: string; value: string }>;
    has(name: string): boolean;
  }
  
  export interface NextRequest extends Request {
    nextUrl: URL;
    cookies: Cookies;
  }
  
  export class NextResponse extends Response {
    static redirect(url: string | URL, init?: ResponseInit): NextResponse;
    static json(body: any, init?: ResponseInit): NextResponse;
  }
}

// Define module imports with @ path alias
declare module '@/i18n/routing' {
  export const routing: {
    locales: string[];
    defaultLocale: string;
  };

  export type Locale = (typeof routing.locales)[number];
}

// Fix next-intl module imports
declare module 'next-intl' {
  import { ComponentType, ReactNode } from 'react';
  export function useTranslations(namespace?: string): (key: string, options?: any) => string;
  export function useLocale(): string;
  export const Link: ComponentType<any>;
}

declare module 'next-intl/server' {
  export function getTranslations(namespace?: string): Promise<(key: string, options?: any) => string>;
  export function getLocale(): string;
}

// Fix next/image module imports
declare module 'next/image' {
  import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
  
  interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    quality?: number;
    priority?: boolean;
    placeholder?: 'blur' | 'empty';
    style?: React.CSSProperties;
    onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number }) => void;
    onLoad?: () => void;
    onError?: () => void;
    loading?: 'lazy' | 'eager';
    blurDataURL?: string;
  }
  
  const Image: React.FC<ImageProps>;
  export default Image;
}

// Fix react-icons module imports
declare module 'react-icons/fi' {
  import { IconType } from 'react-icons';
  export const FiArrowDown: IconType;
  export const FiCode: IconType;
  export const FiDatabase: IconType;
  export const FiServer: IconType;
  export const FiSmartphone: IconType;
  export const FiGithub: IconType;
  export const FiLinkedin: IconType;
}

declare module 'react-icons' {
  export interface IconType extends React.FC<React.SVGProps<SVGSVGElement>> {
    title?: string;
    size?: string | number;
    color?: string;
    className?: string;
  }
}

// Add JSX namespace for intrinsic HTML elements
declare namespace JSX {
  interface IntrinsicElements {
    img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
    h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h5: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h6: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
    li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
    button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    header: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    footer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    html: React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
    body: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
    main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    header: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    article: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h5: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h6: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
    a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
    span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
    ol: React.DetailedHTMLProps<React.HTMLAttributes<HTMLOListElement>, HTMLOListElement>;
    li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
    button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
  }
}

// Define module declaration for JSON imports
declare module '*.json' {
  const value: any;
  export default value;
}
