import React from 'react';
import styles from './footer.module.css';
import Link from 'next/link';
import { FaFacebookSquare, FaWhatsappSquare, FaInstagramSquare } from 'react-icons/fa';
import { FaSquarePhone } from 'react-icons/fa6';
import Image from 'next/image';
import logo from '../images/vlogo.png';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.topFooter}>
                <div className={styles.topLeft}>
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="Voguemine Logo"
                            width={1024}
                            height={35}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,..."
                        />
                    </Link>

                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/men">Mens</Link></li>
                        <li><Link href="/women">Womens</Link></li>
                        <li><Link href="/kids">Kids</Link></li>
                        <li><Link href="/accessories">Accessories</Link></li>
                        <li><Link href="/blogs">Blogs</Link></li>
                    </ul>
                </div>

                <div className={styles.topRight}>
                    <p>Get your order details</p>
                    <div>
                        <input type="text" placeholder="Enter your Email" />
                        <Link href="/track-order"><button>Track</button></Link>
                    </div>
                </div>
            </div>

            <div className={styles.bottomFooter}>
                <div className={styles.bottomOne}>
                    <ul>
                        <li><Link href="/pages/contact">Contact Us</Link></li>
                        <li>|</li>
                        <li><Link href="/pages/terms-of-service">Terms of Service</Link></li>
                        <li>|</li>
                        <li><Link href="/pages/privacy-policy">Privacy Policy</Link></li>
                        <li>|</li>
                        <li><Link href="/pages/shipping-policy">Shipping Policy</Link></li>
                        <li>|</li>
                        <li><Link href="/pages/refund-and-return-policy">Exchange Policy</Link></li>
                    </ul>
                </div>

                <div className={styles.bottomTwo}>
                    <p>© 2025, Voguemine</p>
                    <ul>
                        <li>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                href="https://www.facebook.com/vogueminefashion"
                            >
                                <FaFacebookSquare />
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                href="https://www.instagram.com/voguemine_fashion/"
                            >
                                <FaInstagramSquare />
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Whatsapp"
                                href="https://wa.me/+919899202079?text=Hello there!"
                            >
                                <FaWhatsappSquare />
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Phone"
                                href="tel:+919811363736"
                            >
                                <FaSquarePhone />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
