import React from 'react';
import type { RatedItem, Skill } from '../types';

interface AttributeSectionProps {
  title: string;
  attributes: RatedItem[];
  small?: boolean;
  onRatingChange: (name: string, newRating: number) => void;
  onSkillTrainToggle?: (name: string) => void;
  attributeValue?: number;
  bonuses?: Partial<Record<string, number>>;
}

const AttributeSection: React.FC<AttributeSectionProps> = ({ title, attributes, small, onRatingChange, onSkillTrainToggle, attributeValue, bonuses = {} }) => {
  return (
    <div className="bg-black/20 p-4 rounded-lg border border-gray-700/50">
      <h2 className={`font-serif text-brand-red-400 border-b border-brand-red-700/50 pb-2 mb-3 flex justify-between items-center ${small ? 'text-xl' : 'text-2xl'}`}>
        <span>{title}</span>
        {attributeValue !== undefined && (
            <span className={`text-brand-parchment-light font-bold text-sm rounded-full w-6 h-6 inline-flex items-center justify-center ${attributeValue > 1 ? 'bg-brand-red-500/80' : 'bg-gray-600'}`}>
                {attributeValue}
            </span>
        )}
      </h2>
      <div className="space-y-1">
        {attributes.map((attr) => {
            const skill = attr as Skill;
            const isMastered = !!skill.mastered;
            const isTrained = !!skill.trained;
            const isFromClass = !!skill.classBonus;

            // Sum up all possible bonuses for a skill
            let skillBonus = 0;
            if (onSkillTrainToggle) { // Check if it's a skill
                if (isMastered) skillBonus++;
                if (isTrained) skillBonus++;
                if (isFromClass) skillBonus++;
            }
            
            const attrModifier = !small ? (bonuses[attr.name] || 0) : 0;
            
            const skillBonusTitles = [];
            if (isMastered) skillBonusTitles.push("Antecedente");
            if (isFromClass) skillBonusTitles.push("Classe");
            if (isTrained) skillBonusTitles.push("Treinada");
            const skillBonusTitle = skillBonusTitles.length > 0 ? `Perícia: ${skillBonusTitles.join(', ')}` : "Treinar perícia";

            return (
              <div key={attr.name} className={`flex justify-between items-center ${small ? 'py-1' : 'py-1.5'}`}>
                <div className="flex items-center gap-3 w-2/3">
                    {onSkillTrainToggle && (
                        <button
                          type="button"
                          onClick={() => onSkillTrainToggle(attr.name)}
                          disabled={isMastered || isFromClass}
                          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center gap-0.5
                            ${isTrained && !isMastered && !isFromClass
                                ? 'bg-sky-500 border-sky-400' 
                                : 'bg-transparent border-gray-600'
                            }
                            ${!(isTrained || isMastered || isFromClass) ? 'hover:border-brand-parchment-light' : ''}
                            ${(isMastered || isFromClass) ? 'cursor-not-allowed' : 'cursor-pointer'}
                          `}
                          aria-label={skillBonusTitle}
                          title={skillBonusTitle}
                        >
                          {isMastered && <span className="text-xs text-yellow-400" title="Bônus de Antecedente">★</span>}
                          {isFromClass && <span className="text-xs text-purple-400 font-bold" title="Bônus de Classe">C</span>}
                        </button>
                    )}
                    <span className={`font-medium tracking-wide text-brand-parchment-light ${small ? 'text-base' : 'text-lg'}`}>
                      {attr.name}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {attrModifier !== 0 && !small && (
                        <span className={`text-xs font-bold ${attrModifier > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {attrModifier > 0 ? `+${attrModifier}` : attrModifier}
                        </span>
                    )}
                    {skillBonus > 0 && small && (
                        <span className="text-xs font-bold text-green-400">
                           +{skillBonus}
                        </span>
                    )}
                    <input
                      type="number"
                      value={attr.rating}
                      onChange={(e) => {
                        const baseValue = parseInt(e.target.value, 10) || 0;
                        onRatingChange(attr.name, Math.max(0, Math.min(5, baseValue)));
                      }}
                      className={`w-16 h-8 text-center bg-brand-parchment-dark/10 p-1 rounded border transition text-brand-parchment-light ${small ? 'text-base' : 'text-lg'} border-gray-600 focus:ring-1 focus:ring-brand-red-500 focus:border-brand-red-500`}
                      min="0"
                      max="5"
                    />
                </div>
              </div>
            )
        })}
      </div>
    </div>
  );
};

export default AttributeSection;