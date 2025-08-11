// Tipos base para itens com avaliação
export interface RatedItem {
  name: string;
  rating: number;
}

// Definição da Magia
export interface Magic {
  id: string; // Para uma chave React única
  name: string;
  requirement: string;
  cost: string;
  components: string;
  range: string;
  test: string;
  effect: string;
  notes: string;
}

// Nova definição para Arma
export interface Weapon {
  id:string;
  name: string;
  damage: string;
  type: string;
  properties: string;
  capacity: string;
}

// Equipamento de Armadura
export type VestType = 'Nenhum' | 'Leve' | 'Pesado';
export interface Armor {
    vest: VestType;
    helmet: boolean;
}

// Definição do Monstro
export interface MonsterAttack {
  id: string;
  description: string;
}

export interface Monster {
  id: string;
  name: string;
  type: string;
  threat: string; // Ameaça
  pv: string;
  pa: string;
  attributes: string;
  skills: string;
  armor: string;
  attacks: MonsterAttack[];
  reactions: string;
  specialAbilities: string;
  weaknesses: string;
  behavior: string; // IA
  loot: string; // Saque
}

// Informações do Personagem
export type CharacterClass = 'Lutador' | 'Atirador' | 'Erudito' | 'Engenhoqueiro' | 'Rastreador' | 'Ocultista';
export type Race = 'Humano' | 'Demônio';
export type BackgroundName = 'Nenhum' | 'Corpo Treinado' | 'Artesão Prático' | 'Pesquisador' | 'Sobrevivente' | 'Especialista em Acesso' | 'Manipulador' | 'Conhecedor de Submundos';


// Atributos
export type AttributeName = 'Corpo' | 'Agilidade' | 'Percepção' | 'Inteligência' | 'Presença';
export type Attributes = Record<AttributeName, number>;

// Perícias
export type SkillName =
  // Corpo
  | 'Corpo a Corpo' | 'Atletismo' | 'Resistência' | 'Força Bruta'
  // Agilidade
  | 'Esquiva' | 'Furtividade' | 'Prestidigitação' | 'Acrobacia'
  // Percepção
  | 'Armas de Fogo' | 'Pontaria de Arremesso' | 'Investigação' | 'Rastreamento'
  // Inteligência
  | 'Ocultismo' | 'Tecnologia' | 'Ciência' | 'Línguas'
  // Presença
  | 'Persuasão' | 'Intimidação' | 'Enganação' | 'Liderança';

export type SpecialSkillName = 'Latim' | 'Lockpick' | 'Demonologia' | 'Armas Exóticas' | 'Sobrevivência' | 'Contatos' | 'Ofício (Ferramentas)';

export interface Skill extends RatedItem {
  name: SkillName | SpecialSkillName;
  trained?: boolean;
  mastered?: boolean;
  classBonus?: boolean;
}

export type SkillGroup = {
  attribute: AttributeName;
  skills: Skill[];
};

// Habilidades
export interface Ability {
  name:string;
  type: 'Passiva' | 'Ativa' | 'Reação';
  cost?: string;
  description: string;
}

// Recursos
export interface Resource {
  name: 'Vida' | 'Vontade';
  max: number;
  current: number;
}

// A estrutura principal de dados da ficha de personagem
export interface CharacterSheetData {
  name: string;
  concept: string;
  characterClass: CharacterClass;
  background: BackgroundName;
  race: Race;
  xp: number;
  money: string;
  portraitUrl: string;
  birthday: string;
  hometown: string;
  favoriteSong: string;
  attributes: Attributes;
  attributeBonuses: Partial<Record<AttributeName, number>>;
  skills: SkillGroup[];
  specialSkills: Skill[];
  classAbilities: Ability[];
  classWeakness: {
      name: string;
      description: string;
  };
  resources: Resource[];
  magic: Magic[];
  weapons: Weapon[];
  equipment: string[];
  notes: string;
  armor: Armor;
  advantages: string[];
  disadvantages: string[];
  monsters: Monster[];
  showMonsters: boolean;
}