"use client"
import React from 'react'
import styles from '../src/app/page.module.css'
import Prdt4Grid from './Prdt4Grid'
import Link from 'next/link'
import Image from 'next/image'
const TrendingCol = ({collections,prdts,color,collection}) => {
  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
  };
  return (
    <div className={styles.trendingCollections}>
          <h2 style={{color:color}}><span>Trending collections</span></h2>
          <div className={styles.collections}>
          {
          collections?.map((item,index)=>{
            return <Link href={`/collections/${item?.handle}`} key={index} >
            <div className={styles.collection}>
              <Image src={modifyCloudinaryUrl(item?.images[0]?.url)} alt={item?.title} width={550} height={250} placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>
          </div>
            </Link>
          })
        }
            
          </div>
          <div className={styles.trendingBanner}>
<Link href={`/collections/${collection?.handle}`}>
<Image src={modifyCloudinaryUrl(collection?.images[1]?.url)} alt="Collection Banner" width={1200} height={230} placeholder='blur' blurDataURL="data:image/jpeg;base64,..."/>
</Link>
          </div>
          <Prdt4Grid prdts={prdts} color={color}/>
          <div className={styles.viewAllCol}>
            <Link href={`/collections/${collection?.handle}`}>
            <button>View All</button>
            </Link>
          </div>
        </div>
  )
}

export default TrendingCol
