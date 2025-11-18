import React from 'react'
import { useState } from 'react';

function IndividualBucket(
    { bucketNum, percentage, onNumberDropped, emotionData }: { bucketNum: number; percentage: number; onNumberDropped: any; emotionData: any }
) {

  const [isDragOver, setIsDragOver] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const clusterData = JSON.parse(e.dataTransfer.getData('application/json'));
    onNumberDropped(bucketNum, clusterData);
  };

  return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-60 h-[50px] bg-[#1C314A] flex flex-col items-center justify-center rounded-[10px] px-2 transition-all duration-500 ease-out ${
          isDragOver 
            ? 'ring-4 ring-[#0CECF7] shadow-2xl scale-110 bg-[#1C3A5A] transform-gpu' 
            : isHovered
            ? 'shadow-lg scale-105 bg-[#1C3858] transform-gpu'
            : 'shadow-md hover:shadow-lg'
        }`}
        style={{
          background: isDragOver 
            ? 'linear-gradient(135deg, #1C3A5A 0%, #2A4A6A 100%)'
            : isHovered
            ? 'linear-gradient(135deg, #1C3858 0%, #2A4868 100%)'
            : 'linear-gradient(135deg, #1C314A 0%, #2A4159 100%)'
        }}
      >
          <div className="flex w-full justify-between items-center transition-all duration-300">
              <h1 className='text-[#A3F3FA] font-bold text-sm transition-all duration-300'>0{bucketNum}</h1>
              <h1 className='text-[#2BA1B5] font-bold text-[10px] transition-all duration-500'>{percentage}%</h1>
          </div>
          
          <div className="w-full h-[3px] bg-[#0A1A2C] rounded-full mt-1 overflow-hidden transition-all duration-300">
            <div
              className="h-full bg-gradient-to-r from-[#0CECF7] to-[#2BA1B5] transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          {emotionData && (
            <div className="flex w-full gap-1 mt-1.5 transition-all duration-500">
              {['woe', 'frolic', 'dread', 'malice'].map((emotion) => (
                <div key={emotion} className="flex-1 h-[2px] bg-[#0A1A2C] rounded-full overflow-hidden transition-all duration-500">
                  <div
                    className="h-full bg-gradient-to-r from-[#0CECF7] to-[#2BA1B5] transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${emotionData[emotion]}%` }}
                  ></div>
                </div>
              ))}
            </div>
          )}

          {isDragOver && (
            <div className="absolute inset-0 border-2 border-[#0CECF7] rounded-[10px] animate-pulse transition-all duration-300">
              <div className="absolute inset-0 bg-[#0CECF7] opacity-10 rounded-[10px]"></div>
            </div>
          )}

          {/* Glow effect on hover */}
          <div className={`absolute inset-0 rounded-[10px] transition-all duration-500 ${
            isHovered ? 'shadow-[0_0_30px_rgba(12,236,247,0.3)]' : ''
          }`}></div>
      </div>
  )
}

export default IndividualBucket