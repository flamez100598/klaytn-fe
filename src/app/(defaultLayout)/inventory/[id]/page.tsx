"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
// Import Swiper styles
import 'swiper/css';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
const InventoryDetail = () => {
    const [piecesOwners, setPiecesOwners] = useState(12)
    const widthPiece = {
        width: piecesOwners + '%'
    }
    return (
        <div className='text-white p-2 flex flex-col gap-2 py-4'>
            <h2>
                Rose Garden
            </h2>
            <div className="w-full   rounded-xl p-[5px]">
                <div className="bg-[#121418] p-2 rounded-md pb-4">
                    <p className="text-[#F4F4F4] py-2">Ownered</p>
                    <div className="relative w-full h-full rounded-xl shadow-md">
                        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                            <div className="bg-[#E53903] h-4 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={widthPiece}></div>
                        </div>
                        <p className="absolute top-[-4px] left-[43%] font-bold text-black">{piecesOwners}/100</p>

                    </div>
                </div>
            </div>
            <div>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={2}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <Image
                            src='/images/piece-land.png'
                            loading="lazy"
                            alt="#"
                            width={184}
                            height={184}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            src='/images/piece-land.png'
                            loading="lazy"
                            alt="#"
                            width={184}
                            height={184}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            src='/images/piece-land.png'
                            loading="lazy"
                            alt="#"
                            width={184}
                            height={184}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            src='/images/piece-land.png'
                            loading="lazy"
                            alt="#"
                            width={184}
                            height={184}
                        />
                    </SwiperSlide>

                </Swiper>
            </div>
            <div className="w-full   rounded-xl p-[5px]">
                <div className="bg-[#121418] px-2 rounded-md flex items-center justify-center flex-col gap-2 py-4">
                    <Button className="font-bold w-[326px] h-[49px] py-[16px] mx-auto bg-[#FFAA8F] text-black border-none rounded-[6px] font-[16px]">
                        <span>
                            Purchase
                        </span> 
                        <span className='text-[#E53903] font-bold'>
                        0.4697 ETH / Piece
                        </span>
                    </Button>
                    <Button className="font-bold w-[326px] h-[49px] py-[16px] mx-auto bg-[#8FA8FF] text-black border-none rounded-[6px] font-[16px]">
                        <span>
                        Sell at marketplace
                        </span> 
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InventoryDetail;

