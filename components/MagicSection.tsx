
import React from 'react';
import type { Magic } from '../types';

interface MagicSectionProps {
  magic: Magic[];
  onAddMagic: () => void;
  onRemoveMagic: (id: string) => void;
  onMagicChange: (id: string, field: keyof Magic, value: string) => void;
}

const MagicField: React.FC<{ label: string; value: string; field: keyof Magic; spellId: string; onMagicChange: MagicSectionProps['onMagicChange']; rows?: number; }> =
({ label, value, field, spellId, onMagicChange, rows = 2}) => (
    <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80 mb-1">
            {label}
        </label>
        <textarea
            value={value}
            onChange={(e) => onMagicChange(spellId, field, e.target.value)}
            rows={rows}
            className="w-full bg-brand-parchment-dark/10 p-2 text-sm rounded border border-gray-600 focus:ring-1 focus:ring-brand-red-500 focus:border-brand-red-500 transition resize-y"
        />
    </div>
);


const MagicSpell: React.FC<{ spell: Magic; onMagicChange: MagicSectionProps['onMagicChange']; onRemoveMagic: MagicSectionProps['onRemoveMagic']; }> =
({ spell, onMagicChange, onRemoveMagic }) => {
    return (
        <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50 relative">
            <button 
                onClick={() => onRemoveMagic(spell.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-brand-red-400 transition-colors"
                title="Remover Magia"
                aria-label="Remover Magia"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                     <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80 mb-1">Nome da Magia</label>
                     <input
                        type="text"
                        value={spell.name}
                        onChange={(e) => onMagicChange(spell.id, 'name', e.target.value)}
                        className="w-full bg-transparent border-b-2 border-gray-600/70 py-1 text-xl text-brand-parchment-light font-bold focus:outline-none focus:border-brand-red-500 transition-colors"
                     />
                </div>
                <MagicField label="Requisito" value={spell.requirement} field="requirement" spellId={spell.id} onMagicChange={onMagicChange} rows={1} />
                <MagicField label="Custo" value={spell.cost} field="cost" spellId={spell.id} onMagicChange={onMagicChange} rows={1} />
                <MagicField label="Componentes" value={spell.components} field="components" spellId={spell.id} onMagicChange={onMagicChange} />
                <MagicField label="Alcance" value={spell.range} field="range" spellId={spell.id} onMagicChange={onMagicChange} rows={1} />
                <div className="md:col-span-2">
                    <MagicField label="Teste" value={spell.test} field="test" spellId={spell.id} onMagicChange={onMagicChange} />
                </div>
                <div className="md:col-span-2">
                    <MagicField label="Efeito" value={spell.effect} field="effect" spellId={spell.id} onMagicChange={onMagicChange} rows={4}/>
                </div>
                <div className="md:col-span-2">
                    <MagicField label="Observações" value={spell.notes} field="notes" spellId={spell.id} onMagicChange={onMagicChange} />
                </div>
            </div>
        </div>
    );
};


const MagicSection: React.FC<MagicSectionProps> = ({ magic, onAddMagic, onRemoveMagic, onMagicChange }) => {
    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-serif text-brand-red-400">Grimório</h2>
                <button
                    onClick={onAddMagic}
                    className="flex items-center gap-2 bg-brand-red-700/50 hover:bg-brand-red-600/60 border border-brand-red-500/50 text-brand-parchment-light font-bold py-2 px-4 rounded-lg transition-colors"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Adicionar Magia
                </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6">
                 {magic.length === 0 ? (
                    <p className="text-center text-gray-400 py-10">Nenhuma magia conhecida. Adicione uma para começar seu grimório.</p>
                ) : (
                    magic.map(spell => (
                        <MagicSpell
                            key={spell.id}
                            spell={spell}
                            onMagicChange={onMagicChange}
                            onRemoveMagic={onRemoveMagic}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default MagicSection;
