import React from 'react'

const AssetsSection = () => {
  return (
    <>
        <div className=' w-full'>
			<div className='flex justify-between'>
				<div className='text-[#9B9B9B] font-semibold text-[22px]'>Assets Issued</div>
				<div className='bg-[#ECFDF3] flex justify-center items-center rounded-2xl px-2  text-xs font-medium text-[#027A48]'>
					3 Assigned
				</div>
			</div>

            {/* Assets */}

            <div className='flex flex-col mt-5 '>
                <div className='flex justify-start items-center gap-4 pb-4 border-b'>
                    <div className=''>
                        <img src="/media/mac-2.png" alt="Asset-1" />
                    </div>
                    <div>
                        <div className='font-semibold text-xl'>Macbook Pro 2023</div>
                        <div className='text-[#7C7C7C] font-medium text-base'>12GB . 512GB</div>
                        <div className='bg-[#ECFDF3] flex justify-center items-center rounded-2xl px-2 py-0.5 text-xs font-medium text-[#027A48] w-[56px] mt-1'>
                            Laptop
                        </div>
                    </div>
                </div>


                <div className='flex justify-start items-center gap-4 py-4 border-b'>
                    <div className=''>
                        <img src="/media/mac-2.png" alt="Asset-1" />
                    </div>
                    <div>
                        <div className='font-semibold text-xl'>Apple iPad Air 10.9”</div>
                        <div className='text-[#7C7C7C] font-medium text-base'>8GB . 512GB</div>
                        <div className='bg-[#FFE6E6] flex justify-center items-center rounded-2xl px-2 py-0.5 text-xs font-medium text-[#E86868] w-[56px] mt-1'>
                            Tablet
                        </div>
                    </div>
                </div>

                <div className='text-[#9B9B9B] font-semibold text-lg my-2 text-center'>+1 more</div>

                <button className='text-white bg-black font-semibold text-lg w-full mt-2 py-3 rounded-full'>Manage Assets</button>
            </div>
		</div>
    </>
  )
}

export default AssetsSection