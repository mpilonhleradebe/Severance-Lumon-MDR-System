import React from 'react'
import IndividualBucket from './IndividualBucket'

function Buckets() {

    const BucketInfo = () => {
      
    return (
      <div className="w-50 h-auto bg-[#1C314A] flex flex-col rounded-[10px] px-2 py-5 gap-2">
        {/* WO */}
        <div className="flex flex-row items-center gap-2">
          <p className="text-[#A3F3FA] font-bold w-6 text-[13px]">WO</p>
          <div className="w-full h-0.5 bg-[#0A1A2C] rounded overflow-hidden">
            <div className="h-full bg-[#2BA1B5]" style={{ width: `10%` }}></div>
          </div>
        </div>

        {/* FC */}
        <div className="flex flex-row items-center gap-2">
          <p className="text-[#A3F3FA] font-bold w-6 text-[13px]">FC</p>
          <div className="w-full h-[2px] bg-[#0A1A2C] rounded overflow-hidden">
            <div className="h-full bg-[#2BA1B5]" style={{ width: `40%` }}></div>
          </div>
        </div>

        {/* DR */}
        <div className="flex flex-row items-center gap-2">
          <p className="text-[#A3F3FA] font-bold w-6 text-[13px]">DR</p>
          <div className="w-full h-[2px] bg-[#0A1A2C] rounded overflow-hidden">
            <div className="h-full bg-[#2BA1B5]}" style={{ width: `65%` }}></div>
          </div>
        </div>

        {/* MA */}
        <div className="flex flex-row items-center gap-2">
          <p className="text-[#A3F3FA] font-bold w-6 text-[13px]">MA</p>
          <div className="w-full h-[2px] bg-[#0A1A2C] rounded overflow-hidden">
            <div className="h-full bg-[#2BA1B5]" style={{ width: `25%` }}></div>
          </div>
        </div>
      </div>
    )
    }

  return (
    <>
            <div className='flex w-[80%] justify-between z-51'>
          {/* bucket 1 */}
          <div className="relative group">
            <IndividualBucket bucketNum={1} percentage = {23} />
            <div className="absolute left-4 bottom-10 hidden group-hover:block -z-10 justify-center">
              <BucketInfo />
            </div>
          </div>
          {/* bucket 2 */}
          <div className="relative group">
            <IndividualBucket bucketNum={2} percentage = {55}/>
            <div className="absolute left-4 bottom-10 hidden group-hover:block -z-10 justify-center">
              <BucketInfo />
            </div>
          </div>
          {/* bucket 3 */}
          <div className="relative group">
            <IndividualBucket bucketNum={3} percentage = {65}/>
            <div className="absolute left-4 bottom-10 hidden group-hover:block -z-10 justify-center">
              <BucketInfo />
            </div>
          </div>
          {/* bucket 4 */}
          <div className="relative group">
            <IndividualBucket bucketNum={4} percentage = {12}/>
            <div className="absolute left-4 bottom-10 hidden group-hover:block -z-10 justify-center">
              <BucketInfo />
            </div>
          </div>
          {/* bucket 5 */}
          <div className="relative group">
            <IndividualBucket bucketNum={5} percentage = {4}/>
            <div className="absolute left-4 bottom-10 hidden group-hover:block -z-10 justify-center">
              <BucketInfo />
            </div>
          </div>
    </div>
    </>
  )
}

export default Buckets