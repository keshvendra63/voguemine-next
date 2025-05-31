"use client";
import React, { useEffect, useState } from "react";
import styles from "./carousel.module.css";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";

const Carousel = ({banners}) => {

  const images = [
   banners[0],
   banners[1],
   banners[2],
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadComplete, setLoadComplete] = useState(false);


  useEffect(() => {
    // Auto-slide logic with proper cleanup
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup the interval
  }, [images.length]);

  // Manual navigation functions
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
  };
  

  return (
    <div className={styles.carousel}>
      <div className={styles.imageWrapper}>
            <Link href={images[currentIndex]?.link || ""}>
             <Image 
        src={modifyCloudinaryUrl(images[currentIndex]?.url)}
          alt={`Slide ${currentIndex + 1}`}
          className={styles.image}
          width={50}
          height={50}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,..."
          />
            </Link>

       
      </div>

      {/* Navigation Buttons */}
      <div className={styles.buttons}>
        <button aria-label="Prev Button" onClick={prevImage} className={styles.prevButton}>
          <GrPrevious/>
        </button>
        <button aria-label="Next Button" onClick={nextImage} className={styles.nextButton}>
          <GrNext/>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
