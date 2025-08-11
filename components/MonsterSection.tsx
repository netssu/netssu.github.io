import React from 'react';
import type { Monster, MonsterAttack } from '../types';

interface MonsterSectionProps {
  monsters: Monster[];
  onAddMonster: () => void;
  onRemoveMonster: (id: string) => void;
  onMonsterChange: (id: string, field: keyof Omit<Monster, 'id' | 'attacks'>, value: string) => void;
  onAddAttack: (monsterId: string) => void;
  onRemoveAttack: (monsterId: string, attackId: string) => void;
  onAttackChange: (monsterId: string, attackId: string, value: string) => void;
}

const MonsterField: React.FC<{ label: string; value: string; field: keyof Omit<Monster, 'id' | 'attacks'>; monsterId: string; onMonsterChange: MonsterSectionProps['onMonsterChange']; rows?: number; placeholder?: string; }> =
({ label, value, field, monsterId, onMonsterChange, rows = 1, placeholder = ''}) => (
    <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80 mb-1">
            {label}
        </label>
        <textarea
            value={value}
            onChange={(e) => onMonsterChange(monsterId, field, e.target.value)}
            rows={rows}
            placeholder={placeholder}
            className="w-full bg-brand-parchment-dark/10 p-2 text-sm rounded border border-gray-600 focus:ring-1 focus:ring-brand-red-500 focus:border-brand-red-500 transition resize-y"
        />
    </div>
);

const MonsterEntry: React.FC<{ 
    monster: Monster; 
    onMonsterChange: MonsterSectionProps['onMonsterChange'];
    onRemoveMonster: MonsterSectionProps['onRemoveMonster'];
    onAddAttack: MonsterSectionProps['onAddAttack'];
    onRemoveAttack: MonsterSectionProps['onRemoveAttack'];
    onAttackChange: MonsterSectionProps['onAttackChange'];
}> = ({ monster, onMonsterChange, onRemoveMonster, onAddAttack, onRemoveAttack, onAttackChange }) => {
    return (
        <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50 relative">
            <button 
                onClick={() => onRemoveMonster(monster.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-brand-red-400 transition-colors"
                title="Remover Monstro"
                aria-label="Remover Monstro"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </button>
            
            <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80 mb-1">Nome do Monstro</label>
                 <input
                    type="text"
                    value={monster.name}
                    onChange={(e) => onMonsterChange(monster.id, 'name', e.target.value)}
                    className="w-full bg-transparent border-b-2 border-gray-600/70 py-1 text-xl text-brand-parchment-light font-bold focus:outline-none focus:border-brand-red-500 transition-colors"
                    placeholder='Ex: Ladrão de Ossos'
                 />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <MonsterField label="Tipo" value={monster.type} field="type" monsterId={monster.id} onMonsterChange={onMonsterChange} placeholder='Ex: Criatura Ocultista'/>
                <MonsterField label="Ameaça" value={monster.threat} field="threat" monsterId={monster.id} onMonsterChange={onMonsterChange} placeholder='Ex: Média'/>
                <MonsterField label="PV" value={monster.pv} field="pv" monsterId={monster.id} onMonsterChange={onMonsterChange} placeholder='Ex: 16'/>
                <MonsterField label="PA" value={monster.pa} field="pa" monsterId={monster.id} onMonsterChange={onMonsterChange} placeholder='Ex: 6'/>
                <MonsterField label="Atributos" value={monster.attributes} field="attributes" monsterId={monster.id} onMonsterChange={onMonsterChange} placeholder='Ex: Corpo 3, Agilidade 3...'/>
                <MonsterField label="Perícias" value={monster.skills} field="skills" monsterId={monster.id} onMonsterChange={onMonsterChange} placeholder='Ex: Luta 3, Ocultismo 2'/>
            </div>

            <div className="mt-4">
                <MonsterField label="Armadura" value={monster.armor} field="armor" monsterId={monster.id} onMonsterChange={onMonsterChange} rows={1} placeholder='Ex: AR 1 (pele dura)'/>
            </div>

            <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-red-400/80">Ataques</label>
                    <button onClick={() => onAddAttack(monster.id)} className="text-xs text-green-400 hover:text-green-300 font-semibold">+ Adicionar</button>
                </div>
                <div className="space-y-2">
                    {monster.attacks.map(attack => (
                        <div key={attack.id} className="flex items-center gap-2">
                             <textarea
                                value={attack.description}
                                onChange={(e) => onAttackChange(monster.id, attack.id, e.target.value)}
                                rows={1}
                                placeholder="Ex: Garraço | 6d6 | Dano 2"
                                className="flex-grow bg-brand-parchment-dark/10 p-2 text-sm rounded border border-gray-600 focus:ring-1 focus:ring-brand-red-500 focus:border-brand-red-500 transition resize-y"
                             />
                             <button onClick={() => onRemoveAttack(monster.id, attack.id)} className="text-gray-500 hover:text-red-400" title="Remover Ataque">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                             </button>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-4">
                <MonsterField label="Reações" value={monster.reactions} field="reactions" monsterId={monster.id} onMonsterChange={onMonsterChange} rows={1} placeholder='Ex: Esquiva 2 PA'/>
            </div>
            <div className="mt-4">
                <MonsterField label="Habilidades Especiais" value={monster.specialAbilities} field="specialAbilities" monsterId={monster.id} onMonsterChange={onMonsterChange} rows={3} placeholder='Liste as habilidades...'/>
            </div>
            <div className="mt-4">
                <MonsterField label="Fraquezas" value={monster.weaknesses} field="weaknesses" monsterId={monster.id} onMonsterChange={onMonsterChange} rows={2} placeholder='Liste as fraquezas...'/>
            </div>
            <div className="mt-4">
                <MonsterField label="IA Básica / Comportamento" value={monster.behavior} field="behavior" monsterId={monster.id} onMonsterChange={onMonsterChange} rows={3} placeholder='Descreva o comportamento...'/>
            </div>
            <div className="mt-4">
                <MonsterField label="Saque" value={monster.loot} field="loot" monsterId={monster.id} onMonsterChange={onMonsterChange} rows={2} placeholder='Liste os saques possíveis...'/>
            </div>
        </div>
    );
};


const MonsterSection: React.FC<MonsterSectionProps> = ({ monsters, onAddMonster, onRemoveMonster, onMonsterChange, onAddAttack, onRemoveAttack, onAttackChange }) => {
    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-serif text-brand-red-400">Bestiário</h2>
                <button
                    onClick={onAddMonster}
                    className="flex items-center gap-2 bg-brand-red-700/50 hover:bg-brand-red-600/60 border border-brand-red-500/50 text-brand-parchment-light font-bold py-2 px-4 rounded-lg transition-colors"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Adicionar Monstro
                </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6">
                 {monsters.length === 0 ? (
                    <p className="text-center text-gray-400 py-10">Nenhum monstro catalogado. Adicione uma criatura para começar seu bestiário.</p>
                ) : (
                    monsters.map(monster => (
                        <MonsterEntry
                            key={monster.id}
                            monster={monster}
                            onMonsterChange={onMonsterChange}
                            onRemoveMonster={onRemoveMonster}
                            onAddAttack={onAddAttack}
                            onRemoveAttack={onRemoveAttack}
                            onAttackChange={onAttackChange}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default MonsterSection;