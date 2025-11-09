
import React from 'react';
import type { Character, Ability } from './types';

const FireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.C14.05 5.02 17 7.02 17 10c0 1-1 3-4.5 6.2-1.236 1.12-2.3.12-2.3-1.2v-2c0-2 1-3.5 2.5-4.5 1.5-1 2.5-2.5 2.5-4.5" />
  </svg>
);

const WindIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3.333 0-5.833 2-7 4M2 12h20M12 16c3.333 0 5.833-2 7-4" />
  </svg>
);

const HealIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ShadowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2zM4.93 4.93l1.41 1.41c.78.78 2.05.78 2.83 0s.78-2.05 0-2.83L7.76 2.12c-.78-.78-2.05-.78-2.83 0s-.78 2.05 0 2.83zm12.73 0l1.41-1.41c.78-.78.78-2.05 0-2.83s-2.05-.78-2.83 0l-1.41 1.41c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0zM12 15c-3.87 0-7 3.13-7 7h14c0-3.87-3.13-7-7-7z" />
    </svg>
);

const abilities = {
  fire: { name: 'Fire Lash', description: 'Deals 25 fire damage.', icon: <FireIcon />, color: 'text-red-400', damage: 25 },
  wind: { name: 'Gale Force', description: 'Deals 20 wind damage.', icon: <WindIcon />, color: 'text-cyan-400', damage: 20 },
  heal: { name: 'Nature\'s Touch', description: 'Heals for 30 HP.', icon: <HealIcon />, color: 'text-green-400', damage: -30 },
  shadow: { name: 'Shadow Strike', description: 'Deals 22 shadow damage.', icon: <ShadowIcon />, color: 'text-purple-400', damage: 22 },
};

export const HEROES: Character[] = [
  { id: 1, name: 'Lyra', type: 'Hero', hp: 100, maxHp: 100, avatar: 'https://picsum.photos/seed/lyra/200', auraColor: 'shadow-cyan-400/50', abilities: [abilities.wind, abilities.heal] },
  { id: 2, name: 'Kael', type: 'Hero', hp: 120, maxHp: 120, avatar: 'https://picsum.photos/seed/kael/200', auraColor: 'shadow-red-500/50', abilities: [abilities.fire, abilities.fire] },
  { id: 3, name: 'Elara', type: 'Hero', hp: 90, maxHp: 90, avatar: 'https://picsum.photos/seed/elara/200', auraColor: 'shadow-green-400/50', abilities: [abilities.heal, abilities.wind] },
  { id: 4, name: 'Zane', type: 'Hero', hp: 110, maxHp: 110, avatar: 'https://picsum.photos/seed/zane/200', auraColor: 'shadow-purple-500/50', abilities: [abilities.shadow, abilities.fire] },
];

export const CREATURES: Character[] = [
    { id: 5, name: 'Gloomfang', type: 'Creature', hp: 150, maxHp: 150, avatar: 'https://picsum.photos/seed/gloomfang/200', auraColor: 'shadow-purple-700/60', abilities: [abilities.shadow] },
    { id: 6, name: 'Whisperwood Sprite', type: 'Creature', hp: 80, maxHp: 80, avatar: 'https://picsum.photos/seed/sprite/200', auraColor: 'shadow-lime-500/60', abilities: [abilities.wind] }
];
