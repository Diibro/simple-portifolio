'use client';

import Image from 'next/image';
import React, { useState } from 'react'
import MyImage from './MyImage';

interface IImageSlider{
     images: Array<string>
     rounded: string
}

const ImageSlider:React.FC<IImageSlider> = ({images, rounded}) => {
     const [currentIndex, setCurrentIndex] = useState(0);

     const handlePrev = () => {
          setCurrentIndex((prevIndex) =>
               prevIndex === 0 ? images.length - 1 : prevIndex - 1
          );
     };

     const handleNext = () => {
          setCurrentIndex((prevIndex) =>
               prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
     };

     const handleTouchMove = (event: React.TouchEvent) => {
          const touchStartX = event.changedTouches[0].clientX;
          if (touchStartX < window.innerWidth / 2) {
               handlePrev();
          } else {
               handleNext();
          }
     };
     
     return (
          <div className="relative w-full h-full overflow-hidden" onTouchEnd={handleTouchMove}>
               {/* <Image width={600} height={600} alt="slider-image" src={images[0] } className={`w-full h-full rounded-[${rounded}] `} /> */}
               <MyImage image={images[0] } rounded={rounded} />
     </div>
     )
}

export default ImageSlider