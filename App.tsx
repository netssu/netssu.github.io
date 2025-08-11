
import React, { useState, useEffect, useRef } from 'react';
import type { CharacterSheetData, CharacterClass, AttributeName, Magic, Weapon, SkillName, SpecialSkillName, BackgroundName, Skill, Armor, VestType, Monster } from './types';
import { CLASS_DATA, CHARACTER_CLASSES } from './classData';
import { BACKGROUNDS_DATA, BACKGROUND_NAMES } from './backgroundData';
import { ADVANTAGES_LIST, DISADVANTAGES_LIST } from './advantagesData';
import CharacterHeader from './components/CharacterHeader';
import AttributeSection from './components/AttributeSection';
import StatBoxGrid from './components/StatBoxGrid';
import MagicSection from './components/MagicSection';
import WeaponSection from './components/WeaponSection';
import ArmorSection from './components/ArmorSection';
import MonsterSection from './components/MonsterSection';
import AdvantagesSection from './components/AdvantagesSection';

const initialCharacterData: CharacterSheetData = {
  name: "Caçador",
  concept: "Um caçador de monstros em um mundo sombrio",
  characterClass: 'Lutador',
  background: 'Nenhum',
  race: 'Humano',
  xp: 0,
  money: "0",
  portraitUrl: "https://picsum.photos/seed/hunter/400/600",
  birthday: "Data desconhecida",
  hometown: "Lugar nenhum",
  favoriteSong: "Nenhuma",
  attributes: { 'Corpo': 1, 'Agilidade': 1, 'Percepção': 1, 'Inteligência': 1, 'Presença': 1 },
  attributeBonuses: { 'Corpo': 1 },
  skills: [
    { attribute: 'Corpo', skills: [ { name: 'Corpo a Corpo', rating: 0, classBonus: true }, { name: 'Atletismo', rating: 0, classBonus: true }, { name: 'Resistência', rating: 0 }, { name: 'Força Bruta', rating: 0 } ] },
    { attribute: 'Agilidade', skills: [ { name: 'Esquiva', rating: 0 }, { name: 'Furtividade', rating: 0 }, { name: 'Prestidigitação', rating: 0 }, { name: 'Acrobacia', rating: 0 } ] },
    { attribute: 'Percepção', skills: [ { name: 'Armas de Fogo', rating: 0 }, { name: 'Pontaria de Arremesso', rating: 0 }, { name: 'Investigação', rating: 0 }, { name: 'Rastreamento', rating: 0 } ] },
    { attribute: 'Inteligência', skills: [ { name: 'Ocultismo', rating: 0 }, { name: 'Tecnologia', rating: 0 }, { name: 'Ciência', rating: 0 }, { name: 'Línguas', rating: 0 } ] },
    { attribute: 'Presença', skills: [ { name: 'Persuasão', rating: 0 }, { name: 'Intimidação', rating: 0 }, { name: 'Enganação', rating: 0 }, { name: 'Liderança', rating: 0 } ] },
  ],
  specialSkills: [
      { name: 'Lockpick', rating: 0 }, { name: 'Demonologia', rating: 0 },
      { name: 'Latim', rating: 0 }, { name: 'Armas Exóticas', rating: 0 },
      { name: 'Sobrevivência', rating: 0 }, { name: 'Contatos', rating: 0 },
      { name: 'Ofício (Ferramentas)', rating: 0 },
  ],
  classAbilities: CLASS_DATA['Lutador'].abilities,
  classWeakness: CLASS_DATA['Lutador'].weakness,
  resources: [ { name: 'Vida', max: 10, current: 10 }, { name: 'Vontade', max: 8, current: 8 } ],
  magic: [],
  weapons: [],
  equipment: [],
  notes: "",
  armor: { vest: 'Nenhum', helmet: false },
  advantages: [],
  disadvantages: [],
  monsters: [],
  showMonsters: false,
};


const LOCAL_STORAGE_KEY = 'dnd-darkness-character-sheet';

const PageSwitcher: React.FC<{ currentPage: string; setCurrentPage: (page: string) => void; showMonsters: boolean }> = ({ currentPage, setCurrentPage, showMonsters }) => {
    const pages = [
        { key: 'main', label: 'Ficha Principal' },
        { key: 'skills', label: 'Perícias & Inventário' },
        { key: 'advantages', label: 'Vantagens' },
        { key: 'magic', label: 'Magias' },
    ];
    if (showMonsters) {
        pages.push({ key: 'monsters', label: 'Monstros' });
    }

    return (
        <div className="flex justify-center border-b-2 border-gray-700 flex-wrap">
            {pages.map(page => (
                <button
                    key={page.key}
                    onClick={() => setCurrentPage(page.key)}
                    className={`px-4 sm:px-6 py-2 font-serif text-base sm:text-lg transition-colors duration-200 ${currentPage === page.key ? 'text-brand-red-400 border-b-2 border-brand-red-400' : 'text-gray-400 hover:text-brand-parchment-light'}`}
                >
                    {page.label}
                </button>
            ))}
        </div>
    );
};

const App: React.FC = () => {
  const [characterData, setCharacterData] = useState<CharacterSheetData>(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        // Ensure new fields exist on old data
        const parsed = JSON.parse(savedData);
        return { ...initialCharacterData, ...parsed };
      }
    } catch (error) {
      console.error("Failed to load or parse character data from localStorage:", error);
    }
    return initialCharacterData;
  });

  const [currentPage, setCurrentPage] = useState('main');
  const [skillChoice, setSkillChoice] = useState<{ background: BackgroundName; options: string[] } | null>(null);
  const importFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(characterData));
    } catch (error) {
        console.error("Failed to save character data to localStorage:", error);
    }
  }, [characterData]);
  
  const getAttributeModifiers = () => {
    const modifiers: Partial<Record<AttributeName, number>> = { ...characterData.attributeBonuses };
    const { armor, attributes } = characterData;
  
    if (armor.vest === 'Pesado') {
        modifiers['Agilidade'] = (modifiers['Agilidade'] || 0) - 1;
        if (attributes['Corpo'] < 3) {
            modifiers['Agilidade'] = (modifiers['Agilidade'] || 0) - 1;
        }
    }
    if (armor.helmet) {
        modifiers['Percepção'] = (modifiers['Percepção'] || 0) - 1;
    }
  
    return modifiers;
  };
  
  const attributeModifiers = getAttributeModifiers();

  const getAttributeTotal = (attr: AttributeName) => {
    return (characterData.attributes[attr] || 0) + (attributeModifiers[attr] || 0);
  }

  useEffect(() => {
    const totalCorpo = getAttributeTotal('Corpo');
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
  }, [characterData.attributes, characterData.attributeBonuses, characterData.armor]);

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
                    return { ...prev, race: 'Humano', attributeBonuses: { ...prev.attributeBonuses, 'Corpo': Math.max(0, currentBonus - 1) } };
                } else {
                    const currentBonus = prev.attributeBonuses['Corpo'] || 0;
                    return { ...prev, race: 'Demônio', attributeBonuses: { ...prev.attributeBonuses, 'Corpo': currentBonus + 1 } };
                }
            });
            keySequence = '';
        }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const MONSTER_KEY_SEQUENCE = 'monstro';
    let keySequence = '';
    const handler = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
            return; 
        }
        keySequence = (keySequence + e.key.toLowerCase()).slice(-MONSTER_KEY_SEQUENCE.length);

        if (keySequence === MONSTER_KEY_SEQUENCE) {
            setCharacterData(prev => {
                const showing = !prev.showMonsters;
                if (!showing && currentPage === 'monsters') {
                    setCurrentPage('main');
                }
                return { ...prev, showMonsters: showing };
            });
            keySequence = '';
        }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentPage]);

  const applyBackgroundChange = (backgroundName: BackgroundName, skillToMaster: SkillName | SpecialSkillName | null) => {
    setCharacterData(prev => {
      const resetMastery = (skill: Skill) => ({ ...skill, mastered: false });
      const skillsCleared = prev.skills.map(group => ({ ...group, skills: group.skills.map(resetMastery) }));
      const specialSkillsCleared = prev.specialSkills.map(resetMastery);
      
      let finalSkills = skillsCleared;
      let finalSpecialSkills = specialSkillsCleared;

      if (skillToMaster) {
          finalSkills = skillsCleared.map(group => ({ 
              ...group, 
              skills: group.skills.map(skill => 
                  skill.name === skillToMaster ? { ...skill, mastered: true, trained: false } : skill
              ) 
          }));
          finalSpecialSkills = specialSkillsCleared.map(skill => 
              skill.name === skillToMaster ? { ...skill, mastered: true, trained: false } : skill
          );
      }

      return { ...prev, background: backgroundName, skills: finalSkills, specialSkills: finalSpecialSkills };
    });
  };

  const handleBackgroundChange = (newBackgroundName: BackgroundName) => {
    if (newBackgroundName === 'Nenhum') { applyBackgroundChange('Nenhum', null); return; }
    const backgroundData = BACKGROUNDS_DATA[newBackgroundName];
    if (!backgroundData) return;
    if (Array.isArray(backgroundData.trainedSkill)) {
        setSkillChoice({ background: newBackgroundName, options: backgroundData.trainedSkill as string[] });
    } else {
        applyBackgroundChange(newBackgroundName, backgroundData.trainedSkill as any);
    }
  };

  const handleSkillChoice = (chosenSkill: SkillName | SpecialSkillName | null) => {
    if (!skillChoice) return;
    const backgroundName = skillChoice.background;
    setSkillChoice(null);
    if (!chosenSkill) return; 
    applyBackgroundChange(backgroundName, chosenSkill);
  };
  
  const handleFieldChange = (field: keyof CharacterSheetData, value: any) => {
    if (field === 'characterClass') {
        const newClass = value as CharacterClass;
        const newClassData = CLASS_DATA[newClass];
        setCharacterData(prev => {
            const oldClassData = CLASS_DATA[prev.characterClass];
            let newAttributeBonuses = { ...prev.attributeBonuses };

            // Reset previous class attribute bonus, but keep other bonuses (like race)
            const oldBonusAttr = oldClassData.bonuses.attribute;
            if (newAttributeBonuses[oldBonusAttr]) {
                 newAttributeBonuses[oldBonusAttr] = (newAttributeBonuses[oldBonusAttr] || 0) - 1;
            }
            if (newAttributeBonuses[oldBonusAttr] === 0) delete newAttributeBonuses[oldBonusAttr];

            // Apply new class attribute bonus
            const newBonusAttr = newClassData.bonuses.attribute;
            newAttributeBonuses[newBonusAttr] = (newAttributeBonuses[newBonusAttr] || 0) + 1;

            const updateSkillClassBonus = (skill: Skill) => ({
                ...skill,
                classBonus: newClassData.bonuses.skills.includes(skill.name as any)
            });

            return {
                ...prev,
                characterClass: newClass,
                classAbilities: newClassData.abilities,
                classWeakness: newClassData.weakness,
                attributeBonuses: newAttributeBonuses,
                skills: prev.skills.map(g => ({ ...g, skills: g.skills.map(updateSkillClassBonus) })),
                specialSkills: prev.specialSkills.map(updateSkillClassBonus),
            };
        });
    } else if (field === 'background') {
        handleBackgroundChange(value as BackgroundName);
    } else {
        setCharacterData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleAttributeChange = (name: string, rating: number) => {
    setCharacterData(prev => ({
        ...prev,
        attributes: { ...prev.attributes, [name as keyof typeof prev.attributes]: rating }
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

  const handleSkillTrainToggle = (skillName: SkillName | SpecialSkillName) => {
    setCharacterData(prev => ({
        ...prev,
        skills: prev.skills.map(group => ({
            ...group,
            skills: group.skills.map(skill => skill.name === skillName ? { ...skill, trained: !skill.trained } : skill)
        })),
        specialSkills: prev.specialSkills.map(skill => skill.name === skillName ? { ...skill, trained: !skill.trained } : skill)
    }));
  };
  
  const handleResourceChange = (name: string, newCurrent: number) => {
      setCharacterData(prev => ({ ...prev, resources: prev.resources.map(res => res.name === name ? {...res, current: newCurrent} : res) }))
  }

  const handleArmorChange = (part: 'vest' | 'helmet', value: VestType | boolean) => {
    setCharacterData(prev => ({ ...prev, armor: { ...prev.armor, [part]: value } }));
  }

  const handleTextareaChange = (field: 'equipment' | 'notes', value: string) => {
    if (field === 'equipment') {
      setCharacterData(prev => ({ ...prev, equipment: value.split('\n') }));
    } else {
      setCharacterData(prev => ({ ...prev, notes: value }));
    }
  };

  const handleAdvantageToggle = (name: string) => {
    setCharacterData(prev => {
        const newAdvantages = prev.advantages.includes(name)
            ? prev.advantages.filter(a => a !== name)
            : [...prev.advantages, name];
        return { ...prev, advantages: newAdvantages };
    });
  };

  const handleDisadvantageToggle = (name: string) => {
    setCharacterData(prev => {
        const newDisadvantages = prev.disadvantages.includes(name)
            ? prev.disadvantages.filter(d => d !== name)
            : [...prev.disadvantages, name];
        return { ...prev, disadvantages: newDisadvantages };
    });
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
    if (!window.confirm("Isso irá sobrescrever sua ficha atual. Deseja continuar?")) { if(importFileRef.current) importFileRef.current.value = ""; return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const importedData = JSON.parse(text);
          setCharacterData(importedData);
        }
      } catch (err) {
        console.error("Erro ao importar o arquivo:", err);
        alert("Falha ao ler o arquivo. Certifique-se de que é um arquivo de ficha válido.");
      } finally { if(importFileRef.current) importFileRef.current.value = ""; }
    };
    reader.readAsText(file);
  };

  const handleAddMagic = () => { setCharacterData(prev => ({ ...prev, magic: [ ...prev.magic, { id: crypto.randomUUID(), name: 'Nova Magia', requirement: '', cost: '', components: '', range: '', test: '', effect: '', notes: '' } ] })); };
  const handleRemoveMagic = (id: string) => { setCharacterData(prev => ({ ...prev, magic: prev.magic.filter(m => m.id !== id) })); };
  const handleMagicChange = (id: string, field: keyof Magic, value: string) => { setCharacterData(prev => ({ ...prev, magic: prev.magic.map(m => m.id === id ? { ...m, [field]: value } : m) })); };
  const handleAddWeapon = () => { setCharacterData(prev => ({ ...prev, weapons: [ ...prev.weapons, { id: crypto.randomUUID(), name: 'Nova Arma', damage: '', type: '', properties: '', capacity: '' } ] })); };
  const handleRemoveWeapon = (id: string) => { setCharacterData(prev => ({ ...prev, weapons: prev.weapons.filter(w => w.id !== id) })); };
  const handleWeaponChange = (id: string, field: keyof Weapon, value: string) => { setCharacterData(prev => ({ ...prev, weapons: prev.weapons.map(w => w.id === id ? { ...w, [field]: value } : w) })); };
  
  // Monster Handlers
  const handleAddMonster = () => {
    setCharacterData(prev => ({
      ...prev,
      monsters: [
        ...prev.monsters,
        {
          id: crypto.randomUUID(),
          name: 'Novo Monstro', type: '', threat: '', pv: '', pa: '',
          attributes: '', skills: '', armor: '', attacks: [], reactions: '',
          specialAbilities: '', weaknesses: '', behavior: '', loot: '',
        }
      ]
    }));
  };
  const handleRemoveMonster = (id: string) => { setCharacterData(prev => ({ ...prev, monsters: prev.monsters.filter(m => m.id !== id) })); };
  const handleMonsterChange = (id: string, field: keyof Omit<Monster, 'id' | 'attacks'>, value: string) => {
      setCharacterData(prev => ({
          ...prev,
          monsters: prev.monsters.map(m => m.id === id ? { ...m, [field]: value } : m)
      }));
  };
  const handleAddMonsterAttack = (monsterId: string) => {
    setCharacterData(prev => ({
      ...prev,
      monsters: prev.monsters.map(m => 
        m.id === monsterId ? { ...m, attacks: [...m.attacks, { id: crypto.randomUUID(), description: '' }] } : m
      )
    }));
  };
  const handleRemoveMonsterAttack = (monsterId: string, attackId: string) => {
    setCharacterData(prev => ({
      ...prev,
      monsters: prev.monsters.map(m =>
        m.id === monsterId ? { ...m, attacks: m.attacks.filter(a => a.id !== attackId) } : m
      )
    }));
  };
  const handleMonsterAttackChange = (monsterId: string, attackId: string, value: string) => {
    setCharacterData(prev => ({
      ...prev,
      monsters: prev.monsters.map(m =>
        m.id === monsterId ? {
          ...m,
          attacks: m.attacks.map(a => a.id === attackId ? { ...a, description: value } : a)
        } : m
      )
    }));
  };
  
  const initiative = getAttributeTotal('Agilidade') + getAttributeTotal('Percepção');

  return (
    <div className="min-h-screen text-brand-parchment-light p-4 sm:p-6 lg:p-8">
       {skillChoice && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border-2 border-brand-red-700 p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
                <h2 className="text-xl font-serif text-brand-red-400 mb-1">Escolha de Perícia</h2>
                <p className="text-brand-parchment-dark mb-6">Seu antecedente <span className="font-bold text-brand-parchment-light">{skillChoice.background}</span> lhe concede treinamento em uma das perícias abaixo.</p>
                <div className="space-y-3">
                    {skillChoice.options.map(option => ( <button key={option} onClick={() => handleSkillChoice(option as any)} className="w-full text-left p-3 bg-black/20 rounded-md border border-gray-600 hover:bg-brand-red-700/50 hover:border-brand-red-500 transition-colors">{option}</button>))}
                </div>
                <button onClick={() => handleSkillChoice(null)} className="w-full text-center mt-6 p-2 text-gray-400 hover:text-brand-parchment-light transition-colors">Cancelar</button>
            </div>
        </div>
        )}
      <main className="relative max-w-5xl mx-auto bg-gray-800/60 backdrop-blur-sm shadow-2xl shadow-brand-red-900/40 rounded-lg border-2 border-gray-700/50 p-6 md:p-8">
        <div className="absolute top-6 right-6 md:top-8 md:right-8 flex gap-4 items-center z-10">
            <input type="file" id="import-sheet" ref={importFileRef} className="hidden" onChange={handleImport} accept=".json,text/plain" />
            <button onClick={() => importFileRef.current?.click()} className="text-gray-400 hover:text-brand-parchment-light transition-colors duration-200" title="Importar ficha" aria-label="Importar ficha">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            </button>
            <button onClick={handleExport} className="text-gray-400 hover:text-brand-parchment-light transition-colors duration-200" title="Exportar ficha" aria-label="Exportar ficha">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
            </button>
            <button onClick={handleReset} className="text-gray-400 hover:text-brand-red-400 transition-colors duration-200" title="Resetar ficha para os valores iniciais" aria-label="Resetar ficha">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691V5.006h-4.992v.001M19.015 4.354v4.992m0 0h-4.992m4.992 0l-3.181-3.183a8.25 8.25 0 00-11.667 0L2.985 9.348" /></svg>
            </button>
        </div>

        <CharacterHeader 
          name={characterData.name} 
          concept={characterData.concept} 
          characterClass={characterData.characterClass}
          availableClasses={CHARACTER_CLASSES}
          background={characterData.background}
          availableBackgrounds={BACKGROUND_NAMES}
          race={characterData.race}
          xp={characterData.xp}
          money={characterData.money}
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
            <PageSwitcher currentPage={currentPage} setCurrentPage={setCurrentPage} showMonsters={characterData.showMonsters} />
        </div>

        {currentPage === 'main' && (
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                <div className="lg:col-span-2">
                    <AttributeSection title="Atributos" attributes={Object.entries(characterData.attributes).map(([name, rating]) => ({name, rating}))} onRatingChange={handleAttributeChange} bonuses={attributeModifiers} />
                </div>
        
                <div className="lg:col-span-3 flex flex-col gap-8">
                    <div className="bg-black/20 p-4 rounded-lg border border-gray-700/50">
                        <h2 className="text-2xl font-serif text-brand-red-400 pb-2 mb-2 flex justify-between items-center">
                            <span>Iniciativa</span>
                             <span className="bg-brand-red-500/80 text-brand-parchment-light font-bold text-xl rounded-md w-12 h-10 inline-flex items-center justify-center">
                                {initiative}
                            </span>
                        </h2>
                    </div>

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

        {currentPage === 'skills' && (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {(['Corpo', 'Agilidade', 'Percepção', 'Inteligência', 'Presença'] as AttributeName[]).map(attrName => (
                        <AttributeSection 
                            key={attrName} 
                            title={`Perícias (${attrName})`} 
                            attributes={characterData.skills.find(g => g.attribute === attrName)?.skills || []} 
                            onRatingChange={handleSkillChange} 
                            onSkillTrainToggle={handleSkillTrainToggle}
                            attributeValue={getAttributeTotal(attrName)}
                            small 
                        />
                    ))}
                    <AttributeSection title="Perícias Especiais" attributes={characterData.specialSkills} onRatingChange={handleSkillChange} onSkillTrainToggle={handleSkillTrainToggle} small />
                </div>
                
                <ArmorSection
                    armor={characterData.armor}
                    characterCorpo={characterData.attributes['Corpo']}
                    onArmorChange={handleArmorChange}
                />

                <WeaponSection
                    weapons={characterData.weapons}
                    onAddWeapon={handleAddWeapon}
                    onRemoveWeapon={handleRemoveWeapon}
                    onWeaponChange={handleWeaponChange}
                />

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

        {currentPage === 'advantages' && (
            <AdvantagesSection
                advantages={ADVANTAGES_LIST}
                disadvantages={DISADVANTAGES_LIST}
                selectedAdvantages={characterData.advantages}
                selectedDisadvantages={characterData.disadvantages}
                onAdvantageToggle={handleAdvantageToggle}
                onDisadvantageToggle={handleDisadvantageToggle}
            />
        )}

        {currentPage === 'magic' && (
            <MagicSection
                magic={characterData.magic}
                onAddMagic={handleAddMagic}
                onRemoveMagic={handleRemoveMagic}
                onMagicChange={handleMagicChange}
            />
        )}

        {currentPage === 'monsters' && (
            <MonsterSection
                monsters={characterData.monsters}
                onAddMonster={handleAddMonster}
                onRemoveMonster={handleRemoveMonster}
                onMonsterChange={handleMonsterChange}
                onAddAttack={handleAddMonsterAttack}
                onRemoveAttack={handleRemoveMonsterAttack}
                onAttackChange={handleMonsterAttackChange}
            />
        )}
      </main>
    </div>
  );
};

export default App;
