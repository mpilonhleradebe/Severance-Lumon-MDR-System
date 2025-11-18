import React from 'react'
import IndividualBucket from './IndividualBucket'

function Buckets({ buckets, onNumberDropped }: { buckets: any[], onNumberDropped: any }) {

    const BucketInfo = ({ emotionData }: { emotionData: { [key: string]: number } }) => {
    return (
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-48 bg-[#1C314A] border border-[#0CECF7] rounded-[10px] px-3 py-3 gap-2 shadow-lg z-50 backdrop-blur-sm bg-opacity-95 transition-all duration-300">
        <div className="grid grid-cols-2 gap-2">
          {['woe','frolic','dread','malice'].map((emotion) => (
            <div key={emotion} className="flex flex-col gap-1">
              <div className="flex flex-row items-center justify-between">
                <p className="text-[#A3F3FA] font-bold text-[11px] uppercase tracking-wider">{emotion}</p>
                <span className="text-[#A3F3FA] text-[10px] font-mono">
                  {emotionData[emotion]}%
                </span>
              </div>
              <div className="w-full h-[4px] bg-[#0A1A2C] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0CECF7] to-[#2BA1B5] transition-all duration-700 ease-out rounded-full"
                  style={{ width: `${emotionData[emotion]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
    }

  return (
    <div className='flex w-[80%] justify-between z-30 transition-all duration-500'>
      {buckets.map((bucket, index) => (
        <div key={index} className="relative group transition-all duration-300">
          <IndividualBucket 
            bucketNum={index + 1} 
            percentage={bucket.percentage} 
            onNumberDropped={onNumberDropped}
            emotionData={bucket.emotions}
          />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-40">
            <BucketInfo emotionData={bucket.emotions} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Buckets