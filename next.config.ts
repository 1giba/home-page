import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './i18n/locales/pt-BR.json'
  }
});

const config: NextConfig = {};

export default withNextIntl(config);
