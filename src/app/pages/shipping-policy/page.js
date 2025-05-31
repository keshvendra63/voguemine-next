import React from 'react'
import styles from '../policy.module.css'

export const metadata = {
  title: "Policies - Voguemine",
  description:
    "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
  keywords: ["Voguemine","Accessories","Footwear","Men's Clothing","Women's Clothing","Kid's Clothing","About Voguemine"],
  openGraph: {
    title: "Policies - Voguemine",
    description:
      "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
    url: "https://voguemine.com/pages/shipping-policy",
    images: [
      {
        url: "https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_auto/v1734682478/dfzq7rtgtph2r965mtjq.jpg",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://voguemine.com/pages/shipping-policy",
  },
  icons: {
    icon: "https://voguemine.com/favicon-32x32.png", // Default favicon
    apple: "https://voguemine.com/apple-touch-icon.png", // Apple Touch Icon
    shortcut: "https://voguemine.com/favicon.ico", // Shortcut Icon
  },
  other: {
    // Add custom meta tags here
    "title": "Policies - Voguemine"
  },
};
const page = () => {
  return (
    <div className={styles.policy}>
      <h1>Shipping Policy</h1>
      <p>At Voguemine, we strive to provide our customers with the best possible shopping experience. That's why we offer fast and reliable shipping worldwide.</p>
      <p className={styles.bold}>Order Processing:</p>
      <p>1. All orders are processed within 1-2 business days</p>
      <p>2. All the orders are delivered within 2-5 Business days</p>
      <p className={styles.bold}>COD Orders Processing:</p>
      <p>1. After Placing a COD order, you will receive a WhatsApp text to confirm your order</p>
      <p>2. You will also receive a call from our order processing department to confirm your location</p>
      <p>In the event that your order is lost or damaged during shipping, please contact us immediately and we will do our best to resolve the issue.</p>
      <p>Thank you for shopping with Voguemine. If you have any questions or concerns, please don't hesitate to contact us.</p>
    </div>
  )
}

export default page
