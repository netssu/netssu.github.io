
import React from 'react';

interface Resource {
  name: string;
  max: number;
  current: number;
}

interface StatBoxGridProps {
    resources: Resource[];
    onResourceChange: (name: string, newCurrent: number) => void;
}

interface ResourceTrackProps {
  label: string;
  max: number;
  current: number;
  onCurrentChange: (newCurrent: number) => void;
}

const Square: React.FC<{ filled: boolean; onClick: () => void; }> = ({ filled, onClick }) => (
    <button 
      type="button"
      onClick={onClick}
      className={`w-4 h-4 md:w-5 md:h-5 border-2 border-gray-500 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-800 focus:ring-brand-red-500 ${ filled ? 'bg-brand-parchment-light hover:bg-brand-parchment-dark' : 'bg-transparent hover:bg-white/10' }`} 
    />
);

const DamageSquare: React.FC<{ type: 'bashing' | 'lethal' | 'aggravated' | 'none', onClick: () => void; }> = ({ type, onClick }) => {
    let styles = 'bg-transparent hover:bg-white/10';
    if (type === 'bashing') styles = 'bg-brand-parchment-light/50';
    if (type === 'lethal') styles = 'bg-brand-parchment-light';

    return <button type="button" onClick={onClick} className={`w-4 h-4 md:w-5 md:h-5 border-2 border-gray-500 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-800 focus:ring-brand-red-500 ${styles}`} />
}


const ResourceTrack: React.FC<ResourceTrackProps> = ({ label, max, current, onCurrentChange }) => {
    const isHealth = label.toLowerCase() === 'vida';
    const damageTaken = max - current;
    
    const handleSquareClick = (index: number) => {
        if (isHealth) {
            const clickedDamage = index + 1;
            const newDamage = clickedDamage === damageTaken ? damageTaken - 1 : clickedDamage;
            onCurrentChange(max - newDamage);
        } else {
            const newCurrent = index + 1;
            onCurrentChange(newCurrent === current ? 0 : newCurrent);
        }
    }
    
    return (
        <div className="w-full sm:w-auto">
            <div className="flex justify-center items-baseline gap-2 mb-3">
                <h3 className="font-serif text-lg text-brand-red-400">{label}</h3>
                {isHealth && <span className="text-base font-sans text-brand-parchment-dark">({damageTaken}/{max})</span>}
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
                 {Array.from({ length: max }).map((_, i) => (
                    isHealth
                        ? <DamageSquare key={i} type={ i < damageTaken ? 'lethal' : 'none'} onClick={() => handleSquareClick(i)} />
                        : <Square key={i} filled={i < current} onClick={() => handleSquareClick(i)}/>
                ))}
            </div>
        </div>
    );
};


const StatBoxGrid: React.FC<StatBoxGridProps> = ({resources, onResourceChange}) => {
    return (
        <div className="bg-black/20 p-3 rounded-lg border border-gray-700/50 flex flex-col sm:flex-row gap-8 justify-center items-center">
            {resources.map(res => <ResourceTrack key={res.name} label={res.name} max={res.max} current={res.current} onCurrentChange={(newCurrent) => onResourceChange(res.name, newCurrent)} />)}
        </div>
    )
}

export default StatBoxGrid;
