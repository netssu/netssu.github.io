import React from 'react';

interface DotRatingProps {
  value: number;
  maxValue?: number;
  onChange: (newValue: number) => void;
}

const Dot: React.FC<{ filled: boolean; onClick: () => void }> = ({ filled, onClick }) => (
  <button 
    type="button"
    onClick={onClick}
    className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-brand-red-500 ${
      filled 
        ? 'bg-brand-red-500 border-brand-red-400 hover:bg-brand-red-400' 
        : 'bg-transparent border-gray-600 hover:border-brand-parchment-light'
    }`} 
    aria-label={filled ? "Desmarcar ponto" : "Marcar ponto"}
  />
);

const DotRating: React.FC<DotRatingProps> = ({ value, maxValue = 10, onChange }) => {
  const dots = Array.from({ length: maxValue }, (_, i) => i < value);

  const handleDotClick = (index: number) => {
    const newRating = index + 1;
    if (newRating === value) {
      onChange(0);
    } else {
      onChange(newRating);
    }
  };

  return (
    <div className="flex items-center space-x-1.5">
      {dots.map((filled, index) => (
        <Dot key={index} filled={filled} onClick={() => handleDotClick(index)} />
      ))}
    </div>
  );
};

export default DotRating;