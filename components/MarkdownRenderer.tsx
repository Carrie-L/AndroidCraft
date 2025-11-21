import React, { useState } from 'react';
import { Layout, User, Heart, ThumbsUp, Apple } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

// --- UI Previews for Lessons ---

// 1. Simulation of the "ArtistCard" example in Lesson 1.2
const ArtistCardPreview = () => (
  <div className="my-6 max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 font-sans">
    <div className="bg-slate-100 px-3 py-1 text-[10px] text-slate-500 uppercase tracking-widest border-b border-gray-200 flex justify-between items-center">
      <span>Android UI Preview</span>
      <span className="bg-green-100 text-green-700 px-1.5 rounded">Row</span>
    </div>
    <div className="p-2">
      {/* This mimics the Compose code: Row(verticalAlignment = Alignment.CenterVertically) */}
      <div className="flex items-center p-2 border border-dashed border-blue-300 rounded bg-blue-50/50 relative group">
        <div className="absolute -top-3 left-2 text-[10px] text-blue-400 bg-white px-1 opacity-0 group-hover:opacity-100 transition-opacity">Row</div>
        
        {/* Box(modifier = Modifier.size(50.dp).clip(CircleShape).background(Color.Blue)) */}
        <div className="w-[50px] h-[50px] bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm relative group/box">
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white bg-black/70 px-1 rounded opacity-0 group-hover/box:opacity-100 pointer-events-none whitespace-nowrap">Box (50dp)</div>
        </div>
        
        {/* Spacer(modifier = Modifier.width(16.dp)) */}
        <div className="w-4 h-4 flex items-center justify-center relative group/spacer">
             <div className="w-full border-t border-red-300"></div>
             <div className="absolute -top-4 text-[10px] text-red-400 opacity-0 group-hover/spacer:opacity-100 whitespace-nowrap">Spacer (16dp)</div>
        </div>
        
        {/* Column */}
        <div className="flex flex-col border border-dashed border-purple-300 p-1 rounded bg-purple-50/50 relative group/col">
           <div className="absolute -top-3 right-0 text-[10px] text-purple-400 bg-white px-1 opacity-0 group-hover/col:opacity-100 transition-opacity">Column</div>
           {/* Text */}
           <span className="font-bold text-black text-sm">Alfred Sisley</span>
           {/* Text */}
           <span className="text-gray-500 text-xs">3 minutes ago</span>
        </div>
      </div>
    </div>
  </div>
);

// 2. Simulation of the "SongRow" Example (Lesson 1.2 updated)
const SongRowPreview = () => (
  <div className="my-6 max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 font-sans">
    <div className="bg-slate-100 px-3 py-1 text-[10px] text-slate-500 uppercase tracking-widest border-b border-gray-200">
      <span>Music Player Row</span>
    </div>
    <div className="p-4 flex items-center bg-neutral-50">
      {/* Cover */}
      <div className="w-12 h-12 bg-indigo-500 rounded-md shadow-sm flex-shrink-0"></div>
      
      {/* Spacer */}
      <div className="w-4"></div>
      
      {/* Text */}
      <div className="flex flex-col flex-grow">
        <span className="font-bold text-slate-800 text-sm">Bohemian Rhapsody</span>
        <span className="text-slate-500 text-xs">Queen</span>
      </div>

      {/* Play Button (Right aligned logic simulation) */}
      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </div>
    </div>
  </div>
);

// 3. Simulation of the "ProfileCard" Target for Challenge 1.2
const ProfileCardTargetPreview = () => (
  <div className="my-6 max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 font-sans">
    <div className="bg-slate-100 px-3 py-1 text-[10px] text-slate-500 uppercase tracking-widest border-b border-gray-200">
      <span>Target UI (目标效果)</span>
    </div>
    <div className="p-4 flex items-center">
      {/* Avatar Placeholder */}
      <div className="w-[60px] h-[60px] bg-gray-400 rounded-full flex-shrink-0 flex items-center justify-center">
        <User size={24} className="text-gray-200" />
      </div>
      
      {/* Spacer */}
      <div className="w-4"></div>
      
      {/* Text Column */}
      <div className="flex flex-col">
        <span className="font-bold text-black text-lg">Android 开发者</span>
        <span className="text-gray-500 text-sm">Jetpack Compose 练习生</span>
      </div>
    </div>
  </div>
);

// 4. State Counter Preview for Lesson 2.1
const CounterPreview = () => {
    const [count, setCount] = useState(0);
    return (
      <div className="my-6 max-w-xs mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 font-sans text-center">
        <div className="bg-slate-100 px-3 py-1 text-[10px] text-slate-500 uppercase tracking-widest border-b border-gray-200">
          <span>Interactive Preview (试一试)</span>
        </div>
        <div className="p-6 flex flex-col items-center gap-4">
            <span className="text-4xl font-bold text-slate-800">{count}</span>
            <button 
                onClick={() => setCount(c => c + 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded-full font-medium active:scale-95 transition-transform shadow-md hover:bg-purple-700"
            >
                点击次数 +1
            </button>
            <span className="text-xs text-slate-400">这模拟了 Recomposition 的过程</span>
        </div>
      </div>
    );
};

// 4.1 Growing Apple for Lesson 2.1 (Fun Version)
const GrowingApplePreview = () => {
    const [size, setSize] = useState(40); // Initial size in px
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setSize(s => Math.min(s + 10, 150)); // Max size 150
        setCount(c => c + 1);
    };

    return (
      <div className="my-6 max-w-xs mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 font-sans text-center select-none">
        <div className="bg-slate-100 px-3 py-1 text-[10px] text-slate-500 uppercase tracking-widest border-b border-gray-200">
          <span>Magic Apple (点我变大)</span>
        </div>
        <div className="h-48 flex flex-col items-center justify-center relative bg-green-50 overflow-hidden cursor-pointer" onClick={handleClick}>
            <div 
                className="transition-all duration-300 ease-out text-red-500 drop-shadow-lg flex items-center justify-center relative"
                style={{ width: size, height: size }}
            >
                <Apple 
                    size={size} 
                    fill="currentColor" 
                    className="absolute inset-0"
                />
                <span className="relative z-10 text-white font-bold" style={{ fontSize: size * 0.4 }}>
                    {count}
                </span>
            </div>
            <div className="absolute bottom-2 text-xs text-green-700 font-medium opacity-70">
                点击苹果喂它吃 State!
            </div>
        </div>
      </div>
    );
};

// 5. Like Button Target for Lesson 2.1 Challenge
const LikeButtonPreview = () => {
    const [isLiked, setIsLiked] = useState(false);
    return (
      <div className="my-6 max-w-xs mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 font-sans">
        <div className="bg-slate-100 px-3 py-1 text-[10px] text-slate-500 uppercase tracking-widest border-b border-gray-200">
          <span>Challenge Target (点赞效果)</span>
        </div>
        <div className="p-4 flex flex-col gap-2">
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">Awesome Post</span>
                    <span className="text-xs text-slate-400">Just now</span>
                </div>
                <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                    <Heart 
                        size={24} 
                        className={`transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} 
                    />
                </button>
             </div>
             <div className="text-xs text-center text-slate-400 mt-1">点击爱心查看变色效果</div>
        </div>
      </div>
    );
};


// Registry mapping keys to components
const PREVIEW_REGISTRY: Record<string, React.FC> = {
  'ArtistCard': ArtistCardPreview,
  'SongRow': SongRowPreview,
  'ProfileCardTarget': ProfileCardTargetPreview,
  'Counter': CounterPreview,
  'GrowingApple': GrowingApplePreview,
  'LikeButtonTarget': LikeButtonPreview
};

// --- Main Renderer ---

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  
  return (
    <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
      {lines.map((line, index) => {
        // Check for Custom Preview Tags: [[PREVIEW:KeyName]]
        const previewMatch = line.match(/^\[\[PREVIEW:(.+)\]\]$/);
        if (previewMatch) {
          const PreviewComponent = PREVIEW_REGISTRY[previewMatch[1]];
          return PreviewComponent ? <PreviewComponent key={index} /> : null;
        }

        // Headers
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold text-android mt-6 mb-2">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold text-slate-800 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">{line.replace('## ', '')}</h2>;
        }
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{line.replace('# ', '')}</h1>;
        }

        // List items
        if (line.trim().startsWith('- ')) {
          return (
            <div key={index} className="flex items-start ml-4 mb-2">
              <span className="text-android mr-2 mt-1.5">•</span>
              <span>{line.replace('- ', '')}</span>
            </div>
          );
        }
        
        // Paragraphs (Bold formatting)
        const parts = line.split('**');
        return (
          <p key={index}>
            {parts.map((part, i) => (
              i % 2 === 1 
                ? <strong key={i} className="text-slate-800 dark:text-white font-semibold">{part}</strong>
                : part
            ))}
          </p>
        );
      })}
    </div>
  );
};

export const ComplexMarkdown: React.FC<{ content: string }> = ({ content }) => {
  // Split by code blocks first
  const segments = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-4">
      {segments.map((segment, i) => {
        if (segment.startsWith('```')) {
          const lines = segment.split('\n');
          const language = lines[0].replace('```', '').trim();
          const code = lines.slice(1, -1).join('\n');
          return (
            <div key={i} className="my-6 rounded-lg overflow-hidden border border-gray-300 dark:border-slate-700 bg-[#0d1117]">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">{language || 'Code'}</span>
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono leading-6 text-slate-300 selection:bg-slate-700 selection:text-white">
                <code>{code}</code>
              </pre>
            </div>
          );
        }
        // Pass text segments to the inner renderer which handles lines and previews
        return <MarkdownRenderer key={i} content={segment} />;
      })}
    </div>
  );
};

export default ComplexMarkdown;