
import React from 'react';
import type { RatedItem } from '../types';

interface AttributeSectionProps {
  title: string;
  attributes: RatedItem[];
  small?: boolean;
  onRatingChange: (name: string, newRating: number) => void;
  attributeValue?: number;
  bonuses?: Partial<Record<string, number>>;
}

const AttributeSection: React.FC<AttributeSectionProps> = ({ title, attributes, small, onRatingChange, attributeValue, bonuses = {} }) => {
  return (
    <div className="bg-black/20 p-4 rounded-lg border border-gray-700/50">
      <h2 className={`font-serif text-brand-red-400 border-b border-brand-red-700/50 pb-2 mb-3 flex justify-between items-center ${small ? 'text-xl' : 'text-2xl'}`}>
        <span>{title}</span>
        {attributeValue !== undefined && (
            <span className="bg-brand-red-500/80 text-brand-parchment-light font-bold text-sm rounded-full w-6 h-6 inline-flex items-center justify-center">
                {attributeValue}
            </span>
        )}
      </h2>
      <div className="space-y-1">
        {attributes.map((attr) => {
            const bonus = !small ? (bonuses[attr.name] || 0) : 0;
            return (
              <div key={attr.name} className={`flex justify-between items-center ${small ? 'py-1' : 'py-1.5'}`}>
                <span className={`font-medium tracking-wide text-brand-parchment-light w-2/3 ${small ? 'text-base' : 'text-lg'}`}>
                  {attr.name}
                </span>
                <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={attr.rating}
                      onChange={(e) => onRatingChange(attr.name, parseInt(e.target.value, 10) || 0)}
                      className={`w-16 h-8 text-center bg-brand-parchment-dark/10 p-1 rounded border border-gray-600 focus:ring-1 focus:ring-brand-red-500 focus:border-brand-red-500 transition text-brand-parchment-light ${small ? 'text-base' : 'text-lg'}`}
                      min={small ? 0 : 1}
                      max={5}
                    />
                    {bonus > 0 && (
                        <span className="font-bold text-brand-red-400 w-6 text-left text-lg">+{bonus}</span>
                    )}
                </div>
              </div>
            )
        })}
      </div>
    </div>
  );
};

export default AttributeSection;