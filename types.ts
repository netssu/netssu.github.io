// Tipos base para itens com avaliação
export interface RatedItem {
  name: string;
  rating: number;
}

// Informações do Personagem
export type CharacterClass = 'Lutador' | 'Atirador' | 'Erudito' | 'Engenhoqueiro' | 'Rastreador' | 'Ocultista';
export type Race = 'Humano' | 'Demônio';

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

export type SpecialSkillName = 'Latim' | 'Lockpick' | 'Demonologia' | 'Armas Exóticas';

export interface Skill extends RatedItem {
  name: SkillName | SpecialSkillName;
}

export type SkillGroup = {
  attribute: AttributeName;
  skills: Skill[];
};

// Habilidades
export interface Ability {
  name: string;
  type: 'Passiva' | 'Ativa';
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
  race: Race;
  xp: number;
  portraitUrl: string;
  birthday: string;
  hometown: string;
  favoriteSong: string;
  attributes: Attributes;
  skills: SkillGroup[];
  specialSkills: Skill[];
  classAbilities: Ability[];
  classWeakness: {
      name: string;
      description: string;
  };
  resources: Resource[];
  equipment: string[];
  notes: string;
}
