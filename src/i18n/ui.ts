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
  'theme.dark': 'Tema escuro',
  'nav.services': 'Serviços',
  'nav.work': 'Projetos',
  'nav.about': 'Sobre',
  'nav.contact': 'Contato',
  'footer.tagline': 'Liderança sênior de tecnologia, sem contratar um CTO em tempo integral.',
  'footer.nav': 'Rodapé',
  'footer.social': 'Perfis',
  'footer.privacy': 'Política de Privacidade',
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
    'Na Code Happy, ajudo empresas a tomar decisões técnicas sólidas, a usar IA onde ela realmente compensa e a colocar as entregas de software de volta sob controle.',
  // Hero outcome panels: the three outcomes of meta.home.description, verbatim.
  'home.value.1': 'Decisões técnicas sólidas',
  'home.value.2': 'IA aplicada onde compensa',
  'home.value.3': 'Entregas sob controle',
  'home.problems': 'Problemas que resolvo',
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
  'home.services': 'Como posso ajudar',
  'home.evidence': 'Quem conduz o trabalho',
  'home.evidence.lead': 'Sou Giba e conduzo pessoalmente cada trabalho da Code Happy.',
  'home.evidence.more': 'Mais sobre a Code Happy',
  'home.work': 'Trabalhos selecionados',
  'home.steps': 'Como um trabalho começa',
  'home.closing': 'Prefere escrever primeiro?',
  'home.closing.text': 'Conte o seu contexto em uma mensagem. A resposta chega em até 48 horas.',
  'founder.2004.label': '2004',
  'founder.2004': 'Comecei a trabalhar com desenvolvimento de software.',
  'founder.2010.label': '2010–2020',
  'founder.2010': 'Quase dez anos em uma empresa brasileira de plataforma de e-commerce.',
  'founder.2020.label': '2020',
  'founder.2020': 'Fundei a Code Happy.',
  'founder.2022.label': '2022',
  'founder.2022': 'Projeto freelance em Londres, para uma plataforma SaaS de cunho social.',
  'founder.now.label': 'Hoje',
  'founder.now': 'Desenvolvo funcionalidades de IA para uma empresa de SaaS dos Estados Unidos.',
  'legal.updated': 'Última atualização:',
  'legal.questions.privacy': 'Dúvidas sobre esta política?',
  'legal.contact': 'Fale conosco',
  'about.linkedin': 'Giba no LinkedIn',
  'about.how': 'Como eu trabalho',
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
    'Conte o seu contexto em uma conversa inicial e eu indico o caminho mais adequado.',
  'service.fit': 'Para quem é',
  'service.situations': 'Situações comuns',
  'service.scope': 'O que o trabalho cobre',
  'service.how': 'Como funciona',
  'service.value': 'O que você ganha',
  'service.related': 'Trabalhos relacionados',
  'service.cta': 'Vamos conversar sobre o seu contexto?',
  'service.other': 'Outros serviços',
  // Contact form (SPEC §13.3–§13.4). Provisional copy (E3).
  'form.emailSubject': 'Novo contato — site Code Happy [pt-BR]',
  'form.required': '(obrigatório)',
  'form.optional': '(opcional)',
  'form.name': 'Nome',
  'form.email': 'E-mail',
  'form.company': 'Empresa',
  'form.service': 'Com o que você precisa de ajuda?',
  'form.service.other': 'Outro / ainda não sei',
  'form.message': 'Mensagem',
  'form.messageHint': 'Qual é a situação e como seria um bom resultado?',
  'form.submit': 'Enviar mensagem',
  'form.privacy':
    'As informações deste formulário são entregues por e-mail por meio do serviço FormSubmit e usadas para responder ao seu contato e, quando for o caso, preparar uma proposta.',
  'form.privacyLink': 'Política de Privacidade',
  'form.sending': 'Enviando…',
  'form.error.required': 'Preencha este campo.',
  'form.error.email': 'Informe um e-mail válido, como nome@empresa.com.',
  'form.error.minlength': 'Escreva pelo menos {n} caracteres.',
  'form.error.maxlength': 'Use no máximo {n} caracteres.',
  'form.failure': 'Não foi possível enviar a mensagem. Tente de novo ou escreva diretamente para:',
  'thanks.text': 'Agradeço o contato. Respondo pessoalmente em até 48 horas.',
  'thanks.call': 'Se preferir, agende já uma conversa de 30 minutos.',
  'thanks.home': 'Voltar para a página inicial',
  // Contact page (SPEC §5.2; call duration and reply time B6; budget answer plan F5-03).
  'contact.title': 'Fale com a Code Happy',
  'contact.lead':
    'Agende uma conversa inicial ou envie uma mensagem. A partir daí, definimos juntos o escopo e você recebe uma proposta por escrito.',
  'contact.call': 'Agendar uma conversa',
  'contact.callText':
    'Uma conversa de 30 minutos, agendada pelo Calendly, para entender o seu contexto.',
  'contact.messageText': 'A resposta chega em até 48 horas.',
  'contact.email': 'E-mail',
  'contact.emailText': 'Se preferir, escreva diretamente para:',
  'contact.faq': 'Perguntas frequentes',
  'contact.faq.budget': 'Quanto custa?',
  'contact.faq.budgetAnswer':
    'Depois da conversa inicial, envio uma proposta por escrito com o escopo e as condições do trabalho.',
  'meta.about.title': 'Sobre',
  'meta.contact.title': 'Contato',
  'meta.contact.description':
    'Agende uma conversa inicial ou envie uma mensagem para a Code Happy. Conte qual é o desafio técnico e o que seria um bom resultado para você.',
  'meta.work.title': 'Trabalhos selecionados',
  'meta.work.description':
    'Estudos de caso da Code Happy: o contexto de cada projeto, os desafios técnicos, as decisões tomadas e o que foi entregue, publicados apenas com informações confirmadas.',
  'meta.thanks.title': 'Mensagem enviada',
  'meta.thanks.description': 'Recebi sua mensagem e respondo em até 48 horas.',
  'meta.privacy.title': 'Política de Privacidade',
  'meta.privacy.description':
    'Como a Code Happy Tecnologia Ltda. trata os dados pessoais enviados por este site, incluindo o formulário de contato e o agendamento de conversas.',
} as const

export type UiKey = keyof typeof ptBR

const en: Record<UiKey, string> = {
  skip: 'Skip to content',
  'lang.label': 'Language',
  'cta.book': 'Book an intro call',
  'a11y.external': '(external site)',
  'nav.label': 'Main',
  'nav.menu': 'Menu',
  'theme.dark': 'Dark theme',
  'nav.services': 'Services',
  'nav.work': 'Work',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'footer.tagline': 'Senior technology leadership, without hiring a full-time CTO.',
  'footer.nav': 'Footer',
  'footer.social': 'Profiles',
  'footer.privacy': 'Privacy Policy',
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
    'At Code Happy, I help companies make sound technical decisions, use AI where it actually pays off, and get software delivery back under control.',
  'home.value.1': 'Sound technical decisions',
  'home.value.2': 'AI applied where it pays off',
  'home.value.3': 'Delivery back under control',
  'home.problems': 'Problems I solve',
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
  'home.services': 'How I can help',
  'home.evidence': 'Who does the work',
  'home.evidence.lead': "I'm Giba, and I lead every Code Happy engagement personally.",
  'home.evidence.more': 'More about Code Happy',
  'home.work': 'Selected work',
  'home.steps': 'How an engagement starts',
  'home.closing': 'Prefer to write first?',
  'home.closing.text':
    'Tell me about your situation in a message. You will get a reply within 48 hours.',
  'founder.2004.label': '2004',
  'founder.2004': 'I started working in software development.',
  'founder.2010.label': '2010–2020',
  'founder.2010': 'Almost ten years at a Brazilian e-commerce platform company.',
  'founder.2020.label': '2020',
  'founder.2020': 'I founded Code Happy.',
  'founder.2022.label': '2022',
  'founder.2022': 'A freelance project in London, for a social SaaS platform.',
  'founder.now.label': 'Today',
  'founder.now': 'I build AI features for a US SaaS company.',
  'legal.updated': 'Last updated:',
  'legal.questions.privacy': 'Questions about this policy?',
  'legal.contact': 'Contact us',
  'about.linkedin': 'Giba on LinkedIn',
  'about.how': 'How I work',
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
    "Tell me about your situation in an intro call and I'll point you to the right one.",
  'service.fit': 'Is this for you?',
  'service.situations': 'Common situations',
  'service.scope': 'What the engagement covers',
  'service.how': 'How it works',
  'service.value': 'What you get',
  'service.related': 'Related work',
  'service.cta': 'Want to talk about your situation?',
  'service.other': 'Other services',
  'form.emailSubject': 'New contact — Code Happy website [en]',
  'form.required': '(required)',
  'form.optional': '(optional)',
  'form.name': 'Name',
  'form.email': 'Email',
  'form.company': 'Company',
  'form.service': 'What do you need help with?',
  'form.service.other': 'Other / not sure',
  'form.message': 'Message',
  'form.messageHint': "What's the situation and what would a good outcome look like?",
  'form.submit': 'Send message',
  'form.privacy':
    'The information in this form is delivered by email through the FormSubmit service and used to reply to you and, where relevant, to prepare a proposal.',
  'form.privacyLink': 'Privacy Policy',
  'form.sending': 'Sending…',
  'form.error.required': 'Fill in this field.',
  'form.error.email': 'Enter a valid email address, such as name@company.com.',
  'form.error.minlength': 'Write at least {n} characters.',
  'form.error.maxlength': 'Use at most {n} characters.',
  'form.failure': 'The message could not be sent. Please try again, or write directly to:',
  'thanks.text': "Thank you for getting in touch. I'll reply personally within 48 hours.",
  'thanks.call': 'If you prefer, book a 30-minute call now.',
  'thanks.home': 'Back to the home page',
  'contact.title': 'Talk to Code Happy',
  'contact.lead':
    'Book an intro call or send a message. From there, we define the scope together and you receive a written proposal.',
  'contact.call': 'Book a call',
  'contact.callText': 'A 30-minute conversation, booked on Calendly, to understand your situation.',
  'contact.messageText': 'You will get a reply within 48 hours.',
  'contact.email': 'Email',
  'contact.emailText': 'If you prefer, write directly to:',
  'contact.faq': 'Frequently asked questions',
  'contact.faq.budget': 'How much does it cost?',
  'contact.faq.budgetAnswer':
    'After an intro call, I send a written proposal with the scope and terms of the work.',
  'meta.about.title': 'About',
  'meta.contact.title': 'Contact',
  'meta.contact.description':
    'Book an intro call or send Code Happy a message. Tell me about the technical challenge and what a good outcome would look like for you.',
  'meta.work.title': 'Selected work',
  'meta.work.description':
    "Code Happy case studies: each project's context, the technical challenges, the decisions taken and what was delivered, published only with confirmed information.",
  'meta.thanks.title': 'Message sent',
  'meta.thanks.description': 'I received your message and will reply within 48 hours.',
  'meta.privacy.title': 'Privacy Policy',
  'meta.privacy.description':
    'How Code Happy Tecnologia Ltda. handles personal data sent through this website, including the contact form and call scheduling.',
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
