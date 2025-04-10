import React from 'react'
import Image from 'next/image';
import styles from './blogs.module.css'
import Link from 'next/link';
import logo from '../../../images/vlogo.png'

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Voguemine Blog | Fashion Trends, Style Tips & Wardrobe Inspiration",
  description:
    "Explore the latest trends, fashion tips, and style guides on Voguemine. Stay updated with expert insights, reviews, and more to elevate your wardrobe and keep your fashion game strong with our daily blogs.",
  keywords: ["Men's Loafers", "Premium Shoes", "Voguemine","Premium Clothes","Men's Clothing","Women's Clothing","Kid's Clothing","Accessries","Premium Products","Men's Sneakers","Men's Shirts","T-shirts","Shirts"],
  openGraph: {
    title: "Voguemine Blog | Fashion Trends, Style Tips & Wardrobe Inspiration",
    description:
      "Explore the latest trends, fashion tips, and style guides on Voguemine. Stay updated with expert insights, reviews, and more to elevate your wardrobe and keep your fashion game strong with our daily blogs.",
    url: "https://voguemine.com/blogs",
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
    canonical: "https://voguemine.com/blogs",
  },
  icons: {
    icon: "https://voguemine.com/favicon-32x32.png", // Default favicon
    apple: "https://voguemine.com/apple-touch-icon.png", // Apple Touch Icon
    shortcut: "https://voguemine.com/favicon.ico", // Shortcut Icon
  },
  other: {
    // Add custom meta tags here
    "title": "Voguemine Blog | Fashion Trends, Style Tips & Wardrobe Inspiration",
  },
};

const page = async() => {

   let blogs=[]
   try{
    const response=await fetch(`${process.env.API_PORT}blogs/get-blogs`)
    const data=await response.json()
    if(data?.length>0){
        blogs=data
    }
    else{
        console.log("No Blogs Found")
        window.location.reload()

    }

   }catch(err){
    console.log(err)
    window.location.reload()

   }
   const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
  };
  return (
    <div className={styles.blogs}>
        <h1>Voguemine's Blogs</h1>
        <div className={styles.blogList}>
            {
                blogs && blogs?.map((item,index)=>{
                    return <div className={styles.blog} key={index}>
                    <Image src={modifyCloudinaryUrl(item?.images[0]?.url) || logo} alt="" width={500} height={500}/>
                    <p className={styles.blogTitle}>{item?.title}</p>
                    <p dangerouslySetInnerHTML={{ __html: item?.description }} />                    
                    <Link href={`/blogs/news/${item?.handle}`}>
                    <button>Read More</button>
                    </Link>
                </div>
                })
            }
        </div>
    </div>
  )
}

export default page
