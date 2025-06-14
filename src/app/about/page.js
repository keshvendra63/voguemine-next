import React from 'react'
import styles from './about.module.css'
import Image from 'next/image'
export const metadata = {
  title: "About Us | VOGUEMINE",
  description:
    "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
  keywords: ["Voguemine","Accessories","Footwear","Men's Clothing","Women's Clothing","Kid's Clothing","About Voguemine"],
  openGraph: {
    title: "About Us | VOGUEMINE",
    description:
      "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
    url: "https://voguemine.com/about",
    images: [
      {
        url: "https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_50/v1726468497/yf1i2xjopwmnp9cszgtt.jpg",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://voguemine.com/about",
  },
  icons: {
    icon: "https://voguemine.com/favicon-32x32.png", // Default favicon
    apple: "https://voguemine.com/apple-touch-icon.png", // Apple Touch Icon
    shortcut: "https://voguemine.com/favicon.ico", // Shortcut Icon
  },
  other: {
    // Add custom meta tags here
    "title": "About Us | VOGUEMINE",
  },
};
const page = () => {
  return (
    <div className={styles.about}>
      <h1>About Voguemine</h1>
      <div  className={styles.about1}>
      <Image src="https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_50/v1726468497/yf1i2xjopwmnp9cszgtt.jpg" alt="about voguemine" width={512} height={400} style={{width:"100%",height:"100%",objectFit:"contain"}}/>
      <div>
      <p>At Voguemine, we truly believe that style is not just about the clothes you wear or the accessories you carry—it’s an expression of who you are and how you feel. Fashion is a reflection of confidence, individuality, and luxury, and we aim to make every moment of your shopping journey unforgettable. That’s why we go the extra mile to ensure an exceptional experience for our customers, providing unparalleled service and a seamless, user-friendly online platform. Our intuitive website is designed to make browsing and selecting the perfect pieces effortless, so you can effortlessly elevate your wardrobe with the finest collections we have to offer.</p>
      <p>Our dedicated team of fashion enthusiasts and experts has meticulously curated a breathtaking selection of luxury high-end designer apparel, footwear, and accessories. Each item in our collection is carefully handpicked to reflect the latest trends in high fashion while maintaining the timeless appeal of classic luxury. From elegant shirts and dresses to stunning shoes and branded accessories, every piece in our collection is thoroughly inspected to guarantee the highest standards of quality and authenticity.</p>
      <p>At Voguemine, we don’t just sell premium products—we deliver an unparalleled luxury experience that makes you feel confident, sophisticated, and ready to take on the world. Whether you’re enhancing your everyday wardrobe or seeking standout pieces for special occasions, we’re here to ensure that you find exactly what you need to look and feel your absolute best.</p>
      </div>
      </div>
    </div>
  )
}

export default page
