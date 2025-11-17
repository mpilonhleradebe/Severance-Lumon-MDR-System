import React from 'react'

function IndividualBucket(
    { bucketNum, percentage }: { bucketNum: number; percentage: number }
) {



  return (
      <div
        className='w-60 h-[50px] bg-[#1C314A] flex flex-col items-center justify-center rounded-[10px] px-2 transition-shadow duration-200 hover:shadow-[0_-8px_10px_-4px_#0A1A2C]'
      >
          
          {/* bucket number and percentage */}
          <div className="flex w-full justify-between items-center">
              <h1 className='text-[#A3F3FA] font-bold'>0{bucketNum}</h1>
              <h1 className='text-[#2BA1B5] font-bold text-[10px]'>{percentage}%</h1>
          </div>
          {/* progress bar */}
          <div className="w-full h-[2px] bg-[#0A1A2C] rounded mt-0.5 overflow-hidden">
            <div
              className="h-full bg-[#2BA1B5]"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
      </div>
  )
}

export default IndividualBucket