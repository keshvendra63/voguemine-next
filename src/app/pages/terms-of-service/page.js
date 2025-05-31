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
    url: "https://voguemine.com/pages/terms-of-service",
    images: [
      {
        url: "https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_30/v1734682478/dfzq7rtgtph2r965mtjq.jpg",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://voguemine.com/pages/terms-of-service",
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
      <h1>Terms of Service</h1>
      <p>Welcome to Voguemine, your go-to destination for the latest in fashion. Please read these terms and conditions carefully before using our website, www.voguemine.com, and any associated services. By accessing or using our website, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please do not use our website.</p>
      <p className={styles.bold}>1. Acceptance of Terms</p>
      <p>By accessing or using Voguemine, you agree to be bound by these terms and conditions, which constitute a legally binding agreement between you and Voguemine. These terms apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.</p>
      <p className={styles.bold}>2. Online Store Terms</p>
      <p>2.1. By agreeing to these terms, you confirm that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
      <p>2.2. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>
      <p>2.3. You must not transmit any worms or viruses or any code of a destructive nature.</p>
      <p>2.4. A breach or violation of any of the terms will result in an immediate termination of your services.</p>
      <p className={styles.bold}>3. Personal Information</p>
      <p>3.1. Your submission of personal information through the store is governed by our Privacy Policy. View our Privacy Policy here.</p>
      <p className={styles.bold}>4. Accuracy, Completeness, and Timeliness of Information</p>
      <p>4.1. We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete, or more timely sources of information.</p>
    <p className={styles.bold}>5. Modifications to the Service and Prices</p>
    <p>5.1. Prices for our products are subject to change without notice.</p>
    <p>5.2. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>
    <p className={styles.bold}>6. Governing Law</p>
    <p>6.1. These terms and conditions are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the Indian courts.</p>
    <p className={styles.bold}>7. Contact Information</p>
    <p>If you have any questions about these terms and conditions, please contact us at <a href="mailto:info@voguemine.com">info@voguemine.com</a> and <a href="tel:+919899202079">+919899202079</a></p>
    </div>
  )
}

export default page
