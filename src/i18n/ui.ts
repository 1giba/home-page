import { LANG_TAG, type Locale } from './locales'

// UI strings, flat-keyed. pt-BR is the reference: `UiKey` is derived from it, and the English
// dictionary is typed `Record<UiKey, string>`, so a missing or extra key is a type error.
// Add keys in pairs, only when a component uses them.

const ptBR = {
  skip: 'Pular para o conteúdo',
  'lang.label': 'Idioma',
  'cta.book': 'Agendar uma conversa',
  'a11y.external': '(site externo)',
  'nav.label': 'Principal',
  'nav.menu': 'Menu',
  'nav.services': 'Serviços',
  'nav.work': 'Projetos',
  'nav.about': 'Sobre',
  'nav.contact': 'Contato',
  'footer.tagline': 'Liderança sênior de tecnologia, sem contratar um CTO em tempo integral.',
  'footer.nav': 'Rodapé',
  'footer.social': 'Perfis',
  'footer.privacy': 'Política de Privacidade',
  'footer.terms': 'Termos de Uso',
  'footer.rights': 'Todos os direitos reservados.',
  'page.home': 'Code Happy',
  'page.services': 'Serviços',
  'service.fractional-cto': 'CTO fracionado e liderança de tecnologia',
  'service.ai': 'Estratégia e engenharia de IA',
  'service.advisory': 'Consultoria em tecnologia',
  'page.about': 'Sobre',
  'page.contact': 'Contato',
  'page.thanks': 'Mensagem enviada',
  'page.privacy': 'Política de Privacidade',
  'page.terms': 'Termos de Uso',
  'notFound.title': 'Página não encontrada',
  'notFound.body': 'O endereço pode ter mudado ou não existir.',
  'notFound.home': 'Ir para a página inicial',
  // <title> (pages get " | Code Happy" appended; home is complete) and meta description.
  'meta.home.title': 'Code Happy — CTO fracionado e engenharia de IA',
  'meta.home.description':
    'Liderança sênior de tecnologia sem contratar um CTO em tempo integral: decisões técnicas sólidas, IA aplicada onde compensa e entregas sob controle.',
  'meta.services.title': 'Serviços',
  'meta.services.description':
    'Três formas de trabalhar com a Code Happy: CTO fracionado, estratégia e engenharia de IA, e consultoria em tecnologia. Veja qual se encaixa no seu momento.',
  'meta.service.fractional-cto.title': 'CTO fracionado',
  'meta.service.fractional-cto.description':
    'Liderança técnica sênior em tempo parcial para empresas sem CTO: roadmap, decisões de arquitetura, gestão de fornecedores e contratação de engenheiros.',
  'meta.service.ai.title': 'Estratégia e engenharia de IA',
  'meta.service.ai.description':
    'Descubra onde a IA compensa no seu produto ou operação e leve esses casos de uso à produção com custo, qualidade e riscos sob controle.',
  'meta.service.advisory.title': 'Consultoria em tecnologia',
  'meta.service.advisory.description':
    'Avaliações técnicas independentes e com escopo definido: revisão de arquitetura, due diligence e diagnóstico de código, com recomendações priorizadas.',
  'meta.about.title': 'Sobre',
  'meta.about.description':
    'Conheça a Code Happy, consultoria brasileira de tecnologia. Seu fundador desenvolve software profissionalmente desde 2004 e lidera pessoalmente os projetos.',
  'meta.contact.title': 'Contato',
  'meta.contact.description':
    'Agende uma conversa inicial ou envie uma mensagem para a Code Happy. Conte qual é o desafio técnico e o que seria um bom resultado para você.',
  'meta.thanks.title': 'Mensagem enviada',
  'meta.thanks.description': 'Recebemos sua mensagem. A Code Happy responde em até 48 horas.',
  'meta.privacy.title': 'Política de Privacidade',
  'meta.privacy.description':
    'Como a Code Happy Tecnologia Ltda. trata os dados pessoais enviados por este site, incluindo o formulário de contato e o agendamento de conversas.',
  'meta.terms.title': 'Termos de Uso',
  'meta.terms.description':
    'Termos de uso do site e dos serviços da Code Happy Tecnologia Ltda., incluindo responsabilidades, propriedade intelectual e condições de pagamento.',
} as const

export type UiKey = keyof typeof ptBR

const en: Record<UiKey, string> = {
  skip: 'Skip to content',
  'lang.label': 'Language',
  'cta.book': 'Book an intro call',
  'a11y.external': '(external site)',
  'nav.label': 'Main',
  'nav.menu': 'Menu',
  'nav.services': 'Services',
  'nav.work': 'Work',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'footer.tagline': 'Senior technology leadership, without hiring a full-time CTO.',
  'footer.nav': 'Footer',
  'footer.social': 'Profiles',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Use',
  'footer.rights': 'All rights reserved.',
  'page.home': 'Code Happy',
  'page.services': 'Services',
  'service.fractional-cto': 'Fractional CTO & Technology Leadership',
  'service.ai': 'AI Strategy & Engineering',
  'service.advisory': 'Technology Advisory',
  'page.about': 'About',
  'page.contact': 'Contact',
  'page.thanks': 'Message sent',
  'page.privacy': 'Privacy Policy',
  'page.terms': 'Terms of Use',
  'notFound.title': 'Page not found',
  'notFound.body': 'The address may have changed or may never have existed.',
  'notFound.home': 'Go to the home page',
  'meta.home.title': 'Code Happy — Fractional CTO and AI Engineering',
  'meta.home.description':
    'Senior technology leadership without hiring a full-time CTO: sound technical decisions, AI applied where it pays off, and delivery back under control.',
  'meta.services.title': 'Services',
  'meta.services.description':
    'Three ways to work with Code Happy: fractional CTO, AI strategy and engineering, and technology advisory. See which one fits where your company is now.',
  'meta.service.fractional-cto.title': 'Fractional CTO',
  'meta.service.fractional-cto.description':
    'Part-time senior technology leadership for companies without a CTO: roadmap, architecture decisions, vendor oversight and engineering hiring.',
  'meta.service.ai.title': 'AI Strategy & Engineering',
  'meta.service.ai.description':
    'Find where AI pays off in your product or operations, then take those use cases to production with cost, quality and risk under control.',
  'meta.service.advisory.title': 'Technology Advisory',
  'meta.service.advisory.description':
    'Independent, fixed-scope technical assessments: architecture review, technical due diligence and codebase diagnosis, with prioritized recommendations.',
  'meta.about.title': 'About',
  'meta.about.description':
    'Meet Code Happy, a Brazilian technology consultancy led personally by its founder, who has been building software professionally since 2004.',
  'meta.contact.title': 'Contact',
  'meta.contact.description':
    'Book an intro call or send Code Happy a message. Tell us about the technical challenge and what a good outcome would look like for you.',
  'meta.thanks.title': 'Message sent',
  'meta.thanks.description': 'We received your message. Code Happy replies within 48 hours.',
  'meta.privacy.title': 'Privacy Policy',
  'meta.privacy.description':
    'How Code Happy Tecnologia Ltda. handles personal data sent through this website, including the contact form and call scheduling.',
  'meta.terms.title': 'Terms of Use',
  'meta.terms.description':
    'Terms of use for the website and services of Code Happy Tecnologia Ltda., including responsibilities, intellectual property and payment terms.',
}

export const ui: Record<Locale, Record<UiKey, string>> = { 'pt-br': ptBR, en }

export function useTranslations(locale: Locale): (key: UiKey) => string {
  return (key) => ui[locale][key]
}

/**
 * Long date in the page locale. Formatted in UTC because content dates are date-only values
 * (`2025-07-24` parses as UTC midnight); formatting in the build machine's zone would show
 * the previous day anywhere west of UTC, including Brazil.
 */
export function formatDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(LANG_TAG[locale], { dateStyle: 'long', timeZone: 'UTC' }).format(
    date
  )
}
