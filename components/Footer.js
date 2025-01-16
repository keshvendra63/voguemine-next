import React, { useContext } from 'react'
import styles from './footer.module.css'
import Link from 'next/link'
import { FaFacebookSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import Image from 'next/image';
import logo from '../images/vlogo.png'
const Footer = () => {
    return (
        <div className={styles.footer}>
           <div className={styles.topFooter}>
                <div className={styles.topLeft}>
                    <Image src={logo} alt="Voguemine Logo" width={1024} height={35}/>
                    <ul>
                        <Link href="/home" ><li>Home</li></Link>
                        <Link href="/about"><li>About</li></Link>
                        <Link href="/men" ><li>Mens</li></Link>
                        <Link href="/women" ><li>Womens</li></Link>
                        <Link href="/kids" ><li>Kids</li></Link>
                        <Link href="/accessories" ><li>Accessories</li></Link>
                    </ul>
                </div>
                <div className={styles.topRight}>
                    <p>Get your order details</p>
                    <div>
                        <input type="text" placeholder='Enter your Email'/>
                        <Link href="/track-order" ><button>Track</button></Link>
                    </div>
                </div>

           </div>
           <div className={styles.bottomFooter}>
           <div className={styles.bottomOne}>
<ul>
<Link href="/pages/contact"><li>Contact Us</li></Link>
<li>|</li>
    <Link href="/pages/terms-of-service"><li>Terms of Service</li></Link>
   <li>|</li>
    <Link href="/pages/privacy-policy"><li>Privacy Policy</li></Link>
    <li>|</li>
    <Link href="/pages/shipping-policy"><li>Shipping Policy</li></Link>
    <li>|</li>
    <Link href="/pages/refund-and-return-policy"><li>Exchange Policy</li></Link>
</ul>
<div></div>
           </div>
           <div className={styles.bottomTwo}>
<p>© 2025, Voguemine</p>
<ul>
<li><a href='https://www.facebook.com/vogueminefashion' style={{textDecoration:"none"}}><FaFacebookSquare/></a></li>
    <li><a href='https://www.instagram.com/voguemine_fashion/' style={{textDecoration:"none"}}><FaInstagramSquare/></a></li>
    <li><a href='https://wa.me/+919899202079?text=Hello there!' style={{textDecoration:"none"}}><FaWhatsappSquare/></a></li>
    <li><a href='tel:+919811363736' style={{textDecoration:"none"}}><FaSquarePhone/></a></li>
</ul>
           </div>
           </div>
        </div>
    )
}

export default Footer
