"use client"
import React, {useEffect, useState } from 'react'
import styles from './offer.module.css'
import { IoMdClose } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const Offer = () => {
  const [showOffer, setShowOffer] = useState(false);
  const pathname = usePathname();
  useEffect(()=>{
setTimeout(()=>{
setShowOffer(true)
},1000)
  },[])

  useEffect(() => {
    // Show the offer only on a page refresh, not on navigation
    if(pathname==="/" || pathname==="/voguemine-admin" || pathname==="/checkout" || pathname==="/thankyou"){
      setShowOffer(false)
    }
    if(showOffer!==false){
      setShowOffer(true)
    }
  }, [pathname]);

  const closeOffer = () => {
    setShowOffer(false); // Temporarily hide the offer
  };

  return (
    <div className={styles.offer} style={{display:showOffer?"flex":"none"}}>
        <div className={styles.bgGif}>
            <img src="https://cdn.pixabay.com/animation/2024/05/02/07/43/07-43-00-535_512.gif" alt="offer" />
        </div>
        <div className={styles.content}>
            <IoMdClose className={styles.closeBtn} onClick={closeOffer}/>
            <img src="https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_auto/v1737615838/banner_21_a7fct6.jpg" alt="offer" />
            <h2>Exclusive Deals Await!</h2>
            <p>Get up to <span>25% OFF</span> on premium picks! Plus, enjoy <span>free shipping</span> on all prepaid orders.</p>
            <p>Hurry, these special offers are only available for a limited time! Don’t miss out on the chance to upgrade your wardrobe at irresistible prices.</p>
            <Link href="/flash-offers"><button onClick={closeOffer}>SHOP NOW</button></Link>
        </div>
      
    </div>
  )
}

export default Offer
