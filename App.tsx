
import React, { useState, useEffect } from 'react';
import type { CharacterSheetData, CharacterClass } from './types';
import { CLASS_DATA, CHARACTER_CLASSES } from './classData';
import CharacterHeader from './components/CharacterHeader';
import AttributeSection from './components/AttributeSection';
import StatBoxGrid from './components/StatBoxGrid';

const initialCharacterData: CharacterSheetData = {
  name: "Kaelen 'Carcaju' Rook",
  concept: "Ex-militar que virou caçador após um encontro traumático",
  characterClass: 'Lutador',
  race: 'Humano',
  xp: 12,
  portraitUrl: "https://picsum.photos/seed/kaelen-rook/400/600",
  birthday: "13 de Outubro",
  hometown: "Vila Perdida",
  favoriteSong: "The Sound of Silence",
  attributes: {
    'Corpo': 4,
    'Agilidade': 3,
    'Percepção': 2,
    'Inteligência': 2,
    'Presença': 3,
  },
  skills: [
    {
      attribute: 'Corpo',
      skills: [
        { name: 'Corpo a Corpo', rating: 3 },
        { name: 'Atletismo', rating: 2 },
        { name: 'Resistência', rating: 2 },
        { name: 'Força Bruta', rating: 1 },
      ],
    },
    {
      attribute: 'Agilidade',
      skills: [
        { name: 'Esquiva', rating: 2 },
        { name: 'Furtividade', rating: 1 },
        { name: 'Prestidigitação', rating: 0 },
        { name: 'Acrobacia', rating: 1 },
      ],
    },
     {
      attribute: 'Percepção',
      skills: [
        { name: 'Armas de Fogo', rating: 1 },
        { name: 'Pontaria de Arremesso', rating: 2 },
        { name: 'Investigação', rating: 1 },
        { name: 'Rastreamento', rating: 0 },
      ],
    },
     {
      attribute: 'Inteligência',
      skills: [
        { name: 'Ocultismo', rating: 1 },
        { name: 'Tecnologia', rating: 0 },
        { name: 'Ciência', rating: 0 },
        { name: 'Línguas', rating: 0 },
      ],
    },
     {
      attribute: 'Presença',
      skills: [
        { name: 'Persuasão', rating: 1 },
        { name: 'Intimidação', rating: 2 },
        { name: 'Enganação', rating: 1 },
        { name: 'Liderança', rating: 0 },
      ],
    },
  ],
  specialSkills: [
      { name: 'Lockpick', rating: 1},
      { name: 'Demonologia', rating: 0},
      { name: 'Latim', rating: 0},
      { name: 'Armas Exóticas', rating: 0 },
  ],
  classAbilities: CLASS_DATA['Lutador'].abilities,
  classWeakness: CLASS_DATA['Lutador'].weakness,
  resources: [
      { name: 'Vida', max: 18, current: 18 },
      { name: 'Vontade', max: 8, current: 8 },
  ],
  equipment: ["Faca de combate", "Jaqueta de couro reforçada (AR 1)", "Kit de primeiros socorros", "Lanterna", "Isqueiro Zippo"],
  notes: "Assombrado pela perda de seu esquadrão para uma criatura desconhecida. Busca respostas e vingança. Desconfiado, mas leal a quem ganha seu respeito.",
};

const LOCAL_STORAGE_KEY = 'dnd-darkness-character-sheet';

const PageSwitcher: React.FC<{ currentPage: string; setCurrentPage: (page: string) => void }> = ({ currentPage, setCurrentPage }) => (
    <div className="flex justify-center border-b-2 border-gray-700">
        <button 
            onClick={() => setCurrentPage('page1')} 
            className={`px-6 py-2 font-serif text-lg transition-colors duration-200 ${currentPage === 'page1' ? 'text-brand-red-400 border-b-2 border-brand-red-400' : 'text-gray-400 hover:text-brand-parchment-light'}`}
        >
            Ficha Principal
        </button>
        <button 
            onClick={() => setCurrentPage('page2')} 
            className={`px-6 py-2 font-serif text-lg transition-colors duration-200 ${currentPage === 'page2' ? 'text-brand-red-400 border-b-2 border-brand-red-400' : 'text-gray-400 hover:text-brand-parchment-light'}`}
        >
            Perícias & Inventário
        </button>
    </div>
);

const App: React.FC = () => {
  const [characterData, setCharacterData] = useState<CharacterSheetData>(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error("Failed to load or parse character data from localStorage:", error);
    }
    return initialCharacterData;
  });

  const [currentPage, setCurrentPage] = useState('page1');

  useEffect(() => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(characterData));
    } catch (error) {
        console.error("Failed to save character data to localStorage:", error);
    }
  }, [characterData]);
  
  useEffect(() => {
    const newMaxHealth = (characterData.attributes['Corpo'] * 2) + 8;
    setCharacterData(prev => {
        const lifeResource = prev.resources.find(r => r.name === 'Vida');
        if (lifeResource && lifeResource.max !== newMaxHealth) {
            const updatedLifeResource = {
                ...lifeResource,
                max: newMaxHealth,
                current: Math.min(lifeResource.current, newMaxHealth)
            };
            return {
                ...prev,
                resources: prev.resources.map(r => r.name === 'Vida' ? updatedLifeResource : r)
            };
        }
        return prev;
    });
  }, [characterData.attributes['Corpo']]);

  const handleFieldChange = (field: keyof CharacterSheetData, value: any) => {
    if (field === 'characterClass') {
        const newClass = value as CharacterClass;
        const newClassData = CLASS_DATA[newClass];
        setCharacterData(prev => ({
            ...prev,
            characterClass: newClass,
            classAbilities: newClassData.abilities,
            classWeakness: newClassData.weakness,
        }));
    } else {
        setCharacterData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleAttributeChange = (name: string, rating: number) => {
    setCharacterData(prev => ({
        ...prev,
        attributes: {
            ...prev.attributes,
            [name as keyof typeof prev.attributes]: rating,
        }
    }));
  };
  
  const handleSkillChange = (name: string, rating: number) => {
      setCharacterData(prev => ({
          ...prev,
          skills: prev.skills.map(group => ({
              ...group,
              skills: group.skills.map(skill => skill.name === name ? {...skill, rating} : skill)
          })),
          specialSkills: prev.specialSkills.map(skill => skill.name === name ? {...skill, rating} : skill)
      }))
  }
  
  const handleResourceChange = (name: string, newCurrent: number) => {
      setCharacterData(prev => ({
          ...prev,
          resources: prev.resources.map(res => res.name === name ? {...res, current: newCurrent} : res)
      }))
  }

  const handleTextareaChange = (field: 'equipment' | 'notes', value: string) => {
    if (field === 'equipment') {
      setCharacterData(prev => ({ ...prev, equipment: value.split('\n') }));
    } else {
      setCharacterData(prev => ({ ...prev, notes: value }));
    }
  };

  const handleReset = () => {
    if (window.confirm("Tem certeza de que deseja resetar a ficha? Todas as suas alterações serão perdidas.")) {
      setCharacterData(initialCharacterData);
    }
  };


  return (
    <div className="min-h-screen text-brand-parchment-light p-4 sm:p-6 lg:p-8">
      <main className="max-w-5xl mx-auto bg-gray-800/60 backdrop-blur-sm shadow-2xl shadow-brand-red-900/40 rounded-lg border-2 border-gray-700/50 p-6 md:p-8">
        <CharacterHeader 
          name={characterData.name} 
          concept={characterData.concept} 
          characterClass={characterData.characterClass}
          availableClasses={CHARACTER_CLASSES}
          race={characterData.race}
          xp={characterData.xp}
          portraitUrl={characterData.portraitUrl}
          birthday={characterData.birthday}
          hometown={characterData.hometown}
          favoriteSong={characterData.favoriteSong}
          onFieldChange={handleFieldChange}
        />
        
        <div className="relative">
            <PageSwitcher currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <button
                onClick={handleReset}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-sans text-gray-400 hover:text-brand-red-400 border border-gray-600 hover:border-brand-red-500 rounded-full px-3 py-1 transition-colors duration-200"
                title="Resetar ficha para os valores iniciais"
            >
                Resetar
            </button>
        </div>


        {currentPage === 'page1' && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col gap-8">
                <AttributeSection title="Atributos" attributes={Object.entries(characterData.attributes).map(([name, rating]) => ({name, rating}))} onRatingChange={handleAttributeChange} />
                <StatBoxGrid resources={characterData.resources} onResourceChange={handleResourceChange} />
              </div>
    
              <div className="flex flex-col gap-8">
                 <div className="bg-black/20 p-4 rounded-lg border border-gray-700/50">
                    <h2 className="text-2xl font-serif text-brand-red-400 border-b border-brand-red-700/50 pb-2 mb-3">Fraqueza de Classe</h2>
                    <h3 className="text-lg font-bold text-brand-parchment-light">{characterData.classWeakness.name}</h3>
                    <p className="text-sm text-brand-parchment-dark mt-1">{characterData.classWeakness.description}</p>
                </div>
              </div>
    
              <div className="flex flex-col gap-8">
                 <div className="bg-black/20 p-4 rounded-lg border border-gray-700/50">
                    <h2 className="text-2xl font-serif text-brand-red-400 border-b border-brand-red-700/50 pb-2 mb-3">Habilidades de Classe</h2>
                    <div className="space-y-4">
                        {characterData.classAbilities.map(ability => (
                            <div key={ability.name}>
                                <h3 className="font-bold text-brand-parchment-light flex justify-between items-baseline">
                                    <span>{ability.name}</span>
                                    <span className="text-xs font-sans uppercase tracking-widest text-brand-red-400/80">{ability.type}{ability.cost ? ` (${ability.cost})` : ''}</span>
                                </h3>
                                <p className="text-sm text-brand-parchment-dark mt-1">{ability.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
        )}

        {currentPage === 'page2' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col gap-6">
                    {characterData.skills.slice(0, 2).map(group => (
                      <AttributeSection 
                        key={group.attribute} 
                        title={`Perícias (${group.attribute})`} 
                        attributes={group.skills} 
                        onRatingChange={handleSkillChange} 
                        attributeValue={characterData.attributes[group.attribute]}
                        small 
                      />
                    ))}
                </div>

                <div className="flex flex-col gap-6">
                    {characterData.skills.slice(2, 4).map(group => (
                        <AttributeSection 
                          key={group.attribute} 
                          title={`Perícias (${group.attribute})`} 
                          attributes={group.skills} 
                          onRatingChange={handleSkillChange} 
                          attributeValue={characterData.attributes[group.attribute]}
                          small 
                        />
                    ))}
                </div>

                <div className="flex flex-col gap-6">
                    {characterData.skills.slice(4, 5).map(group => (
                        <AttributeSection 
                          key={group.attribute} 
                          title={`Perícias (${group.attribute})`} 
                          attributes={group.skills} 
                          onRatingChange={handleSkillChange} 
                          attributeValue={characterData.attributes[group.attribute]}
                          small 
                        />
                    ))}
                    <AttributeSection title="Perícias Especiais" attributes={characterData.specialSkills} onRatingChange={handleSkillChange} small />
                     <div className="bg-black/20 p-4 rounded-lg border border-gray-700/50 h-full">
                       <h2 className="text-xl font-serif text-brand-red-400 border-b border-brand-red-700/50 pb-2 mb-3">
                        Equipamento & Anotações
                       </h2>
                       <div className="text-brand-parchment-dark space-y-2">
                            <h3 className="font-bold uppercase text-sm tracking-wider">Equipamento</h3>
                            <textarea
                                className="w-full h-24 bg-brand-parchment-dark/10 p-2 text-sm rounded border border-gray-600 focus:ring-1 focus:ring-brand-red-500 focus:border-brand-red-500 transition"
                                value={characterData.equipment.join('\n')}
                                onChange={(e) => handleTextareaChange('equipment', e.target.value)}
                            />
                            <h3 className="font-bold uppercase text-sm tracking-wider pt-3">Anotações</h3>
                             <textarea
                                className="w-full h-32 bg-brand-parchment-dark/10 p-2 text-sm rounded border border-gray-600 focus:ring-1 focus:ring-brand-red-500 focus:border-brand-red-500 transition"
                                value={characterData.notes}
                                onChange={(e) => handleTextareaChange('notes', e.target.value)}
                            />
                       </div>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;
