import React, { useState } from 'react';
import { TimeFrame, TenseId, TenseContent, TenseDefinition } from '../types';
import { TENSES } from '../constants';
import { ArrowDown, Clock, MoveRight, RotateCw, Sparkles } from 'lucide-react';

interface TimelineProps {
  content: Record<TenseId, TenseContent>;
  isLoading: boolean;
  onRefreshExample: (id: TenseId) => Promise<void>;
}

const TimeSectionHeader: React.FC<{ title: string; color: string; icon: React.ReactNode }> = ({ title, color, icon }) => (
  <div className={`sticky top-20 z-10 flex items-center justify-center py-4 my-8`}>
    <div className={`flex items-center gap-2 px-6 py-2 rounded-full shadow-lg ${color} text-white font-bold tracking-wide uppercase text-sm backdrop-blur-md`}>
      {icon}
      {title}
    </div>
  </div>
);

const TenseCard: React.FC<{ 
  def: TenseDefinition; 
  data: TenseContent; 
  side: 'left' | 'right'; 
  isLoading: boolean;
  colorClass: string;
  onRefresh: (id: TenseId) => Promise<void>;
}> = ({ def, data, side, isLoading, colorClass, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshClick = async () => {
    if (isRefreshing || isLoading) return;
    setIsRefreshing(true);
    await onRefresh(def.id);
    setIsRefreshing(false);
  };

  return (
    <div className={`relative flex items-center justify-between md:justify-center w-full mb-12`}>
      {/* Center Line Dot */}
      <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-slate-50 ${colorClass} transform -translate-x-1/2 z-0`}></div>
      
      {/* Content Container */}
      <div className={`flex flex-col w-full md:w-5/12 ${side === 'left' ? 'md:mr-auto pl-12 md:pl-0 md:pr-8 md:items-end' : 'md:ml-auto pl-12 md:pl-8 md:items-start'}`}>
        
        <div className={`relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-full border-l-4 ${colorClass} group`}>
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                {data.title || def.defaultTitle}
              </h3>
              
              <div className="mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Explanation</span>
                <p className="text-slate-600 text-sm leading-relaxed mt-1">
                  {data.explanation}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 transition-colors duration-300 hover:border-blue-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Example</span>
                <p className={`text-slate-800 font-medium italic transition-opacity duration-200 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
                  "{data.example}"
                </p>
              </div>

              {/* Generate New Example Button */}
              <button 
                onClick={handleRefreshClick}
                disabled={isRefreshing}
                className="w-full mt-3 py-2 px-3 border-2 border-dashed border-blue-200 rounded-lg 
                           flex items-center justify-center gap-2 text-xs font-medium text-blue-500 
                           hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 
                           active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn"
              >
                <RotateCw size={14} className={isRefreshing ? 'animate-spin' : 'group-hover/btn:rotate-180 transition-transform duration-500'} />
                {isRefreshing ? "Generating new example..." : "New random sentence"}
              </button>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <MoveRight size={14} />
                <span>{data.useCase}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ content, isLoading, onRefreshExample }) => {
  const tensesByFrame = {
    [TimeFrame.PAST]: TENSES.filter(t => t.timeFrame === TimeFrame.PAST),
    [TimeFrame.PRESENT]: TENSES.filter(t => t.timeFrame === TimeFrame.PRESENT),
    [TimeFrame.FUTURE]: TENSES.filter(t => t.timeFrame === TimeFrame.FUTURE),
  };

  const frameConfig = {
    [TimeFrame.PAST]: { color: 'bg-indigo-500', borderColor: 'border-indigo-500', dotColor: 'bg-indigo-500' },
    [TimeFrame.PRESENT]: { color: 'bg-emerald-500', borderColor: 'border-emerald-500', dotColor: 'bg-emerald-500' },
    [TimeFrame.FUTURE]: { color: 'bg-amber-500', borderColor: 'border-amber-500', dotColor: 'bg-amber-500' },
  };

  return (
    <div className="relative container mx-auto px-4 pb-24">
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform -translate-x-1/2"></div>

      {Object.entries(tensesByFrame).map(([frame, tenses]) => {
        const config = frameConfig[frame as TimeFrame];
        return (
          <div key={frame} className="relative">
            <TimeSectionHeader 
              title={frame} 
              color={config.color} 
              icon={<Clock size={16} />} 
            />
            
            <div className="space-y-4">
              {tenses.map((tense, index) => (
                <TenseCard
                  key={tense.id}
                  def={tense}
                  data={content[tense.id]}
                  side={index % 2 === 0 ? 'left' : 'right'}
                  isLoading={isLoading}
                  colorClass={config.borderColor}
                  onRefresh={onRefreshExample}
                />
              ))}
            </div>
            
             {/* Divider Arrow between sections (except last) */}
             {frame !== TimeFrame.FUTURE && (
                <div className="flex justify-center my-8 relative z-10">
                   <div className="bg-white p-2 rounded-full shadow-sm text-slate-300">
                      <ArrowDown size={24} />
                   </div>
                </div>
             )}
          </div>
        );
      })}
    </div>
  );
};