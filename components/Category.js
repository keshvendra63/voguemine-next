"use client"
import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../src/app/home/home.module.css'
import { GlobalContext } from '../GlobalContext'
const Category = ({banners}) => {
  return (
    <div className={styles.categories}>
          <div className={styles.mens}>
            <Link href="/men" >
<Image src={banners[3]?.url} alt="mens-banner" width={400} height={400}/>
</Link>
          </div>
          <div className={styles.womens}>
          <Link href="/women" >
          <Image src={banners[4]?.url} alt="womens-banner" width={400} height={400}/>
          </Link>
          </div>
          <div className={styles.kids}>
          <Link href="/kids" >
         < img src={banners[5]?.url} alt="kids-banner" width={400} height={400}/>
          </Link>
          </div>
          <div className={styles.accessories}>
          <Link href="/accessories" >
         < img src={banners[6]?.url} alt="accessories-banner" width={400} height={400}/>
          </Link>
          </div>
        </div>
  )
}

export default Category
