import React from 'react'
import styles from '../category.module.css'
import Link from 'next/link';
import Image from 'next/image';
export const dynamic = 'force-dynamic';


const fetchMensData = async () => {
  // Connect to MongoDB
  try{
    const response=await fetch(`${process.env.API_PORT}collection/web-category?category=women`)
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
  return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_50/${urlParts[1]}`;
};



export async function generateMetadata() {
  const mensData = await fetchMensData();
  const categories = [...new Set(mensData?.map((item) => item?.category))];

  return {
  title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
  description:
    "Explore the stylish collection of woman's fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern woman. Shop now!",
  keywords: categories,
  openGraph: {
    title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
    description:
      "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
    url: "https://voguemine.com/women",
    images: [
      {
        url: "https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_50/v1712294902/yobby4ueygp6xuraay9h.webp",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://voguemine.com/women",
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
  const womensData = await fetchMensData();

  return (

    <div className={`${styles.category} ${styles.category1}`}>
      <div className={styles.path}>
        <p><span>Home</span><span>/</span><span>Women's Premium Products</span></p>
      </div>
      <h1><span>Women's Premium</span> <span>Products</span></h1>
      <div className={styles.categoryList}>
      {womensData?.sort((a, b) => (a?.order ?? Infinity) - (b?.order ?? Infinity))?.map((item, index) => (
            <div className={styles.cate} key={index}>
              <Link href={`/collections/${item?.handle}`}>
<Image src={modifyCloudinaryUrl(item?.images[0]?.url)} alt={item?.title} width={100} height={100} placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>              
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
