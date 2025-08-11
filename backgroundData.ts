import type { BackgroundName, SkillName, SpecialSkillName } from './types';

export interface BackgroundData {
    trainedSkill: (SkillName | SpecialSkillName) | (SkillName | SpecialSkillName)[];
    item: string;
    description: string;
    hook: string;
}

export const BACKGROUND_NAMES: BackgroundName[] = ['Nenhum', 'Corpo Treinado', 'Artesão Prático', 'Pesquisador', 'Sobrevivente', 'Especialista em Acesso', 'Manipulador', 'Conhecedor de Submundos'];

export const BACKGROUNDS_DATA: Record<BackgroundName, BackgroundData | null> = {
    'Nenhum': null,
    'Corpo Treinado': {
        trainedSkill: 'Força Bruta',
        item: 'Luvas reforçadas (seus ataques desarmados causam +1 de dano)',
        description: 'Anos de treino rigoroso transformaram seu corpo em uma arma. Você é especialista em combate corporal, usando força e técnica para dominar oponentes.',
        hook: 'Sua reputação como um lutador formidável pode intimidar adversários ou atrair desafios.'
    },
    'Artesão Prático': {
        trainedSkill: 'Ofício (Ferramentas)',
        item: 'Kit de Ferramentas Completo (permite reparar/criar sem penalidades, mesmo em campo)',
        description: 'Consegue criar, adaptar e consertar praticamente qualquer coisa.',
        hook: 'Facilidade em improvisar soluções no calor do momento.'
    },
    'Pesquisador': {
        trainedSkill: ['Investigação', 'Ocultismo'],
        item: 'Biblioteca Portátil (coleção de anotações e referências; +1 dado em um teste de pesquisa por cena)',
        description: 'Analisa, estuda e encontra respostas onde outros não veem nada.',
        hook: 'Pode encontrar informações cruciais para o grupo.'
    },
    'Sobrevivente': {
        trainedSkill: 'Sobrevivência',
        item: 'Kit de Sobrevivência (provisões, corda, fogo rápido; ignora penalidades de ambiente hostil por 1 cena)',
        description: 'Adaptado a ambientes hostis, seja na selva, no deserto ou nas ruas perigosas.',
        hook: 'Rastreia pistas e evita perigos ambientais.'
    },
    'Especialista em Acesso': {
        trainedSkill: 'Lockpick',
        item: 'Kit de Arrombamento Profissional (remove −1 de penalidade em fechaduras complexas)',
        description: 'Entra em lugares restritos sem ser convidado.',
        hook: 'Abrir portas e cofres pode mudar o rumo de uma missão.'
    },
    'Manipulador': {
        trainedSkill: ['Enganação', 'Persuasão'],
        item: 'Disfarce Versátil (permite se passar por outra pessoa por 1 cena sem teste inicial; Mestre decide se precisa rolar depois)',
        description: 'Sabe dizer o que as pessoas querem ouvir — ou temer.',
        hook: 'Manipular situações para o benefício do grupo.'
    },
    'Conhecedor de Submundos': {
        trainedSkill: ['Contatos', 'Persuasão'],
        item: 'Lista de Contatos Sombrios (1× por sessão, chamar um favor para obter item, informação ou passagem segura)',
        description: 'Anda entre criminosos, contrabandistas e informantes.',
        hook: 'Favores e negócios rápidos quando o grupo precisa.'
    }
};