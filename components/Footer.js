import React, { useState } from 'react';
import styles from './footer.module.css';
import Link from 'next/link';
import { FaFacebookSquare, FaWhatsappSquare, FaInstagramSquare } from 'react-icons/fa';
import { FaSquarePhone, FaTwitter, FaPinterest } from 'react-icons/fa6';
import Image from 'next/image';
import logo from '../images/vlogo.png';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter submission
        console.log('Newsletter signup:', { email, isChecked });
    };

    return (
        <div className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.newsletterSection}>
                    <h3>SIGN UP FOR NEWSLETTER</h3>
                    <form onSubmit={handleSubmit} className={styles.newsletterForm}>
                        <div className={styles.inputWrapper}>
                            <input 
                                type="email" 
                                placeholder="enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">SUBMIT</button>
                        </div>
                    </form>
                    <div className={styles.consent}>
                        <input 
                            type="checkbox" 
                            id="consent"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <label htmlFor="consent">
                            By providing your email, you consent to our{' '}
                            <Link href="/pages/privacy-policy">Privacy Policy</Link> and{' '}
                            <Link href="/pages/terms-of-service">Terms & Conditions</Link>.
                        </label>
                    </div>

                    <div className={styles.socialSection}>
                        <h4>FOLLOW US</h4>
                        <div className={styles.socialIcons}>
                            <a
                                href="https://www.facebook.com/vogueminefashion"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <FaFacebookSquare />
                            </a>
                            <a
                                href="https://www.instagram.com/voguemine_fashion/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <FaInstagramSquare />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Pinterest"
                            >
                                <FaPinterest />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                            >
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.linksSection}>
                    <div className={styles.linkColumn}>
                        <h4>SHOP BY</h4>
                        <ul>
                            <li><Link href="/women">Women</Link></li>
                            <li><Link href="/men">Men</Link></li>
                            <li><Link href="/kids">Kids</Link></li>
                            <li><Link href="/accessories">Bags & Accessories</Link></li>
                        </ul>
                    </div>

                    <div className={styles.linkColumn}>
                        <h4>INFORMATION</h4>
                        <ul>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/blogs">Blog</Link></li>
                            <li><Link href="/pages/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className={styles.linkColumn}>
                        <h4>CUSTOMER SERVICE</h4>
                        <ul>
                            <li><Link href="/track-order">Orders And Returns</Link></li>
                            <li><Link href="/pages/refund-and-return-policy">Exchange Policy</Link></li>
                            <li><Link href="/pages/shipping-policy">Shipping Policy</Link></li>

                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <p>© 2024. Voguemine. All Rights Reserved.</p>
                <div className={styles.additionalLinks}>
                    <Link href="https://wa.me/+919899202079?text=Hello there!" target="_blank">
                        <FaWhatsappSquare />
                    </Link>
                    <Link href="tel:+919811363736">
                        <FaSquarePhone />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;