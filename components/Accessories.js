'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../src/app/category.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Accessories = ({ accessoriesData }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get('category') || 'men';

  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_50/${urlParts[1]}`;
  };

  const handleCategoryChange = (cat) => {
    if (cat === 'men') {
      router.push('/accessories', { scroll: false }); // no query param for default men
    } else {
      router.push(`/accessories?category=${cat}`, { scroll: false });
    }
  };

  const filteredData = accessoriesData
    ?.filter((item) => {
      if (category === 'men') {
        return !item?.category?.toLowerCase().includes('women');
      } else if (category === 'women') {
        return item?.category?.toLowerCase().includes('women');
      }
      return true;
    })
    ?.sort((a, b) => (a?.order ?? Infinity) - (b?.order ?? Infinity));

  return (
    <div className={`${styles.category} ${styles.category3}`}>
      <div className={styles.path}>
        <p>
          <span>Home</span>
          <span>/</span>
          <span>Premium Accessories</span>
        </p>
      </div>
      <h1>
        <span>Premium</span> <span>Accessories</span>
      </h1>
      <div className={styles.toggleCategory}>
        <div className={styles.toggle}>
          <div
            className={`${styles.toggleButton} ${category === 'men' ? styles.active : ''}`}
            onClick={() => handleCategoryChange('men')}
          >
            <p>Men</p>
          </div>
          <div
            className={`${styles.toggleButton} ${category === 'women' ? styles.active : ''}`}
            onClick={() => handleCategoryChange('women')}
          >
            <p>Women</p>
          </div>
        </div>
      </div>

      <div className={styles.categoryList}>
        {filteredData?.map((item, index) => (
          <div className={styles.cate} key={index}>
            <Link href={`/collections/${item?.handle}`}>
              <Image
                src={modifyCloudinaryUrl(item?.images[0]?.url)}
                alt={item?.title}
                width={512}
                height={512}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,..."
              />
              <div className={styles.info}>
                <p className={styles.collectioName}>{item?.category}</p>
                <button>SHOP NOW</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessories;
