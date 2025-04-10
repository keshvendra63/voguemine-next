import React from 'react';
import styles from '../category.module.css';
import Link from 'next/link';
import Image from 'next/image';
export const dynamic = 'force-dynamic';


// Function to modify Cloudinary URL
const modifyCloudinaryUrl = (url) => {
  const urlParts = url?.split('/upload/');
  return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
};

// Function to fetch Men's Data
const fetchMensData = async () => {
  try {
    const response = await fetch(`${process.env.API_PORT}collection/web-category?category=men`, { cache: 'no-store' });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.log("Unable to fetch Collection");
      window.location.reload()
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Dynamic Metadata
export async function generateMetadata() {
  const mensData = await fetchMensData();
  const categories = [...new Set(mensData?.map((item) => item?.category))];

  return {
    title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
    description:
      "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
    keywords: categories, // Dynamically add categories as keywords
    openGraph: {
      title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
      description:
        "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
      url: "https://voguemine.com/men",
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
      canonical: "https://voguemine.com/men",
    },
    icons: {
      icon: "https://voguemine.com/favicon-32x32.png",
      apple: "https://voguemine.com/apple-touch-icon.png",
      shortcut: "https://voguemine.com/favicon.ico",
    },
    other: {
      // Add custom meta tags here
      "title": "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
    },
  };
}

// Page Component
const Page = async () => {
  const mensData = await fetchMensData();

  return (
    <div className={styles.category}>
      <div className={styles.path}>
        <p>
          <span>Home</span>
          <span>/</span>
          <span>Men's Premium Products</span>
        </p>
      </div>
      <h1>
        <span>Men's Premium</span> <span>Products</span>
      </h1>
      <div className={styles.categoryList}>
        {mensData
          ?.sort((a, b) => (a?.order ?? Infinity) - (b?.order ?? Infinity))
          ?.map((item, index) => (
            <div className={styles.cate} key={index}>
                <Link href={`/collections/${item?.handle}`}>

             < Image
                src={modifyCloudinaryUrl(item?.images[0]?.url)}
                alt={item?.title}
                width={512}
                height={512}
                style={{ width: "100%", height: "auto" }}
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

export default Page;
