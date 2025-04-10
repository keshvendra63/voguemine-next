import React from 'react'
import styles from './home.module.css'
import Prdt4Grid from '../../../components/Prdt4Grid';
import TrendingCol from '../../../components/TrendingCol';
import Carousel from '../../../components/Carousel';
import Category from '../../../components/Category';
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
  description:
    "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
  keywords: ["Men's Loafers", "Premium Shoes", "Voguemine","Premium Clothes","Men's Clothing","Women's Clothing","Kid's Clothing","Accessries","Premium Products","Men's Sneakers","Men's Shirts","T-shirts","Shirts"],
  openGraph: {
    title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
    description:
      "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
    url: "https://voguemine.com/home",
    images: [
      {
        url: "https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_auto/v1732017754/qcykdxftz90kqc8mwfso.jpg",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://voguemine.com/home",
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




const page =async () => {

 
  let featured;
  let collectionData=[]
  let banners=[]

  const fetchFeatured = async () => {
    try {
      const response = await fetch(`${process.env.API_PORT}products/featured`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.success) {
        featured=data?.data
      } else {
        console.error("Error fetching featured Products:", data.error);
        window.location.reload()

      }
    } catch (error) {
      console.error("Error fetching featured Products:", error.message);
      window.location.reload()

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
        collectionData=data?.data
      } else {
        console.error("Error fetching featured Products:", data.error);
        window.location.reload()

      }
    } catch (error) {
      console.error("Error fetching featured Products:", error.message);
      window.location.reload()

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
        banners=data
      } else {
        console.error("Error fetching banners:", data.error);
        window.location.reload()

      }
    } catch (error) {
      console.error("Error fetching banners:", error.message);
      window.location.reload()

    }
  };
  
  
  await fetchFeatured();
  await fetchCollections();
  await fetchBanners()
  return (
    <div className={styles.home}>
              <Carousel banners={banners.banners}/>
      <Category banners={banners.banners}/>
      <div className={styles.trendingProducts}>
            <h1><span>SHOP BY</span><span> FEATURED</span></h1>
              <Prdt4Grid prdts={featured?.featuredProducts} color="#d2b188"/>
        </div>
       <TrendingCol name="Mens" collections={collectionData?.mens?.mensFeatured} banner={collectionData?.mens?.mensMostFeatured[0]?.images[collectionData?.mens?.mensMostFeatured[0]?.images?.length - 1]?.url} prdts={collectionData?.mens?.mensFeaturedPrdts} color="#d2b188"/>
       <TrendingCol name="Womens" collections={collectionData?.womens?.womensFeatured} banner={collectionData?.womens?.womensMostFeatured[0]?.images[collectionData?.womens?.womensMostFeatured[0]?.images?.length - 1]?.url} prdts={collectionData?.womens?.womensFeaturedPrdts} color="rgb(194, 107, 107)"/>
       <TrendingCol name="Kids" collections={collectionData?.kids?.kidFeatured} banner={collectionData?.kids?.kidMostFeatured[0]?.images[collectionData?.kids?.kidMostFeatured[0]?.images?.length - 1]?.url} prdts={collectionData?.kids?.kidFeaturedPrdts} color="#95c9ec"/>
       <TrendingCol name="Accessories" collections={collectionData?.accessories?.accFeatured} banner={collectionData?.accessories?.accMostFeatured[0]?.images[collectionData?.accessories?.accMostFeatured[0]?.images?.length - 1]?.url} prdts={collectionData?.accessories?.accFeaturedPrdts} color="#7e7e7e"/>

        <div className={`${styles.trendingProducts} ${styles.newProducts}`}>
            <h1><span>NEW</span><span> ARRIVALS</span></h1>
              <Prdt4Grid prdts={featured?.latestProducts} color="#d2b188"/>
        </div>
    </div>
  )
}

export default page
