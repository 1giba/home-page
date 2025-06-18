import {describe, it, expect} from 'vitest';
import getRequestConfig from './request';
import {routing} from './routing';

// Helper to load default messages
async function loadDefaultMessages() {
  return (await import(`./locales/${routing.defaultLocale}.json`)).default;
}

describe('getRequestConfig', () => {
  it('returns default locale config when locale is unsupported', async () => {
    const config = await getRequestConfig({locale: 'fr-FR'} as any);
    expect(config.locale).toBe(routing.defaultLocale);
    const defaultMessages = await loadDefaultMessages();
    expect(config.messages).toEqual(defaultMessages);
  });
});
