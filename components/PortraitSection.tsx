
import React from 'react';

interface PortraitSectionProps {
  url: string;
  altText: string;
  onUrlChange: (newUrl: string) => void;
}

const PortraitSection: React.FC<PortraitSectionProps> = ({ url, altText, onUrlChange }) => {
  return (
    <div className="bg-black/20 p-4 rounded-lg border border-gray-700/50">
      <h2 className="text-2xl font-serif text-brand-red-400 border-b border-brand-red-700/50 pb-2 mb-4">
        Portrait
      </h2>
      <div className="aspect-[3/4] rounded-md overflow-hidden border-2 border-gray-600 shadow-lg shadow-black/50">
        <img
          src={url}
          alt={altText}
          className="w-full h-full object-cover object-center grayscale-[30%] contrast-125"
          onError={(e) => { e.currentTarget.src = 'https://picsum.photos/400/600' }}
        />
      </div>
       <div className="mt-3">
        <label className="block text-xs font-bold uppercase tracking-widest text-brand-red-400/80 mb-1">
          URL da Imagem
        </label>
        <input 
          type="text"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          className="w-full bg-transparent border-b-2 border-gray-600/70 pt-1 pb-1 text-sm text-brand-parchment-light font-medium focus:outline-none focus:border-brand-red-500 transition-colors"
          placeholder="Cole a URL da imagem aqui..."
        />
      </div>
    </div>
  );
};

export default PortraitSection;