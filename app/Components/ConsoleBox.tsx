'use client';
import React, { useState, useEffect } from 'react'

// Assign each number an emotion type
const getEmotion = (num) => {
  const emotions = ['woe', 'frolic', 'dread', 'malice'];
  return emotions[num % 4];
};

// Generate random float animation for each number
const generateRandomFloat = (index) => {
  const randomX = (Math.random() - 0.5) * 6; // Reduced from 11 to 6 for less movement
  const randomY = (Math.random() - 0.5) * 6;
  const duration = 4 + Math.random() * 3; // Slightly longer durations
  const delay = Math.random() * 1; // Reduced delay from 2s to 1s
  
  return `
    @keyframes random-float-${index} {
      0%, 100% { 
        transform: translate(0px, 0px) scale(1);
      }
      33% { 
        transform: translate(${randomX}px, ${randomY}px) scale(1);
      }
      66% { 
        transform: translate(${randomX * 0.5}px, ${randomY * 0.5}px) scale(1);
      }
    }
    
    .animate-random-${index} {
      animation: random-float-${index} ${duration}s ease-in-out ${delay}s infinite;
    }
  `;
};

function ConsoleBox() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [randomAnimations, setRandomAnimations] = useState('');

  // Generate random animations on component mount
  useEffect(() => {
    let animations = '';
    for (let i = 0; i < 24 * 24; i++) {
      animations += generateRandomFloat(i);
    }
    setRandomAnimations(animations);
  }, []);

  // Check if current index is a neighbor of hovered index
  const isNeighbor = (currentIndex, hoveredIndex) => {
    if (hoveredIndex === null) return false;
    
    const cols = 24;
    const currentRow = Math.floor(currentIndex / cols);
    const currentCol = currentIndex % cols;
    const hoveredRow = Math.floor(hoveredIndex / cols);
    const hoveredCol = hoveredIndex % cols;
    
    const rowDiff = Math.abs(currentRow - hoveredRow);
    const colDiff = Math.abs(currentCol - hoveredCol);
    
    // Direct neighbors (up, down, left, right, and diagonals)
    return rowDiff <= 1 && colDiff <= 1 && currentIndex !== hoveredIndex;
  };

  return (
    <div
      className="w-full h-190 bg-[#0D1623] rounded-[25px] p-4 overflow-y-auto"
      style={{ boxShadow: "inset 0 0 20px 20px #0B131C" }}>
      
      {/* Distinct Motion-Based Emotion Animations */}
      <style>{`
        /* WOE - Slow sinking motion with slight horizontal drift */
        @keyframes woe-float-full {
          0%, 100% { 
            transform: translate(0px, 0px) scale(2);
          }
          50% { 
            transform: translate(0.3px, 3px) scale(1.95);
          }
        }
        
        @keyframes woe-float-subtle {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1.5);
          }
          50% { 
            transform: translate(0.2px, 1.5px) scale(1.45);
          }
        }
        
        /* FROLIC - Energetic bouncing with rotation */
        @keyframes frolic-bounce-full {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(2);
          }
          25% { 
            transform: translateY(-6px) rotate(-1deg) scale(2.1);
          }
          50% { 
            transform: translateY(-8px) rotate(1deg) scale(2.15);
          }
          75% { 
            transform: translateY(-3px) rotate(0.5deg) scale(2.05);
          }
        }
        
        @keyframes frolic-bounce-subtle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1.5);
          }
          50% { 
            transform: translateY(-3px) rotate(0.5deg) scale(1.6);
          }
        }
        
        /* DREAD - Chaotic multi-directional shaking */
        @keyframes dread-tremble-full {
          0%, 100% { 
            transform: translate(0px, 0px) scale(2);
          }
          25% { 
            transform: translate(0.8px, -0.4px) scale(2.02);
          }
          50% { 
            transform: translate(-0.6px, 0.6px) scale(1.98);
          }
          75% { 
            transform: translate(0.4px, 0.8px) scale(2.03);
          }
        }
        
        @keyframes dread-tremble-subtle {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1.5);
          }
          50% { 
            transform: translate(0.3px, -0.2px) scale(1.52);
          }
        }
        
        /* MALICE - Aggressive pulsing with diagonal thrusts */
        @keyframes malice-throb-full {
          0%, 100% { 
            transform: scale(2) translate(0px, 0px);
          }
          33% { 
            transform: scale(2.2) translate(0.8px, -0.8px);
          }
          66% { 
            transform: scale(2.1) translate(-0.6px, 0.6px);
          }
        }
        
        @keyframes malice-throb-subtle {
          0%, 100% { 
            transform: scale(1.5) translate(0px, 0px);
          }
          50% { 
            transform: scale(1.65) translate(0.4px, -0.4px);
          }
        }
        
        /* Animation Classes - Faster durations */
        .animate-woe-full {
          animation: woe-float-full 2s ease-in-out infinite;
        }
        
        .animate-frolic-full {
          animation: frolic-bounce-full 1.2s ease-in-out infinite;
        }
        
        .animate-dread-full {
          animation: dread-tremble-full 1.4s ease-in-out infinite;
        }
        
        .animate-malice-full {
          animation: malice-throb-full 1s ease-in-out infinite;
        }
        
        .animate-woe-subtle {
          animation: woe-float-subtle 2s ease-in-out infinite;
        }
        
        .animate-frolic-subtle {
          animation: frolic-bounce-subtle 1.2s ease-in-out infinite;
        }
        
        .animate-dread-subtle {
          animation: dread-tremble-subtle 1.4s ease-in-out infinite;
        }
        
        .animate-malice-subtle {
          animation: malice-throb-subtle 1s ease-in-out infinite;
        }
        
        .number-cell {
          transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, filter;
          backface-visibility: hidden;
          transform-origin: center center;
        }
        
        .number-cell:hover {
          transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Random floating animations for all numbers */
        ${randomAnimations}
      `}</style>

      {/* 24x24 number grid */}
      <div className="grid grid-cols-24">
        {Array.from({ length: 24 * 24 }).map((_, index) => {
          const num = (index % 9 + 1);
          const emotion = getEmotion(num);
          const isHovered = hoveredIndex === index;
          const isNearby = isNeighbor(index, hoveredIndex);
          
          // Determine animation class based on state
          let animationClass = '';
          if (isHovered) {
            animationClass = `animate-${emotion}-full`;
          } else if (isNearby) {
            animationClass = `animate-${emotion}-subtle`;
          } else {
            animationClass = `animate-random-${index}`;
          }
          
          return (
            <div
              key={index}
              className={`number-cell flex text-[25px] p-4 justify-center items-center cursor-pointer ${animationClass}`}
              style={{ 
                color: isHovered ? '#A3F3FA' : isNearby ? '#A3F3FA' : '#0CECF7',
                fontWeight: isHovered ? '500' : isNearby ? '400' : '300',
                opacity: isHovered ? 1 : isNearby ? 0.9 : 0.7,
                zIndex: isHovered ? 20 : isNearby ? 10 : 1,
                filter: isHovered 
                  ? `drop-shadow(0 0 8px rgba(163, 243, 250, 0.8))` 
                  : isNearby 
                  ? `drop-shadow(0 0 4px rgba(163, 243, 250, 0.4))`
                  : 'none',
                textShadow: isHovered 
                  ? '0 0 12px currentColor' 
                  : isNearby 
                  ? '0 0 6px currentColor'
                  : 'none',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ConsoleBox