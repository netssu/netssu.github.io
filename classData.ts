import type { CharacterClass, Ability } from './types';

interface ClassData {
    abilities: Ability[];
    weakness: {
        name: string;
        description: string;
    };
}

export const CHARACTER_CLASSES: CharacterClass[] = ['Lutador', 'Atirador', 'Erudito', 'Engenhoqueiro', 'Rastreador', 'Ocultista'];

export const CLASS_DATA: Record<CharacterClass, ClassData> = {
    'Lutador': {
        abilities: [
            { name: 'Briga de Bar', type: 'Passiva', description: 'ignora penalidades ao usar armas improvisadas; ataques desarmados causam +1 de dano base.' },
            { name: 'Casca Grossa', type: 'Passiva', description: 'reduz todo dano físico recebido em 1 após rolagem de dano do inimigo.' },
            { name: 'Empurrão Violento', type: 'Ativa', cost: '2 PA', description: 'após acertar um ataque corpo a corpo, empurra o alvo metros iguais ao valor de Corpo; alvo testa Agilidade (CD 2) ou fica Derrubado.' }
        ],
        weakness: {
            name: 'Raiva Cega',
            description: 'se receber 4 ou mais de dano em um único ataque, sofre –2 dados ao atacar qualquer inimigo que não seja o que causou esse dano no próximo turno (mínimo 1 dado).'
        }
    },
    'Atirador': {
        abilities: [
            { name: 'Sempre Preparado', type: 'Passiva', description: 'sacar ou guardar arma de fogo principal não custa PA.' },
            { name: 'Mira Rápida', type: 'Ativa', cost: '1 PA', description: 'anula penalidade de cobertura parcial ou mira em parte específica do corpo sem aumentar dificuldade.' },
            { name: 'Recarga Tática', type: 'Passiva', description: 'primeira recarga no combate custa 1 PA a menos (mín. 1 PA).' }
        ],
        weakness: {
            name: 'Visão de Túnel',
            description: 'após atacar um alvo, sofre –1 dado para perceber outras ameaças até mudar de alvo ou encerrar o combate.'
        }
    },
    'Erudito': {
        abilities: [
            { name: 'Enciclopédia Ambulante', type: 'Passiva', description: '1×/sessão pode declarar que "já leu sobre isso" e obter informação crucial do mestre sem teste.' },
            { name: 'Análise de Fraqueza', type: 'Ativa', cost: '3 PA', description: 'teste Inteligência + Ocultismo; sucesso concede +1 dado nos ataques de todos os aliados contra a criatura até o fim da rodada.' },
            { name: 'Ritualista Improvisado', type: 'Passiva', description: 'pode tentar rituais sem fórmula completa com dificuldade maior; tempo de preparação de rituais conhecidos –25%.' }
        ],
        weakness: {
            name: 'Subestimação Física',
            description: 'quando atacado corpo a corpo por inimigo maior/mais forte, sofre –1 dado ao Bloquear ou Contra-atacar até o fim da cena.'
        }
    },
    'Engenhoqueiro': {
        abilities: [
            { name: 'Improvisador Nato', type: 'Passiva', description: 'ignora penalidades por uso não convencional de ferramentas; pode criar gadget simples em cena.' },
            { name: 'Armadilhas de Campo', type: 'Ativa', cost: '3 PA', description: 'instala armadilha improvisada (1 dano + Atordoar Leve ou Derrubar se Margem ≥ 2).' },
            { name: 'Manutenção Rápida', type: 'Passiva', description: '1×/sessão, consertar arma/equipamento custa 0 PA.' }
        ],
        weakness: {
            name: 'Dependente do Equipamento',
            description: 'se passar 2 turnos sem usar ferramenta/gadget/arma especial, sofre –1 dado em todas as ações até improvisar (1 PA).'
        }
    },
    'Rastreador': {
        abilities: [
            { name: 'Caçador de Rastros', type: 'Passiva', description: '+1 dado em testes para seguir pistas ou identificar sinais ambientais.' },
            { name: 'Conhecimento de Terreno', type: 'Passiva', description: 'ignora penalidades de terreno difícil em áreas naturais.' },
            { name: 'Golpe de Emboscada', type: 'Ativa', cost: '3 PA', description: 'ataque corpo a corpo ou à distância contra alvo que não o viu ganha +2 dados e +1 dano.' }
        ],
        weakness: {
            name: 'Peixe Fora d’Água',
            description: 'em áreas urbanas densas, sofre –1 dado em Percepção e Movimentação.'
        }
    },
    'Ocultista': {
        abilities: [
            { name: 'Intuição Sobrenatural', type: 'Passiva', description: 'mestre pode passar pequenas dicas sobre presença ou intenção de entidades próximas.' },
            { name: 'Identificação Mística', type: 'Ativa', cost: '3 PA', description: 'teste Inteligência + Ocultismo para identificar tipo, fraquezas e resistências de criatura sobrenatural.' },
            { name: 'Foco Ritualístico', type: 'Passiva', description: '+1 dado em rituais que demandem componentes especiais.' }
        ],
        weakness: {
            name: 'Olhar do Outro Lado',
            description: 'ao usar magia/ritual, role 1d6; com resultado 1, fica Atordoado (–2 PA) no próximo turno.'
        }
    }
};
