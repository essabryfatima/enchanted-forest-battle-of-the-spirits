
export interface Ability {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  damage: number;
}

export interface Character {
  id: number;
  name:string;
  type: 'Hero' | 'Creature';
  hp: number;
  maxHp: number;
  avatar: string;
  auraColor: string;
  abilities: Ability[];
}
