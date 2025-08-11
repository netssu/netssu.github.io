import type { CharacterClass, Ability, AttributeName, SkillName, SpecialSkillName } from './types';

interface ClassData {
    attribute: AttributeName;
    bonuses: {
        attribute: AttributeName;
        skills: (SkillName | SpecialSkillName)[];
    };
    abilities: Ability[];
    weakness: {
        name: string;
        description: string;
    };
}

export const CHARACTER_CLASSES: CharacterClass[] = ['Lutador', 'Atirador', 'Rastreador', 'Engenhoqueiro', 'Erudito', 'Ocultista'];

export const CLASS_DATA: Record<CharacterClass, ClassData> = {
    'Lutador': {
        attribute: 'Corpo',
        bonuses: {
            attribute: 'Corpo',
            skills: ['Corpo a Corpo', 'Atletismo'],
        },
        abilities: [
            { name: 'Golpe de Pressão', type: 'Ativa', cost: '3 PA', description: 'Se acertar com Margem ≥ 2, aplica Atordoar Leve além do dano.' },
            { name: 'Resistência Bruta', type: 'Passiva', description: '1×/turno, ignora 1 de dano de um ataque corpo a corpo recebido.' },
            { name: 'Ameaça Constante', type: 'Passiva', description: '+1 dado em Ataques de Oportunidade (melee).' }
        ],
        weakness: {
            name: 'Instinto Focado',
            description: 'Se receber 4+ de dano num único ataque, no próximo turno sofre –2 dados para atacar qualquer alvo que não seja o agressor (mín. 1).'
        }
    },
    'Atirador': {
        attribute: 'Agilidade',
        bonuses: {
            attribute: 'Agilidade',
            skills: ['Armas de Fogo', 'Investigação'],
        },
        abilities: [
            { name: 'Mira Certeira', type: 'Ativa', cost: '2 PA', description: 'No próximo disparo, +2 dados e ignora –1 por distância.' },
            { name: 'Disparo de Reação', type: 'Reação', cost: '3 PA', description: 'Ataque imediato quando um inimigo entra no seu alcance; –1 dado nesse disparo.' },
            { name: 'Tiro Letal', type: 'Passiva', description: 'Em crítico com arma de fogo, ignora +1 AR adicional.' }
        ],
        weakness: {
            name: 'Visão de Túnel em Combate',
            description: 'Ao gastar 4 PA ou mais atacando o mesmo alvo em um turno, sofre −2 dados para notar ameaças fora de sua linha de visão até o próximo turno e não pode realizar Ataques de Oportunidade contra outros inimigos.'
        }
    },
     'Rastreador': {
        attribute: 'Percepção',
        bonuses: {
            attribute: 'Percepção',
            skills: ['Sobrevivência', 'Rastreamento'],
        },
        abilities: [
            { name: 'Caça Implacável', type: 'Passiva', description: 'Ignora –1 dado por terreno difícil ao rastrear/perseguir.' },
            { name: 'Tiro Preciso de Caçador', type: 'Ativa', cost: '3 PA', description: 'Se acertar com Margem ≥ 2, aplica um efeito de Tiro Mirado sem custo extra (cabeça, perna, braço, etc.).' },
            { name: 'Olhos Afiados', type: 'Passiva', description: '+1 dado em Percepção contra emboscadas ou alvos ocultos.' }
        ],
        weakness: {
            name: 'Foco na Presa',
            description: 'Se errar o mesmo alvo duas vezes seguidas, sofre –1 dado em todos os ataques até acertá-lo ou trocar de alvo.'
        }
    },
    'Engenhoqueiro': {
        attribute: 'Inteligência',
        bonuses: {
            attribute: 'Inteligência',
            skills: ['Tecnologia', 'Ofício (Ferramentas)'],
        },
        abilities: [
            { name: 'Improviso Rápido', type: 'Ativa', cost: '3 PA', description: 'Cria um gadget simples que causa 1 dano e aplica Derrubar ou Atordoar Leve (sua escolha) se Margem ≥ 2.' },
            { name: 'Manutenção Expressa', type: 'Passiva', description: '–1 PA para recarregar ou reparar (sinergia com a regra de Desgaste).' },
            { name: 'Truque Mecânico', type: 'Ativa', cost: '2 PA', description: 'Desalinha uma arma/dispositivo inimigo; o alvo gasta 2 PA para corrigir antes de usar novamente.' }
        ],
        weakness: {
            name: 'Dependente de Ferramentas',
            description: 'Sem kit de ferramentas ou item tecnológico em mãos, sofre –1 dado em ações que usem Inteligência.'
        }
    },
    'Erudito': {
        attribute: 'Inteligência',
        bonuses: {
            attribute: 'Inteligência',
            skills: ['Ocultismo', 'Investigação'],
        },
        abilities: [
            { name: 'Enciclopédia Ambulante', type: 'Passiva', cost: '1×/sessão', description: 'Obtém informação crucial do Mestre sobre criatura/ritual/objeto sem rolagem (fraqueza, procedimento, gatilho).' },
            { name: 'Análise de Fraqueza', type: 'Ativa', cost: '3 PA', description: 'Teste INT + Ocultismo (CD do alvo); sucesso: todos os aliados têm +1 dado ao atacar aquele alvo até o fim da rodada.' },
            { name: 'Lógica Fria', type: 'Passiva', description: '+1 dado em Resistência Mental contra medo/confusão.' }
        ],
        weakness: {
            name: 'Subestimação Física',
            description: 'Quando engajado em melee por inimigo maior/mais forte, sofre –1 dado para Bloquear e Contra-atacar.'
        }
    },
    'Ocultista': {
        attribute: 'Inteligência',
        bonuses: {
            attribute: 'Inteligência',
            skills: ['Ocultismo', 'Demonologia'],
        },
        abilities: [
            { name: 'Olho do Além', type: 'Passiva', description: '+1 dado para detectar presença sobrenatural (Investigação/Ocultismo, pistas, sinais).' },
            { name: 'Símbolos de Proteção', type: 'Ativa', cost: '2 PA | 1×/combate', description: 'Ganha AR 2 contra o próximo ataque sobrenatural que sofrer.' },
            { name: 'Ritual de Contenção', type: 'Ativa', cost: '3 PA', description: 'Teste INT + Ocultismo CD 2 para criar uma barreira curta (1×1m) por 1 turno que dificulta passagem de criaturas sobrenaturais (elas precisam gastar +2 PA para atravessar).' }
        ],
        weakness: {
            name: 'Vulnerável ao Oculto',
            description: 'Recebe +1 dano de ataques mágicos/sobrenaturais.'
        }
    }
};