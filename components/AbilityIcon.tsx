
import React from 'react';
import type { Ability } from '../types';

interface AbilityIconProps {
  ability: Ability;
  onClick?: () => void;
  disabled?: boolean;
}

const AbilityIcon: React.FC<AbilityIconProps> = ({ ability, onClick, disabled }) => {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-12 h-12 rounded-full border-2 border-slate-400 flex items-center justify-center 
        ${ability.color} bg-slate-800/50 backdrop-blur-sm
        hover:bg-slate-700 hover:border-yellow-400 transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800/50 disabled:hover:border-slate-400`}
      >
        {ability.icon}
      </button>
      <div className="absolute bottom-full mb-2 w-48 bg-slate-900 text-white text-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2 z-10 border border-slate-600 shadow-lg">
        <h4 className="font-bold font-cinzel">{ability.name}</h4>
        <p className="text-xs">{ability.description}</p>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-slate-900 transform rotate-45 border-b border-r border-slate-600"></div>
      </div>
    </div>
  );
};

export default AbilityIcon;
