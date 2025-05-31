import React from 'react'
import styles from './page.module.css'
import Prdt4Grid from '../../components/Prdt4Grid';
import TrendingCol from '../../components/TrendingCol';
import Carousel from '../../components/Carousel';
import Category from '../../components/Category';
import RatingsCarousel from '../../components/RatingsCarousel';
import Image from 'next/image';

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
  description:
    "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
  keywords: ["Men's Loafers", "Premium Shoes", "Voguemine", "Premium Clothes", "Men's Clothing", "Women's Clothing", "Kid's Clothing", "Accessries", "Premium Products", "Men's Sneakers", "Men's Shirts", "T-shirts", "Shirts"],
  openGraph: {
    title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
    description:
      "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
    url: "https://voguemine.com/",
    images: [
      {
        url: "https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_30/v1732017754/qcykdxftz90kqc8mwfso.jpg",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://voguemine.com/",
  },
  icons: {
    icon: "https://voguemine.com/favicon-32x32.png", // Default favicon
    apple: "https://voguemine.com/apple-touch-icon.png", // Apple Touch Icon
    shortcut: "https://voguemine.com/favicon.ico", // Shortcut Icon
  },
  other: {
    // Add custom meta tags here
    "title": "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
  },
};




const page = async () => {
  let featured;
  let collectionData = []
  let banners = []


  const fetchFeatured = async () => {
    try {
      const response = await fetch(`${process.env.API_PORT}products/featured`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        featured = data?.data
      } else {
        console.error("Error fetching featured Products:", data.error);


      }
    } catch (error) {
      console.error("Error fetching featured Products:", error.message);


    }
  };
  const fetchCollections = async () => {
    try {
      const response = await fetch(`${process.env.API_PORT}collection/trending-collections`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        collectionData = data?.data
      } else {
        console.error("Error fetching featured Products:", data.error);


      }
    } catch (error) {
      console.error("Error fetching featured Products:", error.message);


    }
  };
  const fetchBanners = async () => {
    try {
      const response = await fetch(`${process.env.API_PORT}banner/get-banners?id=677bc6e15dab1ba1f11b74a1`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (response.ok) {
        banners = data

      } else {
        console.error("Error fetching banners:", data.error);


      }
    } catch (error) {
      console.error("Error fetching banners:", error.message);


    }
  };


  await fetchFeatured();
  await fetchCollections();
  await fetchBanners()
  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_30/${urlParts[1]}`;
  };

  return (
    <div className={styles.home}>
      <h1 style={{display:"none"}}>HOME</h1>
      <Carousel banners={banners.banners} />
      <Category banners={banners.banners} />
      <div className={`${styles.trendingProducts} ${styles.newProducts}`}>
        <h2><span>NEW</span><span> ARRIVALS</span></h2>
        <Prdt4Grid prdts={featured?.latestProducts} color="black" />
      </div>
      <div className={styles.ribbanBanner}>
        <Image src={modifyCloudinaryUrl(banners?.banners[7]?.url) || ""} alt='Offer Banner' width={500} height={500} placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>
      </div>

      <TrendingCol collections={collectionData?.featuredCollections} prdts={collectionData?.mostFeaturedProducts} collection={collectionData?.mostTrendingCollection} color="black" />
      <div className={styles.trendingProducts}>
        <h2><span>What Our Customers Says</span></h2>
        <RatingsCarousel />
      </div>
      <div className={styles.trendingProducts}>
        <div className={styles.shippings}>
          <div>
            <Image src={modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1748672342/ICON_1_xpz6f2.svg")} width={50} height={50} alt="Fast Shipping" placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>
            <p>Fast Shipping</p>
          </div>
          <div>
            <Image src={modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1748672777/ICON_3_1_mgayci.svg")} width={50} height={50} alt="Easy Exchange" placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>
            <p>Easy Exchange</p>
          </div>
          <div>
            <Image src={modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1748672343/ICON_2_npns1d.svg")} width={50} height={50} alt="Secure Payments" placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>
            <p>Secure Payments</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default page
