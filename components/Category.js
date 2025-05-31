"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../src/app/page.module.css'
const Category = ({banners}) => {
  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
  };
  return (
    <div className={styles.categories}>
          <div className={styles.mens}>
            <Link href="/men" >
<Image src={modifyCloudinaryUrl(banners[3]?.url)} alt="mens-banner" width={100} height={100} placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>
</Link>
          </div>
          <div className={styles.womens}>
          <Link href="/women" >
          <Image src={modifyCloudinaryUrl(banners[4]?.url)} alt="womens-banner" width={100} height={100} placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>
          </Link>
          </div>
          <div className={styles.kids}>
          <Link href="/kids" >
          <Image src={modifyCloudinaryUrl(banners[5]?.url)} alt="kids-banner" width={100} height={100} placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>
          </Link>
          </div>
          <div className={styles.accessories}>
          <Link href="/accessories" >
          <Image src={modifyCloudinaryUrl(banners[6]?.url)} alt="accessories-banner" width={100} height={100} placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>
          </Link>
          </div>
        </div>
  )
}

export default Category
