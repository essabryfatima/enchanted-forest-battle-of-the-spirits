
import React, { useState, useEffect, useCallback } from 'react';
import { HEROES, CREATURES } from './constants';
import type { Character, Ability } from './types';
import CharacterCard from './components/CharacterCard';
import AbilityIcon from './components/AbilityIcon';

type GameState = 'title' | 'characterSelect' | 'battle';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('title');
  const [playerTeam, setPlayerTeam] = useState<Character[]>([]);
  const [enemies, setEnemies] = useState<Character[]>([]);
  
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleLog, setBattleLog] = useState<string[]>(['The battle begins!']);
  const [showVictory, setShowVictory] = useState(false);
  const [showDefeat, setShowDefeat] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  const handleSelectHero = (hero: Character) => {
    setPlayerTeam(prevTeam => {
      if (prevTeam.find(h => h.id === hero.id)) {
        return prevTeam.filter(h => h.id !== hero.id);
      }
      if (prevTeam.length < 3) {
        return [...prevTeam, hero];
      }
      return prevTeam;
    });
  };
  
  const startBattle = () => {
    if (playerTeam.length > 0) {
      setEnemies(CREATURES.map(c => ({ ...c, hp: c.maxHp }))); // Reset enemy health
      setGameState('battle');
      setActiveHeroIndex(0);
      setIsPlayerTurn(true);
      setBattleLog(['The battle begins!']);
      setShowVictory(false);
      setShowDefeat(false);
    }
  };

  const addToLog = (message: string) => {
    setBattleLog(prev => [message, ...prev.slice(0, 4)]);
  };

  const handleAbilityUse = (ability: Ability, target: Character) => {
    if (!isPlayerTurn || playerTeam[activeHeroIndex].hp <= 0) return;
    
    setTargetId(target.id);
    setTimeout(() => setTargetId(null), 500);

    let message = '';
    const activeHero = playerTeam[activeHeroIndex];

    if (ability.damage > 0) { // Damage ability
      const newHp = Math.max(0, target.hp - ability.damage);
      if (target.type === 'Hero') {
        setPlayerTeam(prev => prev.map(h => h.id === target.id ? { ...h, hp: newHp } : h));
      } else {
        setEnemies(prev => prev.map(e => e.id === target.id ? { ...e, hp: newHp } : e));
      }
      message = `${activeHero.name} uses ${ability.name} on ${target.name} for ${ability.damage} damage!`;
    } else { // Healing ability
      const newHp = Math.min(target.maxHp, target.hp - ability.damage);
      setPlayerTeam(prev => prev.map(h => h.id === target.id ? { ...h, hp: newHp } : h));
      message = `${activeHero.name} uses ${ability.name}, healing ${target.name} for ${-ability.damage} HP!`;
    }
    
    addToLog(message);
    endPlayerTurn();
  };

  const endPlayerTurn = () => {
    setIsPlayerTurn(false);
    // Find next living hero for next turn
    let nextHeroIndex = (activeHeroIndex + 1) % playerTeam.length;
    let attempts = 0;
    while(playerTeam[nextHeroIndex].hp <= 0 && attempts < playerTeam.length) {
      nextHeroIndex = (nextHeroIndex + 1) % playerTeam.length;
      attempts++;
    }
    setActiveHeroIndex(nextHeroIndex);
  };
  
  const enemyTurn = useCallback(() => {
    const aliveEnemies = enemies.filter(e => e.hp > 0);
    const aliveHeroes = playerTeam.filter(h => h.hp > 0);
    
    if (aliveEnemies.length === 0 || aliveHeroes.length === 0) return;

    const attacker = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    const target = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
    const ability = attacker.abilities[0];

    setTargetId(target.id);
    setTimeout(() => setTargetId(null), 500);

    const newHp = Math.max(0, target.hp - ability.damage);
    setPlayerTeam(prev => prev.map(h => h.id === target.id ? { ...h, hp: newHp } : h));
    addToLog(`${attacker.name} attacks ${target.name} for ${ability.damage} damage!`);
    
    setIsPlayerTurn(true);
  }, [enemies, playerTeam]);


  useEffect(() => {
    const allEnemiesDefeated = enemies.length > 0 && enemies.every(e => e.hp <= 0);
    const allHeroesDefeated = playerTeam.length > 0 && playerTeam.every(h => h.hp <= 0);

    if (allEnemiesDefeated) {
      setShowVictory(true);
      addToLog('All creatures have been defeated! VICTORY!');
      return;
    }
    if (allHeroesDefeated) {
      setShowDefeat(true);
      addToLog('Your heroes have fallen! DEFEAT!');
      return;
    }

    if (!isPlayerTurn && !showVictory && !showDefeat) {
      const timeout = setTimeout(enemyTurn, 1500);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayerTurn, enemies, playerTeam, showVictory, showDefeat]);


  const renderTitleScreen = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-white p-4">
      <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-yellow-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.7)]">
        Enchanted Forest
      </h1>
      <h2 className="text-2xl md:text-4xl font-cinzel text-cyan-200 mt-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
        Battle of the Spirits
      </h2>
      <button
        onClick={() => setGameState('characterSelect')}
        className="mt-12 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-bold font-cinzel text-2xl rounded-lg border-2 border-yellow-200 shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-all duration-300"
      >
        Start Adventure
      </button>
    </div>
  );

  const renderCharacterSelect = () => (
    <div className="flex flex-col items-center justify-center h-full text-white p-4">
      <h1 className="text-4xl md:text-5xl font-cinzel text-yellow-300 mb-8">Choose Your Heroes</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {HEROES.map(hero => (
          <CharacterCard
            key={hero.id}
            character={hero}
            isSelected={playerTeam.some(h => h.id === hero.id)}
            onClick={() => handleSelectHero(hero)}
          />
        ))}
      </div>
      {playerTeam.length > 0 && (
        <button
          onClick={startBattle}
          disabled={playerTeam.length === 0}
          className="mt-12 px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-slate-900 font-bold font-cinzel text-xl rounded-lg border-2 border-green-200 shadow-lg hover:scale-105 hover:shadow-green-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          {`Start Battle (${playerTeam.length}/3)`}
        </button>
      )}
    </div>
  );

  const renderBattleScreen = () => {
    const activeHero = playerTeam[activeHeroIndex];
    return (
      <div className="flex flex-col h-full text-white p-2 md:p-4 justify-between">
        {/* Enemies */}
        <div className="flex justify-center items-start gap-4 md:gap-8">
          {enemies.map(creature => (
            <CharacterCard key={creature.id} character={creature} isTarget={targetId === creature.id}/>
          ))}
        </div>

        {/* Battle Log & Modal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            {(showVictory || showDefeat) && (
                <div className="bg-black/70 backdrop-blur-md p-8 rounded-xl border-2 border-yellow-400 text-center z-20">
                    <h2 className={`text-5xl font-cinzel ${showVictory ? 'text-green-400' : 'text-red-500'}`}>
                        {showVictory ? 'Victory!' : 'Defeated!'}
                    </h2>
                    <button onClick={() => setGameState('characterSelect')} className="mt-6 px-6 py-3 bg-yellow-500 text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors">
                        Play Again
                    </button>
                </div>
            )}
            <div className="h-28 w-96 bg-black/30 p-2 rounded-lg border border-slate-600 text-center flex flex-col justify-end">
                {battleLog.map((msg, i) => (
                    <p key={i} className={`text-sm transition-opacity duration-500 ${i === 0 ? 'opacity-100 text-white' : 'opacity-60'}`}>{msg}</p>
                ))}
            </div>
        </div>

        {/* Heroes & Abilities */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-end gap-4 md:gap-8">
            {playerTeam.map((hero, index) => (
              <CharacterCard
                key={hero.id}
                character={hero}
                isActive={index === activeHeroIndex && isPlayerTurn && !showVictory && !showDefeat && hero.hp > 0}
                isTarget={targetId === hero.id}
              />
            ))}
          </div>
          <div className="mt-4 p-4 min-h-[8rem] bg-black/30 backdrop-blur-sm rounded-lg border border-slate-600 flex items-center justify-center gap-4">
             {isPlayerTurn && activeHero && activeHero.hp > 0 && !showVictory && !showDefeat ? (
                activeHero.abilities.map((ability, i) => (
                  <div key={i} className="flex flex-col items-center">
                    {ability.damage > 0 ? (
                        enemies.filter(e => e.hp > 0).map(enemy => (
                            <AbilityIcon key={`${i}-${enemy.id}`} ability={ability} onClick={() => handleAbilityUse(ability, enemy)} />
                        ))
                    ) : (
                        playerTeam.filter(h => h.hp > 0).map(hero => (
                             <AbilityIcon key={`${i}-${hero.id}`} ability={ability} onClick={() => handleAbilityUse(ability, hero)} />
                        ))
                    )}
                  </div>
                ))
            ) : <p className="text-slate-400">{!isPlayerTurn ? "Enemy's Turn..." : ""}</p>}
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <main className="bg-slate-900 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 min-h-screen overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="relative h-screen">
            {gameState === 'title' && renderTitleScreen()}
            {gameState === 'characterSelect' && renderCharacterSelect()}
            {gameState === 'battle' && renderBattleScreen()}
        </div>
    </main>
  );
}

export default App;
