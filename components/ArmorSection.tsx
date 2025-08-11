
import React from 'react';
import type { Armor, VestType } from '../types';

interface ArmorSectionProps {
  armor: Armor;
  characterCorpo: number;
  onArmorChange: (part: 'vest' | 'helmet', value: VestType | boolean) => void;
}

const ArmorSection: React.FC<ArmorSectionProps> = ({ armor, characterCorpo, onArmorChange }) => {

    const vestAr = armor.vest === 'Leve' ? 1 : armor.vest === 'Pesado' ? 2 : 0;
    const helmetAr = armor.helmet ? 1 : 0;

    let agilityPenalty = 0;
    let perceptionPenalty = 0;
    let penaltyMessage = "";

    if (armor.vest === 'Pesado') {
        agilityPenalty = -1;
        if (characterCorpo < 3) {
            agilityPenalty = -2;
            penaltyMessage = "Penalidade extra por Corpo < 3";
        }
    }
    if (armor.helmet) {
        perceptionPenalty = -1;
    }

    return (
        <div className="mt-8 bg-black/20 p-4 rounded-lg border border-gray-700/50 w-full">
            <h2 className="text-xl font-serif text-brand-red-400 border-b border-brand-red-700/50 pb-2 mb-4">
                Armadura & Proteção
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Controles de Equipamento */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="vest-select" className="block text-sm font-bold uppercase tracking-wider mb-2 text-brand-parchment-dark">
                            Colete
                        </label>
                        <select
                            id="vest-select"
                            value={armor.vest}
                            onChange={(e) => onArmorChange('vest', e.target.value as VestType)}
                             className="w-full bg-gray-900/70 border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-red-500 focus:border-brand-red-500 transition-colors"
                        >
                            <option value="Nenhum">Nenhum</option>
                            <option value="Leve">Colete Leve (AR+1)</option>
                            <option value="Pesado">Colete Pesado (AR+2, -1 Agi)</option>
                        </select>
                    </div>
                     <div>
                        <label className="flex items-center gap-3 cursor-pointer">
                           <input
                             type="checkbox"
                             checked={armor.helmet}
                             onChange={(e) => onArmorChange('helmet', e.target.checked)}
                             className="w-5 h-5 rounded bg-gray-900/70 border-gray-600 text-brand-red-500 focus:ring-brand-red-600"
                           />
                           <span className="text-sm font-bold uppercase tracking-wider text-brand-parchment-dark">
                               Capacete (AR+1, -1 Per)
                           </span>
                        </label>
                    </div>
                </div>

                {/* Status e Penalidades */}
                <div className="bg-black/20 border border-gray-600/50 rounded-lg p-3 space-y-2 text-center">
                   <h4 className="font-bold text-brand-parchment-light text-base">Status Atuais</h4>
                   <div className="flex justify-around text-sm">
                        <p><strong className="text-brand-parchment-dark">AR Tórax:</strong> {vestAr}</p>
                        <p><strong className="text-brand-parchment-dark">AR Cabeça:</strong> {helmetAr}</p>
                   </div>
                   <div className="flex justify-around text-sm pt-1 border-t border-gray-700/50">
                        <p><strong className="text-brand-parchment-dark">Pnal. Agi:</strong> <span className={agilityPenalty < 0 ? 'text-red-400 font-bold' : ''}>{agilityPenalty}</span></p>
                        <p><strong className="text-brand-parchment-dark">Pnal. Per:</strong> <span className={perceptionPenalty < 0 ? 'text-red-400 font-bold' : ''}>{perceptionPenalty}</span></p>
                   </div>
                   {penaltyMessage && <p className="text-xs text-yellow-400/80 pt-1">{penaltyMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default ArmorSection;
