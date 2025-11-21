import React from 'react';
import { Module, Difficulty } from '../types';
import { Code, Layout, Zap, Layers, Box, Globe, ArrowRight, List, Play, Compass, Cpu, Palette, Activity } from 'lucide-react';

interface TopicCardProps {
  topic: Module;
  onClick: (topic: Module) => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'Code': return <Code size={24} />;
    case 'Layout': return <Layout size={24} />;
    case 'Zap': return <Zap size={24} />;
    case 'Layers': return <Layers size={24} />;
    case 'Box': return <Box size={24} />;
    case 'Globe': return <Globe size={24} />;
    case 'List': return <List size={24} />;
    case 'Play': return <Play size={24} />;
    case 'Compass': return <Compass size={24} />;
    case 'Cpu': return <Cpu size={24} />;
    case 'Palette': return <Palette size={24} />;
    case 'Activity': return <Activity size={24} />;
    default: return <Code size={24} />;
  }
};

const getDifficultyColor = (diff: Difficulty) => {
  switch (diff) {
    case Difficulty.BEGINNER: return 'text-green-400 bg-green-400/10 border-green-400/20';
    case Difficulty.INTERMEDIATE: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    case Difficulty.ADVANCED: return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    default: return 'text-gray-400';
  }
};

const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
  return (
    <div 
      onClick={() => onClick(topic)}
      className="group relative bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-android hover:shadow-lg hover:shadow-android/10 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-700 rounded-lg text-slate-300 group-hover:text-android group-hover:bg-slate-900 transition-colors">
          {getIcon(topic.iconName)}
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getDifficultyColor(topic.difficulty)}`}>
          {topic.difficulty}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-android transition-colors">
        {topic.title}
      </h3>
      
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
        {topic.description}
      </p>

      <div className="flex items-center text-android text-sm font-medium opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        Start Learning <ArrowRight size={16} className="ml-2" />
      </div>
    </div>
  );
};

export default TopicCard;