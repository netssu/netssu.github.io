export interface Trait {
  name: string;
  description: string;
}

export const ADVANTAGES_LIST: Trait[] = [
  { name: 'Reflexos Rápidos', description: '+1 dado em Esquiva e Ataques de Oportunidade.' },
  { name: 'Mira de Ferro', description: '+1 dado em ataques com arma de fogo se não se mover no turno.' },
  { name: 'Resistente', description: '+2 PV e +1 dado contra Sangramento e Atordoamento.' },
  { name: 'Mão Firme', description: 'ignora -1 dado por recuo acumulado ao atirar.' },
  { name: 'Pé Leve', description: 'mover 1 metro custa 0 PA uma vez por turno.' },
  { name: 'Treinamento Militar', description: 'Recarregar custa -1 PA (mín. 1).' },
  { name: 'Intuição Perigosa', description: 'uma vez por combate, pode refazer uma rolagem de iniciativa.' },
  { name: 'Instinto de Caçador', description: '+1 dado para detectar emboscadas e armadilhas.' },
  { name: 'Golpe Certeiro', description: 'uma vez por combate, +2 dados em um único ataque melee.' },
  { name: 'Médico de Campo', description: 'Primeiros Socorros custam -1 PA e têm +1 dado.' },
  { name: 'Frio Sob Pressão', description: 'ignora a primeira penalidade de cobertura parcial ao atirar.' },
  { name: 'Força Brutal', description: '+1 dado em testes de Força para empurrar, derrubar ou arrombar.' },
  { name: 'Audição Apurada', description: '+1 dado em testes de PER para ouvir inimigos ocultos.' },
  { name: 'Passos Silenciosos', description: '+1 dado em Furtividade ao se mover devagar.' },
  { name: 'Carregador Extra', description: 'começa cada combate com +1 carregador cheio da arma principal.' },
];

export const DISADVANTAGES_LIST: Trait[] = [
  { name: 'Visão Ruim', description: '-1 dado em ataques de longo alcance e testes de PER visuais.' },
  { name: 'Impulsivo', description: 'não pode usar Preparar (Mirar/Finta).' },
  { name: 'Frágil', description: '-2 PV e -1 dado contra testes de resistência a Atordoamento.' },
  { name: 'Mira Lenta', description: 'Mirar custa +1 PA.' },
  { name: 'Má Sorte', description: '1 vez por sessão o mestre pode transformar um acerto normal seu em falha.' },
  { name: 'Inseguro', description: '-1 dado em testes sociais contra NPCs hostis.' },
  { name: 'Medo de Sangue', description: 'ao ver um aliado cair, teste VON CD 2 ou perca 2 PA.' },
  { name: 'Mãos Tremulas', description: '-1 dado em ataques com arma de fogo após se mover.' },
  { name: 'Armadura Incômoda', description: 'perde -1 PA no primeiro turno se usar AR 2 ou mais.' },
  { name: 'Pé Pesado', description: '+1 PA para mover cada 1 metro em terreno difícil.' },
  { name: 'Odiado no Submundo', description: 'penalidade de -2 dados em Persuasão/Intimidação com criminosos.' },
  { name: 'Vulnerável a Dor', description: 'sempre que sofrer 3 ou mais de dano em um único golpe, perde 1 PA extra no próximo turno.' },
  { name: 'Cansado Crônico', description: 'começa cada combate com 1 PA a menos no primeiro turno.' },
  { name: 'Armas Pesadas Desajeitadas', description: '-1 dado com armas melee de DA 3 ou mais.' },
  { name: 'Surdez Parcial', description: '-2 dados em testes de PER para ouvir ou detectar movimento.' },
];
