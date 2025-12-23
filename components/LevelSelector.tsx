import React from 'react';
import { CefrLevel } from '../types';
import { Mail, Settings2 } from 'lucide-react';

interface LevelSelectorProps {
  currentLevel: CefrLevel;
  onLevelChange: (level: CefrLevel) => void;
  onShare: () => void;
  disabled: boolean;
  options: {
    includeModals: boolean;
    includeConditionals: boolean;
  };
  onToggleOption: (key: 'includeModals' | 'includeConditionals') => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ 
  currentLevel, 
  onLevelChange, 
  onShare, 
  disabled,
  options,
  onToggleOption
}) => {
  const levels = Object.values(CefrLevel);
  const currentIndex = levels.indexOf(currentLevel);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    onLevelChange(levels[newIndex]);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-30 w-full transition-all">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          
          {/* Header & Actions */}
          <div className="flex items-center justify-between w-full md:w-auto md:justify-start gap-6">
             <div className="flex flex-col">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">ChronoTense</h1>
                <p className="text-xs text-slate-500">The 12 Tenses of English • AI-Powered</p>
             </div>

             <button
                onClick={onShare}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all text-xs font-semibold shadow-sm active:scale-95"
                title="Save current content to Gmail"
             >
                <Mail size={14} />
                <span className="hidden sm:inline">Save to Gmail</span>
                <span className="sm:hidden">Save</span>
             </button>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center w-full md:w-1/2 max-w-lg space-y-4">
            
            {/* Slider Section */}
            <div className="w-full">
              <div className="w-full flex justify-between text-xs font-bold text-slate-400 mb-2 px-1">
                {levels.map((level) => (
                  <span 
                    key={level} 
                    className={`transition-colors duration-300 ${level === currentLevel ? 'text-blue-600 scale-110' : ''}`}
                  >
                    {level}
                  </span>
                ))}
              </div>
              
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={currentIndex}
                onChange={handleChange}
                disabled={disabled}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all disabled:opacity-50"
              />
            </div>

            {/* Options Section */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  <Settings2 size={12} />
                  <span>CUSTOMIZE:</span>
                </div>
                
                <label className={`flex items-center gap-2 text-xs font-medium cursor-pointer select-none px-3 py-1.5 rounded-full border transition-all ${options.includeModals ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                  <input 
                    type="checkbox" 
                    checked={options.includeModals} 
                    onChange={() => onToggleOption('includeModals')}
                    disabled={disabled}
                    className="accent-blue-600 w-3 h-3"
                  />
                  Include Modals
                </label>

                <label className={`flex items-center gap-2 text-xs font-medium cursor-pointer select-none px-3 py-1.5 rounded-full border transition-all ${options.includeConditionals ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                  <input 
                    type="checkbox" 
                    checked={options.includeConditionals} 
                    onChange={() => onToggleOption('includeConditionals')}
                    disabled={disabled}
                    className="accent-purple-600 w-3 h-3"
                  />
                  Include Conditionals
                </label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};