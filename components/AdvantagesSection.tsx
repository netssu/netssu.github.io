
import React from 'react';
import type { Trait } from '../advantagesData';

interface AdvantagesSectionProps {
  advantages: Trait[];
  disadvantages: Trait[];
  selectedAdvantages: string[];
  selectedDisadvantages: string[];
  onAdvantageToggle: (name: string) => void;
  onDisadvantageToggle: (name: string) => void;
}

const TraitSelector: React.FC<{
  title: string;
  list: Trait[];
  selected: string[];
  onToggle: (name: string) => void;
}> = ({ title, list, selected, onToggle }) => {
  const isAdvantage = title === 'Vantagens';

  const sortedList = [...list].sort((a, b) => {
    const aIsSelected = selected.includes(a.name);
    const bIsSelected = selected.includes(b.name);
    if (aIsSelected && !bIsSelected) return -1;
    if (!aIsSelected && bIsSelected) return 1;
    return 0;
  });

  return (
    <div className="bg-black/20 p-4 rounded-lg border border-gray-700/50 flex-1 min-w-[300px]">
      <h3 className={`text-xl font-serif border-b pb-2 mb-3 flex justify-between items-center ${isAdvantage ? 'text-green-400 border-green-700/50' : 'text-yellow-400 border-yellow-700/50'}`}>
        <span>{title}</span>
        <span className="text-sm font-sans bg-black/30 px-2 py-1 rounded">{selected.length}</span>
      </h3>
      <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-2">
        {sortedList.map((trait) => {
          const isSelected = selected.includes(trait.name);
          return (
            <label key={trait.name} className={`flex items-start gap-3 p-2 rounded-md transition-colors cursor-pointer hover:bg-white/5 ${isSelected ? 'bg-white/5' : ''}`}>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(trait.name)}
                className={`mt-1 w-5 h-5 rounded bg-gray-900/70 border-gray-600 text-brand-red-500 focus:ring-brand-red-600 shrink-0`}
              />
              <div>
                <span className="font-semibold text-brand-parchment-light">{trait.name}</span>
                <p className="text-sm text-brand-parchment-dark/80">{trait.description}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({
  advantages,
  disadvantages,
  selectedAdvantages,
  selectedDisadvantages,
  onAdvantageToggle,
  onDisadvantageToggle,
}) => {
  const balance = selectedDisadvantages.length - selectedAdvantages.length;

  let balanceColor = 'text-brand-parchment-light';
  if (balance > 0) balanceColor = 'text-green-400';
  if (balance < 0) balanceColor = 'text-red-400';

  return (
    <div className="mt-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-serif text-brand-red-400">Vantagens & Desvantagens</h2>
        <p className="text-sm text-brand-parchment-dark">Cada Vantagem custa 1 ponto. Cada Desvantagem concede 1 ponto. O balanço ideal é 0.</p>
        <div className="mt-4">
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80 mb-2">Balanço</label>
          <div className={`mx-auto w-24 h-24 flex items-center justify-center font-bold border-2 rounded-full ${balanceColor} ${balance === 0 ? 'border-gray-600' : balance > 0 ? 'border-green-600' : 'border-red-600'} bg-black/20 transition-all`}>
              <span className="text-5xl">{balance > 0 ? `+${balance}` : balance}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <TraitSelector
          title="Vantagens"
          list={advantages}
          selected={selectedAdvantages}
          onToggle={onAdvantageToggle}
        />
        <TraitSelector
          title="Desvantagens"
          list={disadvantages}
          selected={selectedDisadvantages}
          onToggle={onDisadvantageToggle}
        />
      </div>
    </div>
  );
};

export default AdvantagesSection;
