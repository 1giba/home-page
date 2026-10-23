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
  'work.title': 'Trabalhos selecionados',
  'work.intro':
    'Projetos em que a Code Happy atuou, com o contexto de cada um, as decisões tomadas e o que foi entregue.',
  'case.summary': 'Resumo do projeto',
  'case.client': 'Cliente',
  'case.role': 'Papel',
  'case.period': 'Período',
  'case.services': 'Serviços',
  'case.context': 'Contexto e problema',
  'case.challenges': 'Desafios',
  'case.approach': 'Abordagem e decisões',
  'case.delivered': 'O que foi entregue',
  'case.outcomes': 'Resultados',
  'case.technologies': 'Tecnologias',
  'case.cta': 'Enfrentando algo parecido?',
  // <title> (pages get " | Code Happy" appended; home is complete) and meta description.
  'meta.home.title': 'Code Happy — CTO fracionado e engenharia de IA',
  'meta.home.description':
    'Liderança sênior de tecnologia sem contratar um CTO em tempo integral: decisões técnicas sólidas, IA aplicada onde compensa e entregas sob controle.',
  'meta.services.title': 'Serviços',
  'meta.services.description':
    'Três formas de trabalhar com a Code Happy: CTO fracionado, estratégia e engenharia de IA, e consultoria em tecnologia. Veja qual se encaixa no seu momento.',
  // Home (SPEC §3.2, §3.3, §5.2; founder facts B5, B3; reply time B6). Provisional (E3).
  'home.h1': 'Liderança sênior de tecnologia, sem contratar um CTO em tempo integral.',
  'home.lead':
    'A Code Happy ajuda empresas a tomar decisões técnicas sólidas, a usar IA onde ela realmente compensa e a colocar as entregas de software de volta sob controle.',
  'home.problems': 'Problemas que resolvemos',
  'home.problem.1':
    'Estamos construindo um produto e ninguém no time consegue tomar, ou defender, as grandes decisões técnicas.',
  'home.problem.2':
    'Nossos desenvolvedores ou a agência entregam, mas não sabemos se está bom, nem por que sai lento e caro.',
  'home.problem.3':
    'Queremos usar IA, mas não sabemos quais ideias são viáveis, quanto vão custar para rodar ou como levá-las à produção com segurança.',
  'home.problem.4':
    'Construímos algo rápido, muitas vezes com ferramentas de IA, e agora o sistema está frágil e ninguém entende como funciona.',
  'home.problem.5':
    'Precisamos de uma opinião independente antes de uma grande decisão: reescrever, mudar de plataforma, contratar, investir ou adquirir.',
  'home.services': 'Como podemos ajudar',
  'home.evidence': 'Quem conduz o trabalho',
  'home.evidence.lead': 'Cada trabalho da Code Happy é conduzido pessoalmente pelo seu fundador.',
  'home.evidence.more': 'Mais sobre a Code Happy',
  'home.work': 'Trabalhos selecionados',
  'home.steps': 'Como um trabalho começa',
  'home.closing': 'Prefere escrever primeiro?',
  'home.closing.text': 'Conte o seu contexto em uma mensagem. A resposta chega em até 48 horas.',
  'founder.2004.label': '2004',
  'founder.2004': 'Começa a trabalhar com desenvolvimento de software.',
  'founder.2010.label': '2010–2020',
  'founder.2010': 'Quase dez anos em uma empresa brasileira de plataforma de e-commerce.',
  'founder.2020.label': '2020',
  'founder.2020': 'Funda a Code Happy.',
  'founder.2022.label': '2022',
  'founder.2022': 'Projeto freelance em Londres, para uma plataforma SaaS de cunho social.',
  'founder.now.label': 'Hoje',
  'founder.now': 'Desenvolve funcionalidades de IA para uma empresa de SaaS dos Estados Unidos.',
  'cta.message': 'Enviar uma mensagem',
  'cta.services': 'Conhecer os serviços',
  'steps.call.title': 'Conversa inicial',
  'steps.call.text':
    'Uma conversa de 30 minutos para entender o seu contexto e ver se faz sentido trabalharmos juntos.',
  'steps.scope.title': 'Definição do escopo',
  'steps.scope.text':
    'Definimos juntos o problema, o que entra no trabalho e o que seria um bom resultado.',
  'steps.proposal.title': 'Proposta',
  'steps.proposal.text': 'Você recebe uma proposta por escrito com o escopo do trabalho.',
  'services.intro':
    'Três formas de trabalhar com a Code Happy, definidas pela situação em que a sua empresa está.',
  'services.for': 'Para quem é',
  'services.unsure': 'Não sabe qual se encaixa?',
  'services.unsureText':
    'Conte o seu contexto em uma conversa inicial e indicamos o caminho mais adequado.',
  'service.fit': 'Para quem é',
  'service.situations': 'Situações comuns',
  'service.scope': 'O que o trabalho cobre',
  'service.how': 'Como funciona',
  'service.value': 'O que você ganha',
  'service.related': 'Trabalhos relacionados',
  'service.cta': 'Vamos conversar sobre o seu contexto?',
  'service.other': 'Outros serviços',
  'meta.about.title': 'Sobre',
  'meta.about.description':
    'Conheça a Code Happy, consultoria brasileira de tecnologia. Seu fundador desenvolve software profissionalmente desde 2004 e lidera pessoalmente os projetos.',
  'meta.contact.title': 'Contato',
  'meta.contact.description':
    'Agende uma conversa inicial ou envie uma mensagem para a Code Happy. Conte qual é o desafio técnico e o que seria um bom resultado para você.',
  'meta.work.title': 'Trabalhos selecionados',
  'meta.work.description':
    'Estudos de caso da Code Happy: o contexto de cada projeto, os desafios técnicos, as decisões tomadas e o que foi entregue, publicados apenas com informações confirmadas.',
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
  'work.title': 'Selected work',
  'work.intro':
    'Projects Code Happy has worked on, with the context of each one, the decisions taken and what was delivered.',
  'case.summary': 'Project summary',
  'case.client': 'Client',
  'case.role': 'Role',
  'case.period': 'Period',
  'case.services': 'Services',
  'case.context': 'Context and problem',
  'case.challenges': 'Challenges',
  'case.approach': 'Approach and decisions',
  'case.delivered': 'What was delivered',
  'case.outcomes': 'Outcomes',
  'case.technologies': 'Technologies',
  'case.cta': 'Facing something similar?',
  'meta.home.title': 'Code Happy — Fractional CTO and AI Engineering',
  'meta.home.description':
    'Senior technology leadership without hiring a full-time CTO: sound technical decisions, AI applied where it pays off, and delivery back under control.',
  'meta.services.title': 'Services',
  'meta.services.description':
    'Three ways to work with Code Happy: fractional CTO, AI strategy and engineering, and technology advisory. See which one fits where your company is now.',
  'home.h1': 'Senior technology leadership, without hiring a full-time CTO.',
  'home.lead':
    'Code Happy helps companies make sound technical decisions, use AI where it actually pays off, and get software delivery back under control.',
  'home.problems': 'Problems we solve',
  'home.problem.1':
    "We're building a product and nobody on the team can make or defend the big technical decisions.",
  'home.problem.2':
    "Our developers or agency deliver, but we can't tell if it's good, or why it's slow and expensive.",
  'home.problem.3':
    "We want to use AI, but don't know which ideas are viable, what they'll cost to run, or how to get them to production safely.",
  'home.problem.4':
    "We built something quickly, often with AI tools, and it's now fragile and nobody understands it.",
  'home.problem.5':
    'We need an independent opinion before a major decision: rewrite, re-platform, hire, invest or acquire.',
  'home.services': 'How we can help',
  'home.evidence': 'Who does the work',
  'home.evidence.lead': 'Every Code Happy engagement is led personally by its founder.',
  'home.evidence.more': 'More about Code Happy',
  'home.work': 'Selected work',
  'home.steps': 'How an engagement starts',
  'home.closing': 'Prefer to write first?',
  'home.closing.text':
    'Tell us about your situation in a message. You will get a reply within 48 hours.',
  'founder.2004.label': '2004',
  'founder.2004': 'Starts working in software development.',
  'founder.2010.label': '2010–2020',
  'founder.2010': 'Almost ten years at a Brazilian e-commerce platform company.',
  'founder.2020.label': '2020',
  'founder.2020': 'Founds Code Happy.',
  'founder.2022.label': '2022',
  'founder.2022': 'A freelance project in London, for a social SaaS platform.',
  'founder.now.label': 'Today',
  'founder.now': 'Builds AI features for a US SaaS company.',
  'cta.message': 'Send a message',
  'cta.services': 'Explore services',
  'steps.call.title': 'Intro call',
  'steps.call.text':
    'A 30-minute conversation to understand your situation and see whether working together makes sense.',
  'steps.scope.title': 'Scoping',
  'steps.scope.text':
    'Together we define the problem, what is in scope and what a good outcome would look like.',
  'steps.proposal.title': 'Proposal',
  'steps.proposal.text': 'You receive a written proposal with the scope of the work.',
  'services.intro':
    'Three ways to work with Code Happy, defined by the situation your company is in.',
  'services.for': 'Who it is for',
  'services.unsure': 'Not sure which one fits?',
  'services.unsureText':
    'Tell us about your situation in an intro call and we will point you to the right one.',
  'service.fit': 'Is this for you?',
  'service.situations': 'Common situations',
  'service.scope': 'What the engagement covers',
  'service.how': 'How it works',
  'service.value': 'What you get',
  'service.related': 'Related work',
  'service.cta': 'Want to talk about your situation?',
  'service.other': 'Other services',
  'meta.about.title': 'About',
  'meta.about.description':
    'Meet Code Happy, a Brazilian technology consultancy led personally by its founder, who has been building software professionally since 2004.',
  'meta.contact.title': 'Contact',
  'meta.contact.description':
    'Book an intro call or send Code Happy a message. Tell us about the technical challenge and what a good outcome would look like for you.',
  'meta.work.title': 'Selected work',
  'meta.work.description':
    "Code Happy case studies: each project's context, the technical challenges, the decisions taken and what was delivered, published only with confirmed information.",
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

/** `YYYY` stays as is; `YYYY-MM` becomes the localized month and year (in UTC, like formatDate). */
function formatYearMonth(locale: Locale, value: string): string {
  const [year, month] = value.split('-').map(Number)
  if (!month) return String(year)
  return new Intl.DateTimeFormat(LANG_TAG[locale], {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)))
}

/** A project period such as "março de 2024 – 2025" / "March 2024 – 2025" (SPEC §8.4). */
export function formatPeriod(locale: Locale, period: { start: string; end?: string }): string {
  const start = formatYearMonth(locale, period.start)
  return period.end ? `${start} – ${formatYearMonth(locale, period.end)}` : start
}
