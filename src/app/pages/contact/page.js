import React from 'react'
import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";
import { PiEnvelopeThin } from "react-icons/pi";
import styles from './contact.module.css'

export const metadata = {
  title: "Contact - Voguemine",
  description:
    "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
  keywords: ["Voguemine","Accessories","Footwear","Men's Clothing","Women's Clothing","Kid's Clothing","About Voguemine"],
  openGraph: {
    title: "Contact - Voguemine",
    description:
      "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
    url: "https://voguemine.com/pages/contact",
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
    canonical: "https://voguemine.com/pages/contact",
  },
  icons: {
    icon: "https://voguemine.com/favicon-32x32.png", // Default favicon
    apple: "https://voguemine.com/apple-touch-icon.png", // Apple Touch Icon
    shortcut: "https://voguemine.com/favicon.ico", // Shortcut Icon
  },
  other: {
    // Add custom meta tags here
    "title": "Contact - Voguemine"
  },
};
const contact = () => {
  return (
    <div className={styles.contact}>
        <h1>Contact Us</h1>
      <div className={styles.contacts}>
      <img src="https://img.freepik.com/free-vector/postponed-concept_23-2148496571.jpg" alt="" />
      <div className={styles.contactForm}>
            <div>
                <CiUser style={{color:"black"}}/>
                <input type="text" placeholder='Full Name'/>
            </div>
            <div>
                <CiMail style={{color:"black"}}/>
                <input type="text" placeholder='Email'/>
            </div><div>
                <CiHeadphones style={{color:"black"}}/>
                <input type="text" placeholder='Mobile Number'/>
            </div><div className={styles.contactAddress}>
                <PiEnvelopeThin style={{color:"black"}}/>
                <textarea name="" id="" placeholder='Message'></textarea>
            </div>
            <div className={styles.contactSubmit}>
                <button>Submit</button>
            </div>
      </div>
      </div>
      <div className={styles.contactMap}>
        
      </div>
    </div>
  )
}

export default contact
