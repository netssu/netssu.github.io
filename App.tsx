
import React, { useState, useEffect, useRef } from 'react';
import type { CharacterSheetData, CharacterClass, AttributeName, Magic } from './types';
import { CLASS_DATA, CHARACTER_CLASSES } from './classData';
import CharacterHeader from './components/CharacterHeader';
import AttributeSection from './components/AttributeSection';
import StatBoxGrid from './components/StatBoxGrid';
import MagicSection from './components/MagicSection';

const initialCharacterData: CharacterSheetData = {
  name: "Caçador",
  concept: "Um caçador de monstros em um mundo sombrio",
  characterClass: 'Lutador',
  race: 'Humano',
  xp: 0,
  portraitUrl: "https://picsum.photos/seed/hunter/400/600",
  birthday: "Data desconhecida",
  hometown: "Lugar nenhum",
  favoriteSong: "Nenhuma",
  attributes: {
    'Corpo': 1,
    'Agilidade': 1,
    'Percepção': 1,
    'Inteligência': 1,
    'Presença': 1,
  },
  attributeBonuses: {},
  skills: [
    { attribute: 'Corpo', skills: [ { name: 'Corpo a Corpo', rating: 0 }, { name: 'Atletismo', rating: 0 }, { name: 'Resistência', rating: 0 }, { name: 'Força Bruta', rating: 0 } ] },
    { attribute: 'Agilidade', skills: [ { name: 'Esquiva', rating: 0 }, { name: 'Furtividade', rating: 0 }, { name: 'Prestidigitação', rating: 0 }, { name: 'Acrobacia', rating: 0 } ] },
    { attribute: 'Percepção', skills: [ { name: 'Armas de Fogo', rating: 0 }, { name: 'Pontaria de Arremesso', rating: 0 }, { name: 'Investigação', rating: 0 }, { name: 'Rastreamento', rating: 0 } ] },
    { attribute: 'Inteligência', skills: [ { name: 'Ocultismo', rating: 0 }, { name: 'Tecnologia', rating: 0 }, { name: 'Ciência', rating: 0 }, { name: 'Línguas', rating: 0 } ] },
    { attribute: 'Presença', skills: [ { name: 'Persuasão', rating: 0 }, { name: 'Intimidação', rating: 0 }, { name: 'Enganação', rating: 0 }, { name: 'Liderança', rating: 0 } ] },
  ],
  specialSkills: [
      { name: 'Lockpick', rating: 0}, { name: 'Demonologia', rating: 0},
      { name: 'Latim', rating: 0}, { name: 'Armas Exóticas', rating: 0 },
  ],
  classAbilities: CLASS_DATA['Lutador'].abilities,
  classWeakness: CLASS_DATA['Lutador'].weakness,
  resources: [ { name: 'Vida', max: 10, current: 10 }, { name: 'Vontade', max: 8, current: 8 } ],
  magic: [],
  equipment: [],
  notes: "",
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
        <button 
            onClick={() => setCurrentPage('page3')} 
            className={`px-6 py-2 font-serif text-lg transition-colors duration-200 ${currentPage === 'page3' ? 'text-brand-red-400 border-b-2 border-brand-red-400' : 'text-gray-400 hover:text-brand-parchment-light'}`}
        >
            Magias
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
  const importFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(characterData));
    } catch (error) {
        console.error("Failed to save character data to localStorage:", error);
    }
  }, [characterData]);
  
  useEffect(() => {
    const totalCorpo = (characterData.attributes['Corpo'] || 0) + (characterData.attributeBonuses?.['Corpo'] || 0);
    const newMaxHealth = (totalCorpo * 2) + 8;
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
  }, [characterData.attributes, characterData.attributeBonuses]);

  useEffect(() => {
    const DEMON_KEY_SEQUENCE = 'demonio';
    let keySequence = '';
    const handler = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
            return; 
        }
        keySequence = (keySequence + e.key.toLowerCase()).slice(-DEMON_KEY_SEQUENCE.length);

        if (keySequence === DEMON_KEY_SEQUENCE) {
            setCharacterData(prev => {
                if (prev.race === 'Demônio') {
                    const currentBonus = prev.attributeBonuses['Corpo'] || 0;
                    return {
                        ...prev,
                        race: 'Humano',
                        attributeBonuses: {
                            ...prev.attributeBonuses,
                            'Corpo': Math.max(0, currentBonus - 1),
                        }
                    };
                } else {
                    const currentBonus = prev.attributeBonuses['Corpo'] || 0;
                    return {
                        ...prev,
                        race: 'Demônio',
                        attributeBonuses: {
                            ...prev.attributeBonuses,
                            'Corpo': currentBonus + 1,
                        }
                    };
                }
            });
            keySequence = '';
        }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);


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
  
  const handleExport = () => {
    const dataStr = JSON.stringify(characterData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = characterData.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `${safeName}_sheet.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!window.confirm("Isso irá sobrescrever sua ficha atual. Deseja continuar?")) {
        // Reset file input so same file can be selected again
        if(importFileRef.current) importFileRef.current.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const importedData = JSON.parse(text);
          // Basic validation could be added here
          setCharacterData(importedData);
        }
      } catch (err) {
        console.error("Erro ao importar o arquivo:", err);
        alert("Falha ao ler o arquivo. Certifique-se de que é um arquivo de ficha válido.");
      } finally {
        if(importFileRef.current) importFileRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const handleAddMagic = () => {
    setCharacterData(prev => ({
        ...prev,
        magic: [
            ...prev.magic,
            {
                id: crypto.randomUUID(),
                name: 'Nova Magia',
                requirement: '', cost: '', components: '',
                range: '', test: '', effect: '', notes: ''
            }
        ]
    }));
  };

  const handleRemoveMagic = (id: string) => {
    setCharacterData(prev => ({
        ...prev,
        magic: prev.magic.filter(m => m.id !== id)
    }));
  };

  const handleMagicChange = (id: string, field: keyof Magic, value: string) => {
    setCharacterData(prev => ({
        ...prev,
        magic: prev.magic.map(m => m.id === id ? { ...m, [field]: value } : m)
    }));
  };
  
  const getAttributeTotal = (attr: AttributeName) => {
    return (characterData.attributes[attr] || 0) + (characterData.attributeBonuses?.[attr] || 0);
  }

  return (
    <div className="min-h-screen text-brand-parchment-light p-4 sm:p-6 lg:p-8">
      <main className="relative max-w-5xl mx-auto bg-gray-800/60 backdrop-blur-sm shadow-2xl shadow-brand-red-900/40 rounded-lg border-2 border-gray-700/50 p-6 md:p-8">
        
        <div className="absolute top-6 right-6 md:top-8 md:right-8 flex gap-4 items-center z-10">
            <input type="file" id="import-sheet" ref={importFileRef} className="hidden" onChange={handleImport} accept=".json,text/plain" />
            <button
                onClick={() => importFileRef.current?.click()}
                className="text-gray-400 hover:text-brand-parchment-light transition-colors duration-200"
                title="Importar ficha"
                aria-label="Importar ficha"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </button>
            <button
                onClick={handleExport}
                className="text-gray-400 hover:text-brand-parchment-light transition-colors duration-200"
                title="Exportar ficha"
                aria-label="Exportar ficha"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
            </button>
            <button
                onClick={handleReset}
                className="text-gray-400 hover:text-brand-red-400 transition-colors duration-200"
                title="Resetar ficha para os valores iniciais"
                aria-label="Resetar ficha"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691V5.006h-4.992v.001M19.015 4.354v4.992m0 0h-4.992m4.992 0l-3.181-3.183a8.25 8.25 0 00-11.667 0L2.985 9.348" />
                </svg>
            </button>
        </div>

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
        
        <div className="my-6">
            <StatBoxGrid resources={characterData.resources} onResourceChange={handleResourceChange} />
        </div>

        <div>
            <PageSwitcher currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>

        {currentPage === 'page1' && (
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                <div className="lg:col-span-2">
                    <AttributeSection title="Atributos" attributes={Object.entries(characterData.attributes).map(([name, rating]) => ({name, rating}))} onRatingChange={handleAttributeChange} bonuses={characterData.attributeBonuses} />
                </div>
        
                <div className="lg:col-span-3 flex flex-col gap-8">
                    <div className="bg-black/20 p-4 rounded-lg border border-gray-700/50">
                        <h2 className="text-2xl font-serif text-brand-red-400 border-b border-brand-red-700/50 pb-2 mb-3">Fraqueza de Classe</h2>
                        <h3 className="text-lg font-bold text-brand-parchment-light">{characterData.classWeakness.name}</h3>
                        <p className="text-sm text-brand-parchment-dark mt-1">{characterData.classWeakness.description}</p>
                    </div>

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
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {(['Corpo', 'Agilidade', 'Percepção', 'Inteligência', 'Presença'] as AttributeName[]).map(attrName => (
                        <AttributeSection 
                            key={attrName} 
                            title={`Perícias (${attrName})`} 
                            attributes={characterData.skills.find(g => g.attribute === attrName)?.skills || []} 
                            onRatingChange={handleSkillChange} 
                            attributeValue={getAttributeTotal(attrName)}
                            small 
                        />
                    ))}
                    <AttributeSection title="Perícias Especiais" attributes={characterData.specialSkills} onRatingChange={handleSkillChange} small />
                </div>
                 <div className="mt-8 bg-black/20 p-4 rounded-lg border border-gray-700/50 w-full">
                   <h2 className="text-xl font-serif text-brand-red-400 border-b border-brand-red-700/50 pb-2 mb-4">
                    Equipamento & Anotações
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <h3 className="font-bold uppercase text-sm tracking-wider mb-2 text-brand-parchment-dark">Equipamento</h3>
                            <textarea
                                className="w-full h-48 bg-brand-parchment-dark/10 p-2 text-sm rounded border border-gray-600 focus:ring-1 focus:ring-brand-red-500 focus:border-brand-red-500 transition resize-y"
                                value={characterData.equipment.join('\n')}
                                onChange={(e) => handleTextareaChange('equipment', e.target.value)}
                                placeholder="Liste um item por linha..."
                            />
                        </div>
                        <div>
                            <h3 className="font-bold uppercase text-sm tracking-wider mb-2 text-brand-parchment-dark">Anotações</h3>
                             <textarea
                                className="w-full h-48 bg-brand-parchment-dark/10 p-2 text-sm rounded border border-gray-600 focus:ring-1 focus:ring-brand-red-500 focus:border-brand-red-500 transition resize-y"
                                value={characterData.notes}
                                onChange={(e) => handleTextareaChange('notes', e.target.value)}
                                placeholder="Suas anotações, segredos e contatos..."
                            />
                        </div>
                   </div>
                </div>
            </>
        )}

        {currentPage === 'page3' && (
            <MagicSection
                magic={characterData.magic}
                onAddMagic={handleAddMagic}
                onRemoveMagic={handleRemoveMagic}
                onMagicChange={handleMagicChange}
            />
        )}
      </main>
    </div>
  );
};

export default App;
