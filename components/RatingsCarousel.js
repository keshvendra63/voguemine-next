'use client';
import React,{ useRef } from 'react';
import styles from '../src/app/page.module.css';
import Image from 'next/image';
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const RatingsCarousel = () => {
    const containerRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = container.offsetWidth / 2;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };


  const ratings = [
    {
        title: "Gucci Embroidered logo Premium Ankle Socks - Pack of 5",
        handle: "gucci-embroidered-logo-premium-ankle-socks",
        images: "https://res.cloudinary.com/dqh6bd766/image/upload/v1726809630/ru5w8u0ltdqvbzdias0r.png",
        latestRating: {
            star: 5,
            name: "Neha Singh",
            email: "kum6neha@gmail.com",
            comment: "Absolutely love this product! - Gucci Embroidered logo Premium Ankle Socks - Pack of 5",
            id: "67a0b733eb02b3795a90659d"
        }
    },
    
    {
        title: "Gucci GG Embroidery Premium Ankle Socks - Pack of 5",
        handle: "gucci-gg-embroidery-premium-ankle-socks",
        images: "https://res.cloudinary.com/dqh6bd766/image/upload/v1710314268/l4txuopcv1j6npz81i4q.jpg",
        latestRating: {
            star: 5,
            name: "Hargovind",
            email: "hari113@gmail.com",
            comment: "Premium quality, authentic product! - Gucci GG Embroidery Premium Ankle Socks - Pack of 5",
            id: "67a0b733eb02b3795a9065a7"
        }
    },
    
    {
        title: "Gucci Premium Quality Ankle Socks - Pack of 5",
        handle: "gucci-premium-quality-best-ankle-socks",
        images: "https://res.cloudinary.com/dqh6bd766/image/upload/v1726809336/d9sc3ve2emfdcfu3yoqh.png",
        latestRating: {
            star: 5,
            name: "Kunal Kumar",
            email: "kum6neha@gmail.com",
            comment: "Totally worth the price! - Gucci Premium Quality Ankle Socks - Pack of 5",
            id: "67a0b733eb02b3795a9065b1"
        }
    },
    
    {
        title: "Gucci Embroidered logo Black Cotton Co-ord Set",
        handle: "gucci-embroidered-logo-black-cotton-co-ord-set",
        images: "https://res.cloudinary.com/dqh6bd766/image/upload/v1719319976/p27bgshfjnbrhhxy5oqr.jpg",
        latestRating: {
            star: 5,
            name: "Yogendra",
            email: "kum6neha@gmail.com",
            comment: "Best quality, highly recommend! - Gucci Embroidered logo Black Cotton Co-ord Set",
            id: "67a0b733eb02b3795a9065bb"
        }
    },
    
    {
        title: "Gucci Blue Premium Quality Polo T-shirt",
        handle: "gucci-premium-quality-fabric-cotton-polo-t-shirt",
        images: "https://res.cloudinary.com/dqh6bd766/image/upload/v1719663920/p44u9foq0dw8dmleogas.jpg",
        latestRating: {
            star: 5,
            name: "Ashu",
            email: "gautam229@gmail.com",
            comment: "Premium quality, authentic product! - Gucci Blue Premium Quality Polo T-shirt",
            id: "67a0b733eb02b3795a9065ce"
        }
    },
    
    {
        title: "Gucci White Premium Quality Shirt",
        handle: "gucci-premium-quality-cotton-formal-shirt",
        images: "https://res.cloudinary.com/dqh6bd766/image/upload/v1721374957/rn2jpuycslzxvdsnncp5.jpg",
        latestRating: {
            star: 5,
            name: "Priya Aggarwal",
            email: "hari113@gmail.com",
            comment: "Best quality, highly recommend! - Gucci White Premium Quality Shirt",
            id: "67a0b734eb02b3795a9065e4"
        }
    },
    
    {
        title: "Gucci White Premium Quality T-shirt For Kids",
        handle: "gucci-white-premium-quality-t-shirt-for-kids",
        images: "https://res.cloudinary.com/dqh6bd766/image/upload/v1712747567/b1ujelbkkotmsfzv8jfs.jpg",
        latestRating: {
            star: 5,
            name: "Hari Kumar",
            email: "kum6neha@gmail.com",
            comment: "Totally worth the price! - Gucci White Premium Quality T-shirt For Kids",
            id: "67a0b734eb02b3795a9065f7"
        }
    },
    
    {
        title: "Gucci Premium Quality No Show - Pack of 5",
        handle: "gucci-premium-quality-cotton-no show",
        images: "https://res.cloudinary.com/dqh6bd766/image/upload/v1722343008/avqjkhg6e2trmwy87etp.jpg",
        latestRating: {
            star: 5,
            name: "Jasvant",
            email: "kum6neha@gmail.com",
            comment: "Absolutely love this product! - Gucci Premium Quality No Show - Pack of 5",
            id: "67a0b734eb02b3795a906610"
        }
    },
    
    {
        title: "Gucci Bee Embroidered Black Premium Shirt",
        handle: "gucci-bee-embroidered-black-premium-shirt",
        images: "https://res.cloudinary.com/dqh6bd766/image/upload/v1719311747/khvhykxpirvdjrd925xd.jpg",
        latestRating: {
            star: 5,
            name: "Mayur",
            email: "hari113@gmail.com",
            comment: "Best quality, highly recommend! - Gucci Bee Embroidered Black Premium Shirt",
            id: "67a0b734eb02b3795a90661a"
        }
    },
    
    {
        title: "Gucci Cat Print Navy Blue Premium Shirt",
        handle: "gucci-cat-print-navy-blue-premium-shirt",
        images: "https://res.cloudinary.com/dqh6bd766/image/upload/v1719218251/llfmq3k4fykgwhxrnxbu.jpg",
        latestRating: {
            star: 5,
            name: "Krishna",
            email: "hari113@gmail.com",
            comment: "Will buy again for sure! - Gucci Cat Print Navy Blue Premium Shirt",
            id: "67a0b734eb02b3795a90662d"
        }
    }
];
  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_50/${urlParts[1]}`;
  };

  return (
    <div className={styles.ratingsCarousel}>
      <button aria-label="Prev Button" onClick={() => scroll('left')} className={styles.arrow}><FaArrowCircleLeft/></button>
      <div className={styles.carouselContainer} ref={containerRef}>
        {ratings.map((item, index) => (
          <div key={index} className={styles.carouselItem}>
            <Image
              src={modifyCloudinaryUrl(item.images)}
              alt={item.title}
              width={100}
              height={100}
              placeholder='blur' 
              blurDataURL="data:image/jpeg;base64,..."
              className={styles.image}
            />
            <p className={styles.title}>{item.title}</p>
            <p className={styles.rating}>{item.latestRating?.name}</p>
            <p className={styles.ratingStar}>⭐⭐⭐⭐⭐</p>
            <p className={styles.ratingDesc}>{item.latestRating?.comment}</p>
          </div>
        ))}
      </div>
      <button aria-label="Next Button" onClick={() => scroll('right')} className={styles.arrow}><FaArrowCircleRight/></button>
    </div>
  );
};

export default RatingsCarousel;
