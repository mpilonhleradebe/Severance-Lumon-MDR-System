'use client';
import React, { useState, useEffect } from 'react'

// Generate random float animation for each number
const generateRandomFloat = (index: number) => {
  const randomX = (Math.random() - 0.5) * 12;
  const randomY = (Math.random() - 0.5) * 12;
  const duration = 6 + Math.random() * 4;
  const delay = Math.random() * 2;
  
  return `
    @keyframes random-float-${index} {
      0%, 100% { 
        transform: translate(0px, 0px) scale(1);
      }
      25% { 
        transform: translate(${randomX}px, ${randomY}px) scale(1.08);
      }
      50% { 
        transform: translate(${randomX * -0.7}px, ${randomY * -0.7}px) scale(1.05);
      }
      75% { 
        transform: translate(${randomX * 0.3}px, ${randomY * 0.3}px) scale(1.1);
      }
    }
    
    .animate-random-${index} {
      animation: random-float-${index} ${duration}s ease-in-out ${delay}s infinite;
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
  `;
};

function ConsoleBox({ numbersGrid, onNumberDropped, onDragStart, onDragEnd }: { 
  numbersGrid: any[], 
  onNumberDropped: any,
  onDragStart: (cluster: any[]) => void,
  onDragEnd: (cluster: any[]) => void
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [randomAnimations, setRandomAnimations] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const get3x3Cluster = (centerIndex: number) => {
    const cols = 24;
    const row = Math.floor(centerIndex / cols);
    const col = centerIndex % cols;
    const cluster = [];

    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const newRow = row + r;
        const newCol = col + c;
        if (newRow >= 0 && newRow < 24 && newCol >= 0 && newCol < cols) {
          const idx = newRow * cols + newCol;
          if (numbersGrid[idx] && !numbersGrid[idx].isRefined && !numbersGrid[idx].isBeingDragged) {
            cluster.push(numbersGrid[idx]);
          }
        }
      }
    }
    return cluster;
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (numbersGrid[index]?.isRefined || numbersGrid[index]?.isBeingDragged) {
      e.preventDefault();
      return;
    }

    const cluster = get3x3Cluster(index);
    if (cluster.length === 0) return;

    setIsDragging(true);
    
    // Notify parent to show dots immediately
    onDragStart(cluster);

    const dragImage = document.createElement('div');
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.display = 'grid';
    dragImage.style.gridTemplateColumns = 'repeat(3, 50px)';
    dragImage.style.gap = '6px';
    dragImage.style.padding = '10px';
    dragImage.style.background = 'rgba(13,22,35,0.98)';
    dragImage.style.borderRadius = '12px';
    dragImage.style.boxShadow = '0 0 40px rgba(163,243,250,0.6)';
    dragImage.style.border = '2px solid rgba(163,243,250,0.4)';
    dragImage.style.backdropFilter = 'blur(10px)';
    dragImage.style.transform = 'scale(1.1)';
    dragImage.style.transition = 'all 0.3s ease';

    cluster.forEach((cell) => {
      const cellElement = document.createElement('div');
      cellElement.textContent = cell.number.toString();
      cellElement.style.color = '#A3F3FA';
      cellElement.style.fontSize = '24px';
      cellElement.style.fontWeight = '500';
      cellElement.style.display = 'flex';
      cellElement.style.justifyContent = 'center';
      cellElement.style.alignItems = 'center';
      cellElement.style.textShadow = '0 0 15px currentColor';
      cellElement.style.transition = 'all 0.3s ease';
      dragImage.appendChild(cellElement);
    });

    document.body.appendChild(dragImage);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setDragImage(dragImage, 75, 75);
    e.dataTransfer.setData('application/json', JSON.stringify(cluster));

    setTimeout(() => {
      if (dragImage.parentNode) {
        document.body.removeChild(dragImage);
      }
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    
    const clusterData = JSON.parse(e.dataTransfer.getData('application/json') || '[]');
    
    // If drop wasn't successful (no valid drop target), revert the dragged state
    if (e.dataTransfer.dropEffect === 'none') {
      onDragEnd(clusterData);
    }
  };

  // Generate random animations on component mount
  useEffect(() => {
    let animations = '';
    for (let i = 0; i < 24 * 24; i++) {
      animations += generateRandomFloat(i);
    }
    setRandomAnimations(animations);
  }, []);

  // Check if current index is a neighbor of hovered index
  const isNeighbor = (currentIndex: number, hoveredIndex: number | null) => {
    if (hoveredIndex === null) return false;
    
    const cols = 24;
    const currentRow = Math.floor(currentIndex / cols);
    const currentCol = currentIndex % cols;
    const hoveredRow = Math.floor(hoveredIndex / cols);
    const hoveredCol = hoveredIndex % cols;
    
    const rowDiff = Math.abs(currentRow - hoveredRow);
    const colDiff = Math.abs(currentCol - hoveredCol);
    
    return rowDiff <= 1 && colDiff <= 1 && currentIndex !== hoveredIndex;
  };

  if (numbersGrid.length === 0) {
    return <div className="flex justify-center items-center h-180 text-[#0CECF7]">Initializing numbers grid...</div>;
  }

  return (
    <div
      className="w-full h-180 bg-[#0D1623] rounded-[25px] p-4 overflow-y-auto transition-all duration-500"
      style={{ boxShadow: "inset 0 0 20px 20px #0B131C" }}>
      
      <style>{`
        /* WOE - Slow sinking motion */
        @keyframes woe-float-full {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1.8);
          }
          50% { 
            transform: translate(0.2px, 2px) scale(1.75);
          }
        }
        
        @keyframes woe-float-subtle {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1.4);
          }
          50% { 
            transform: translate(0.1px, 1px) scale(1.35);
          }
        }
        
        /* FROLIC - Energetic bouncing */
        @keyframes frolic-bounce-full {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1.8);
          }
          25% { 
            transform: translateY(-4px) rotate(-0.5deg) scale(1.9);
          }
          50% { 
            transform: translateY(-6px) rotate(0.5deg) scale(1.95);
          }
          75% { 
            transform: translateY(-2px) rotate(0.2deg) scale(1.85);
          }
        }
        
        @keyframes frolic-bounce-subtle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1.4);
          }
          50% { 
            transform: translateY(-2px) rotate(0.2deg) scale(1.5);
          }
        }
        
        /* DREAD - Subtle shaking */
        @keyframes dread-tremble-full {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1.8);
          }
          25% { 
            transform: translate(0.4px, -0.2px) scale(1.82);
          }
          50% { 
            transform: translate(-0.3px, 0.3px) scale(1.78);
          }
          75% { 
            transform: translate(0.2px, 0.4px) scale(1.83);
          }
        }
        
        @keyframes dread-tremble-subtle {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1.4);
          }
          50% { 
            transform: translate(0.2px, -0.1px) scale(1.42);
          }
        }
        
        /* MALICE - Pulsing */
        @keyframes malice-throb-full {
          0%, 100% { 
            transform: scale(1.8) translate(0px, 0px);
          }
          33% { 
            transform: scale(2) translate(0.4px, -0.4px);
          }
          66% { 
            transform: scale(1.9) translate(-0.3px, 0.3px);
          }
        }
        
        @keyframes malice-throb-subtle {
          0%, 100% { 
            transform: scale(1.4) translate(0px, 0px);
          }
          50% { 
            transform: scale(1.5) translate(0.2px, -0.2px);
          }
        }

        /* Refined dot animation */
        @keyframes dot-appear {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 0.6;
          }
        }

        @keyframes dot-pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        /* Drag dot animation */
        @keyframes drag-dot-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .animate-woe-full {
          animation: woe-float-full 3s ease-in-out infinite;
        }
        
        .animate-frolic-full {
          animation: frolic-bounce-full 1.8s ease-in-out infinite;
        }
        
        .animate-dread-full {
          animation: dread-tremble-full 2.2s ease-in-out infinite;
        }
        
        .animate-malice-full {
          animation: malice-throb-full 1.5s ease-in-out infinite;
        }
        
        .animate-woe-subtle {
          animation: woe-float-subtle 3s ease-in-out infinite;
        }
        
        .animate-frolic-subtle {
          animation: frolic-bounce-subtle 1.8s ease-in-out infinite;
        }
        
        .animate-dread-subtle {
          animation: dread-tremble-subtle 2.2s ease-in-out infinite;
        }
        
        .animate-malice-subtle {
          animation: malice-throb-subtle 1.5s ease-in-out infinite;
        }
        
        .number-cell {
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, filter, opacity;
          backface-visibility: hidden;
          transform-origin: center center;
        }
        
        .number-cell:hover {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .refined-dot {
          animation: dot-appear 0.8s ease-out forwards, dot-pulse 2s ease-in-out infinite;
          transition: all 0.8s ease;
        }

        .drag-dot {
          animation: drag-dot-pulse 1s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .drag-origin {
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: blur(1px) brightness(0.7);
          transform: scale(0.8);
        }

        ${randomAnimations}
      `}</style>

      <div className="grid grid-cols-24 gap-0">
        {numbersGrid.map((cell, index) => {
          const isHovered = hoveredIndex === index;
          const isNearby = isNeighbor(index, hoveredIndex);
          const isRefined = cell.isRefined;
          const isBeingDragged = cell.isBeingDragged;
          
          let animationClass = '';
          if (isRefined || isBeingDragged) {
            // No animation for refined or dragged dots
          } else if (isHovered) {
            animationClass = `animate-${cell.emotion}-full`;
          } else if (isNearby) {
            animationClass = `animate-${cell.emotion}-subtle`;
          } else {
            animationClass = `animate-random-${index}`;
          }
          
          return (
            <div
              key={cell.id}
              draggable={!isRefined && !isBeingDragged}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              className={`number-cell flex text-[25px] p-4 justify-center items-center ${
                isRefined || isBeingDragged ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
              } ${
                isRefined ? 'refined-dot' : isBeingDragged ? 'drag-dot' : animationClass
              } ${
                isDragging && isHovered ? 'drag-origin' : ''
              }`}
              style={{ 
                color: isRefined || isBeingDragged
                  ? '#0CECF7' 
                  : isHovered 
                  ? '#A3F3FA' 
                  : isNearby 
                  ? '#A3F3FA' 
                  : '#0CECF7',
                fontWeight: isRefined || isBeingDragged ? '900' : isHovered ? '500' : isNearby ? '400' : '300',
                opacity: isRefined ? 0.6 : isBeingDragged ? 0.8 : isHovered ? 1 : isNearby ? 0.9 : 0.7,
                fontSize: isRefined || isBeingDragged ? '32px' : '25px',
                filter: isRefined || isBeingDragged
                  ? 'none'
                  : isHovered 
                  ? `drop-shadow(0 0 10px rgba(163, 243, 250, 0.9))` 
                  : isNearby 
                  ? `drop-shadow(0 0 5px rgba(163, 243, 250, 0.5))`
                  : 'none',
                textShadow: isRefined || isBeingDragged
                  ? '0 0 8px currentColor'
                  : isHovered 
                  ? '0 0 15px currentColor' 
                  : isNearby 
                  ? '0 0 8px currentColor'
                  : 'none',
                transition: isRefined || isBeingDragged ? 'all 0.8s ease' : 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              onMouseEnter={() => !isRefined && !isBeingDragged && setHoveredIndex(index)}
              onMouseLeave={() => !isRefined && !isBeingDragged && setHoveredIndex(null)}
            >
              {isRefined || isBeingDragged ? '•' : cell.number}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ConsoleBox