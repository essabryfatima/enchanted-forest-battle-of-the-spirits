
import React from 'react';

interface HealthBarProps {
  current: number;
  max: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ current, max }) => {
  const percentage = Math.max(0, (current / max) * 100);
  const healthColor = percentage > 60 ? 'bg-green-500' : percentage > 30 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="w-full bg-slate-700 rounded-full h-4 border-2 border-slate-500 overflow-hidden">
      <div
        className={`${healthColor} h-full rounded-full transition-all duration-500 ease-in-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default HealthBar;
