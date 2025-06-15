declare module 'next-intl' {
  export function useTranslations(namespace?: string): (key: string, values?: Record<string, any>) => string;
  export function useLocale(): string;
  export function NextIntlClientProvider(props: {
    locale: string;
    messages: Record<string, any>;
    children: React.ReactNode;
  }): JSX.Element;
}

declare module 'next-intl/server' {
  export function getTranslations(namespace?: string): (key: string, values?: Record<string, any>) => string;
  export function getLocale(): string;
  export function getRequestConfig(options: { locale: string }): Promise<{ messages: Record<string, any> }>;
}

declare module 'next-intl/middleware' {
  interface MiddlewareConfig {
    locales: string[];
    defaultLocale: string;
    localePrefix?: 'as-needed' | 'always' | 'never';
  }
  
  export default function createMiddleware(config: MiddlewareConfig): any;
}
