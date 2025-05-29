import React from 'react'
import styles from '../category.module.css'
import Link from 'next/link';
import Image from 'next/image';
export const dynamic = 'force-dynamic';


const fetchMensData = async () => {
  // Connect to MongoDB
  try{
    const response=await fetch(`${process.env.API_PORT}collection/web-category?category=accessories`)
    const data=await response.json()
    if(response.ok){
      return data
    }
    else{
      console.log("Unable to fetch Collection")
      

      return null
    }

  }
  catch(err){
    console.log(err)
    

  }

};

const modifyCloudinaryUrl = (url) => {
  const urlParts = url?.split('/upload/');
  return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
};


export async function generateMetadata() {
  const mensData = await fetchMensData();
  const categories = [...new Set(mensData?.map((item) => item?.category))];

  return {
  title: "Men's Accessories | Premium Belts, Sunglasses, Caps & More - Voguemine",
  description:
    "Discover premium men's accessories at Voguemine. Shop stylish belts, sunglasses, caps, and more to enhance your look. Find high-quality, fashionable pieces to complete your ensemble. Shop now",
  keywords: categories,
  openGraph: {
    title: "Men's Accessories | Premium Belts, Sunglasses, Caps & More - Voguemine",
    description:
      "Discover premium men's accessories at Voguemine. Shop stylish belts, sunglasses, caps, and more to enhance your look. Find high-quality, fashionable pieces to complete your ensemble. Shop now",
    url: "https://voguemine.com/accessories",
    images: [
      {
        url: "https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_auto/v1725368213/w71puywht4q7o4iqa6br.jpg",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://voguemine.com/accessories",
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
}

const page = async() => {
const accessoriesData = await fetchMensData();

  return (
    <div className={`${styles.category} ${styles.category3}`}>
      <div className={styles.path}>
        <p><span>Home</span><span>/</span><span>Premium Accessories</span></p>
      </div>
      <h1><span>Premium</span> <span>Accessories</span></h1>
      <div className={styles.categoryList}>
      {accessoriesData?.sort((a, b) => (a?.order ?? Infinity) - (b?.order ?? Infinity))?.map((item, index) => (
            <div className={styles.cate} key={index}>
              <Link href={`/collections/${item?.handle}`} >
              <Image src={modifyCloudinaryUrl(item?.images[0]?.url)} alt={item?.title} width={512} height={512} style={{width:"100%",height: "auto"}}/>
              <div className={styles.info}>
                <p className={styles.collectioName}>{item?.category}</p>
                <button>SHOP NOW</button>
              </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default page
