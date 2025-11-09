
import React from 'react';
import type { Character } from '../types';
import HealthBar from './HealthBar';

interface CharacterCardProps {
  character: Character;
  isSelected?: boolean;
  isActive?: boolean;
  isTarget?: boolean;
  onClick?: () => void;
  showAbilities?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isSelected, isActive, isTarget, onClick, showAbilities = false }) => {
  const auraClass = `shadow-lg rounded-full ${character.auraColor} ${isActive ? 'animate-pulse' : ''}`;

  return (
    <div
      className={`relative flex flex-col items-center p-4 transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${isTarget ? 'animate-bounce' : ''}`}
      onClick={onClick}
    >
      <div className={`relative transition-transform duration-300 ${isActive ? 'scale-110' : ''} ${isSelected ? 'scale-105' : 'scale-100'}`}>
        <div className={`absolute -inset-2 ${auraClass}`}></div>
        <img
          src={character.avatar}
          alt={character.name}
          className={`w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 ${isSelected ? 'border-yellow-400' : 'border-slate-600'} transition-all duration-300`}
        />
      </div>
      <div className="mt-4 w-40 text-center bg-black/30 backdrop-blur-sm p-2 rounded-lg border border-slate-700">
        <h3 className="font-cinzel text-lg text-white font-bold truncate">{character.name}</h3>
        <p className="text-sm text-yellow-300">{character.hp} / {character.maxHp} HP</p>
        <div className="mt-2">
          <HealthBar current={character.hp} max={character.maxHp} />
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
