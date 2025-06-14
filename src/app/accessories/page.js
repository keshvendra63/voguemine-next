import React from 'react'
import Accessories from '../../../components/Accessories';
export const dynamic = 'force-dynamic';

const fetchMensData = async () => {
  // Connect to MongoDB
  try{
    const response=await fetch(`${process.env.API_PORT}collection/web-category?category=accessories`)
    const data=await response.json()
    if(response.ok){
      return data
    }
    else{
      console.log("Unable to fetch Collection")
      

      return null
    }

  }
  catch(err){
    console.log(err)
    

  }

};


export async function generateMetadata() {
  const mensData = await fetchMensData();
  const categories = [...new Set(mensData?.map((item) => item?.category))];

  return {
  title: "Men's Accessories | Premium Belts, Sunglasses, Caps & More - Voguemine",
  description:
    "Discover premium men's accessories at Voguemine. Shop stylish belts, sunglasses, caps, and more to enhance your look. Find high-quality, fashionable pieces to complete your ensemble. Shop now",
  keywords: categories,
  openGraph: {
    title: "Men's Accessories | Premium Belts, Sunglasses, Caps & More - Voguemine",
    description:
      "Discover premium men's accessories at Voguemine. Shop stylish belts, sunglasses, caps, and more to enhance your look. Find high-quality, fashionable pieces to complete your ensemble. Shop now",
    url: "https://voguemine.com/accessories",
    images: [
      {
        url: "https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_50/v1725368213/w71puywht4q7o4iqa6br.jpg",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://voguemine.com/accessories",
  },
  icons: {
    icon: "https://voguemine.com/favicon-32x32.png", // Default favicon
    apple: "https://voguemine.com/apple-touch-icon.png", // Apple Touch Icon
    shortcut: "https://voguemine.com/favicon.ico", // Shortcut Icon

  },
  other: {
    // Add custom meta tags here
    "title": "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
  },
};
}

const page = async() => {
const accessoriesData = await fetchMensData();

  return (
    <Accessories accessoriesData={accessoriesData}/>
  )
}

export default page
