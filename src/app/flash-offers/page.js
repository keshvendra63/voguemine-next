import React from "react";
import Link from "next/link";
import Sale from "../../../components/Sale";

// Function to generate dynamic metadata

export const metadata = {
    title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
    description:
      "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
    keywords: ["Voguemine","Accessories","Footwear","Men's Clothing","Women's Clothing","Kid's Clothing","About Voguemine"],
    openGraph: {
      title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
      description:
        "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
      url: "https://voguemine.com/flash-offers",
      images: [
        {
          url: "https://res.cloudinary.com/dqh6bd766/image/upload/c_limit,h_1000,f_auto,q_auto/v1726468497/yf1i2xjopwmnp9cszgtt.jpg",
        },
      ],
    },
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: "https://voguemine.com/flash-offers",
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
// Page component
const Page = async ({searchParams }) => {
  const {page,sort,color,brand,size}=await searchParams
  let prdtData = null;
  let noPrdt = false;

  try {
    const productUrl = new URL(`${process.env.API_PORT}products/sale-prdts`);
    productUrl.searchParams.append("page", page);
    productUrl.searchParams.append("state", "active");
    if (size) productUrl.searchParams.append("size", size);
    if (sort) productUrl.searchParams.append("sort", sort);
    if (color) productUrl.searchParams.append("color", color);
    if (brand) productUrl.searchParams.append("brand", brand);

    const productResponse = await fetch(productUrl);
    const productData = await productResponse.json();

    if (productData.success) {
      prdtData = productData;
    } else {
      console.log("Error fetching products");
      window.location.reload()

    }
  } catch (error) {
    console.log("Error fetching data:", error.message);
    window.location.reload()
  }
  return (
    <>
      {noPrdt ? (
        <div
          style={{
            margin: "70px 1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            flexDirection: "column",
          }}
        >
          <h1 style={{ marginBottom: "25px" }}>404 Page Not Found</h1>
          <Link prefetch={true} href="/home">
            <button
              style={{
                color: "white",
                border: "none",
                padding: "8px 20px",
                fontSize: "17px",
                letterSpacing: "1px",
                backgroundColor: "rgb(120, 16, 255)",
                cursor: "pointer",
              }}
            >
              Return to Home
            </button>
          </Link>
        </div>
      ) : (
        <Sale data={prdtData} />
      )}
    </>
  );
};

export default Page;
