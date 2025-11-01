import React from 'react';
import type { Weapon } from '../types';

interface WeaponSectionProps {
  weapons: Weapon[];
  onAddWeapon: () => void;
  onRemoveWeapon: (id: string) => void;
  onWeaponChange: (id: string, field: keyof Weapon, value: string) => void;
}

const WeaponField: React.FC<{ label: string; value: string; field: keyof Weapon; weaponId: string; onWeaponChange: WeaponSectionProps['onWeaponChange']; rows?: number; placeholder?: string; }> =
({ label, value, field, weaponId, onWeaponChange, rows = 1, placeholder = ''}) => (
    <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80 mb-1">
            {label}
        </label>
        <textarea
            value={value}
            onChange={(e) => onWeaponChange(weaponId, field, e.target.value)}
            rows={rows}
            placeholder={placeholder}
            className="w-full bg-brand-parchment-dark/10 p-2 text-sm rounded border border-gray-600 focus:ring-1 focus:ring-brand-red-500 focus:border-brand-red-500 transition resize-y"
        />
    </div>
);


const WeaponEntry: React.FC<{ weapon: Weapon; onWeaponChange: WeaponSectionProps['onWeaponChange']; onRemoveWeapon: WeaponSectionProps['onRemoveWeapon']; }> =
({ weapon, onWeaponChange, onRemoveWeapon }) => {
    return (
        <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50 relative">
            <button 
                onClick={() => onRemoveWeapon(weapon.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-brand-red-400 transition-colors"
                title="Remover Arma"
                aria-label="Remover Arma"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </button>
            
            <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80 mb-1">Nome da Arma</label>
                 <input
                    type="text"
                    value={weapon.name}
                    onChange={(e) => onWeaponChange(weapon.id, 'name', e.target.value)}
                    className="w-full bg-transparent border-b-2 border-gray-600/70 py-1 text-xl text-brand-parchment-light font-bold focus:outline-none focus:border-brand-red-500 transition-colors"
                    placeholder='Ex: Pistola 9mm'
                 />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <WeaponField label="Dano (DA)" value={weapon.damage} field="damage" weaponId={weapon.id} onWeaponChange={onWeaponChange} placeholder='Ex: 2'/>
                <WeaponField label="Tipo" value={weapon.type} field="type" weaponId={weapon.id} onWeaponChange={onWeaponChange} placeholder='Ex: Balística'/>
                <WeaponField label="Capacidade" value={weapon.capacity} field="capacity" weaponId={weapon.id} onWeaponChange={onWeaponChange} placeholder='Ex: 15'/>
            </div>

            <div className="mt-4">
                <WeaponField label="Propriedades" value={weapon.properties} field="properties" weaponId={weapon.id} onWeaponChange={onWeaponChange} rows={2} placeholder='Ex: Leve, Ágil'/>
            </div>
        </div>
    );
};


const WeaponSection: React.FC<WeaponSectionProps> = ({ weapons, onAddWeapon, onRemoveWeapon, onWeaponChange }) => {
    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-serif text-brand-red-400">Arsenal</h2>
                <button
                    onClick={onAddWeapon}
                    className="flex items-center gap-2 bg-brand-red-700/50 hover:bg-brand-red-600/60 border border-brand-red-500/50 text-brand-parchment-light font-bold py-2 px-4 rounded-lg transition-colors"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Adicionar Arma
                </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6">
                 {weapons.length === 0 ? (
                    <p className="text-center text-gray-400 py-10">Nenhuma arma registrada. Adicione uma para montar seu arsenal.</p>
                ) : (
                    weapons.map(weapon => (
                        <WeaponEntry
                            key={weapon.id}
                            weapon={weapon}
                            onWeaponChange={onWeaponChange}
                            onRemoveWeapon={onRemoveWeapon}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default WeaponSection;