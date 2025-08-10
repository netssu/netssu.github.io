import React from 'react';
import type { CharacterClass, Race } from '../types';

interface CharacterHeaderProps {
  name: string;
  concept: string;
  characterClass: CharacterClass;
  availableClasses: CharacterClass[];
  race: Race;
  xp: number;
  portraitUrl: string;
  birthday: string;
  hometown: string;
  favoriteSong: string;
  onFieldChange: (field: string, value: any) => void;
}

const EditableHeaderInput: React.FC<{ label: string; name: string; value: string | number; onFieldChange: (field: string, value: any) => void; type?: string }> = 
({ label, name, value, onFieldChange, type = 'text' }) => (
  <div className="flex-1 min-w-[150px]">
    <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80">
      {label}
    </label>
    <input 
      type={type}
      name={name}
      value={value}
      onChange={(e) => onFieldChange(e.target.name, type === 'number' ? parseInt(e.target.value, 10) || 0 : e.target.value)}
      className="w-full bg-transparent border-b-2 border-gray-600/70 pt-1 pb-2 text-lg text-brand-parchment-light font-medium focus:outline-none focus:border-brand-red-500 transition-colors"
    />
  </div>
);

const ClassSelector: React.FC<{ label: string; value: CharacterClass; options: CharacterClass[]; onFieldChange: (field: string, value: any) => void;}> = 
({ label, value, options, onFieldChange }) => (
    <div className="flex-1 min-w-[150px]">
      <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80">
        {label}
      </label>
      <select
        name="characterClass"
        value={value}
        onChange={(e) => onFieldChange('characterClass', e.target.value)}
        className="w-full bg-transparent border-b-2 border-gray-600/70 pt-1 pb-2 text-lg text-brand-parchment-light font-medium focus:outline-none focus:border-brand-red-500 transition-colors appearance-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fca5a5' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
      >
        {options.map(opt => <option key={opt} value={opt} className="bg-gray-800">{opt}</option>)}
      </select>
    </div>
);


const StaticHeaderInput: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex-1 min-w-[150px]">
      <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80">
        {label}
      </label>
      <div className="w-full bg-transparent border-b-2 border-gray-600/70 pt-1 pb-2 text-lg text-brand-parchment-light font-medium">
        {value}
      </div>
    </div>
  );

const CharacterHeader: React.FC<CharacterHeaderProps> = ({ 
    name, concept, characterClass, availableClasses, race, xp, portraitUrl, birthday, hometown, favoriteSong, onFieldChange 
}) => {
  return (
    <header className="border-b-4 border-brand-red-800 pb-4 mb-4">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        <div className="w-full md:w-32 flex-shrink-0 mx-auto">
            <div className="aspect-[3/4] rounded-md overflow-hidden border-2 border-gray-600 shadow-lg shadow-black/50">
                <img
                    src={portraitUrl}
                    alt={`Portrait of ${name}`}
                    className="w-full h-full object-cover object-center grayscale-[30%] contrast-125"
                    onError={(e) => { e.currentTarget.src = 'https://picsum.photos/400/600' }}
                />
            </div>
            <div className="mt-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80 mb-1">
                    URL
                </label>
                <input 
                    type="text"
                    value={portraitUrl}
                    onChange={(e) => onFieldChange('portraitUrl', e.target.value)}
                    className="w-full bg-transparent border-b-2 border-gray-600/70 pt-1 pb-1 text-xs text-brand-parchment-light font-medium focus:outline-none focus:border-brand-red-500 transition-colors"
                    placeholder="URL da imagem..."
                />
            </div>
        </div>

        <div className="flex-1 w-full">
            <input
                type="text"
                value={name}
                onChange={(e) => onFieldChange('name', e.target.value)}
                className="font-serif text-4xl lg:text-5xl text-brand-red-400 font-bold tracking-wide bg-transparent focus:outline-none focus:bg-white/5 rounded-md px-2 -ml-2 w-full"
                placeholder="Nome do Personagem"
            />
            <input 
                type="text"
                value={concept}
                onChange={(e) => onFieldChange('concept', e.target.value)}
                className="italic text-brand-parchment-dark bg-transparent focus:outline-none border-b border-dashed border-transparent focus:border-gray-500 w-full mt-1 px-2"
                placeholder="Conceito do personagem..."
            />
            
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                <ClassSelector label="Classe" value={characterClass} options={availableClasses} onFieldChange={onFieldChange} />
                <StaticHeaderInput label="Raça" value={race} />
                <EditableHeaderInput label="Experiência (XP)" name="xp" value={xp} onFieldChange={onFieldChange} type="number" />
                <EditableHeaderInput label="Aniversário" name="birthday" value={birthday} onFieldChange={onFieldChange} />
                <EditableHeaderInput label="Cidade Natal" name="hometown" value={hometown} onFieldChange={onFieldChange} />
                <EditableHeaderInput label="Música Favorita" name="favoriteSong" value={favoriteSong} onFieldChange={onFieldChange} />
            </div>
        </div>
      </div>
    </header>
  );
};

export default CharacterHeader;