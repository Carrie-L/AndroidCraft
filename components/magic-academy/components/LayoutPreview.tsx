
import React from 'react';
import { LayoutDirection, MainAxisAlignment, CrossAxisAlignment } from '../types';
import { Star, Moon, Heart } from 'lucide-react';

interface LayoutPreviewProps {
  direction: LayoutDirection;
  mainAxis: MainAxisAlignment;
  crossAxis: CrossAxisAlignment;
  showAxisLabels?: boolean;
}

const LayoutPreview: React.FC<LayoutPreviewProps> = ({ 
  direction, 
  mainAxis, 
  crossAxis,
  showAxisLabels = true
}) => {
  
  // Flexbox classes for layout behavior
  const layoutClasses = `
    flex 
    ${direction === LayoutDirection.ROW ? 'flex-row' : 'flex-col'}
    ${getJustifyClass(mainAxis)}
    ${getItemsClass(crossAxis)}
    w-full h-full
  `;

  return (
    <div className="relative w-full h-64 sm:h-80 my-4 group select-none bg-slate-50 border-4 border-dashed border-slate-200 rounded-3xl overflow-hidden">
      
      {/* 1. Axis Visualizers Layer - Centered Background Guides */}
      {showAxisLabels && (
        <div className="absolute inset-0 z-0 pointer-events-none">
            
            {/* Main Axis Arrow (Blue) - The "River" Flow */}
            {/* Centered in the container, running along the main direction */}
            <div className={`absolute bg-gradient-to-r from-blue-200 to-blue-400 shadow-sm flex items-center justify-end opacity-80
                ${direction === LayoutDirection.ROW 
                    ? 'top-1/2 left-4 right-4 h-3 -translate-y-1/2 rounded-full' 
                    : 'left-1/2 top-4 bottom-4 w-3 -translate-x-1/2 flex-col rounded-full'
                }
            `}>
                {/* Arrow Head */}
                 <div className={`w-0 h-0 border-solid 
                    ${direction === LayoutDirection.ROW 
                        ? 'border-l-[16px] border-y-[10px] border-l-blue-400 border-y-transparent translate-x-1' 
                        : 'border-t-[16px] border-x-[10px] border-t-blue-400 border-x-transparent translate-y-1'
                    }
                `}></div>
            </div>

            {/* Cross Axis Line (Pink) - The "Perpendicular" Cut */}
            {/* Centered in the container, running perpendicular to main direction */}
            <div className={`absolute flex items-center justify-center opacity-60
                ${direction === LayoutDirection.ROW 
                    ? 'left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 border-l-4 border-pink-300 border-dashed' 
                    : 'top-1/2 left-4 right-4 h-0.5 -translate-y-1/2 border-t-4 border-pink-300 border-dashed'
                }
            `}>
            </div>
        </div>
      )}

      {/* 2. Content Layer */}
      {/* z-10 to sit on top of arrows. p-12 ensures items don't completely block the arrow starts/ends */}
      <div className={`relative z-10 w-full h-full p-12 ${layoutClasses}`}>
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-200/90 backdrop-blur-sm border-2 border-yellow-300 rounded-2xl shadow-md flex items-center justify-center text-yellow-600 transform transition-all duration-300 hover:scale-110">
            <Star fill="currentColor" size={24} />
        </div>
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-pink-200/90 backdrop-blur-sm border-2 border-pink-300 rounded-full shadow-md flex items-center justify-center text-pink-600 transform transition-all duration-300 hover:scale-110">
            <Heart fill="currentColor" size={28} />
        </div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-200/90 backdrop-blur-sm border-2 border-blue-300 rounded-tr-3xl rounded-bl-3xl shadow-md flex items-center justify-center text-blue-600 transform transition-all duration-300 hover:scale-110">
            <Moon fill="currentColor" size={24} />
        </div>
      </div>
    </div>
  );
};

// Helper functions for Tailwind mapping
function getJustifyClass(alignment: MainAxisAlignment): string {
    switch (alignment) {
        case MainAxisAlignment.START: return 'justify-start';
        case MainAxisAlignment.CENTER: return 'justify-center';
        case MainAxisAlignment.END: return 'justify-end';
        case MainAxisAlignment.SPACE_BETWEEN: return 'justify-between';
        case MainAxisAlignment.SPACE_AROUND: return 'justify-around';
        case MainAxisAlignment.SPACE_EVENLY: return 'justify-evenly';
        default: return 'justify-start';
    }
}

function getItemsClass(alignment: CrossAxisAlignment): string {
    switch (alignment) {
        case CrossAxisAlignment.START: return 'items-start';
        case CrossAxisAlignment.CENTER: return 'items-center';
        case CrossAxisAlignment.END: return 'items-end';
        case CrossAxisAlignment.STRETCH: return 'items-stretch';
        default: return 'items-start';
    }
}

export default LayoutPreview;
