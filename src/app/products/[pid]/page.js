import React from "react";
import SingleProduct from "../../../../components/SingleProduct";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { pid } = await params;
  // Fetch metadata from the collection
  try {
    const response = await fetch(`${process.env.API_PORT}products/single-product?productHandle=${pid}`);
    const data = await response.json();
    if (data.success) {
      return {
        title: data?.product[0]?.metaTitle || "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
        description: data?.product[0]?.metaDesc || "Explore the stylish collection of men's fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
        keywords: ["Voguemine",data?.product[0]?.title,data?.product[0]?.category,data?.product[0]?.brand,data?.product[0]?.collectionName],
        openGraph: {
          title: data?.product[0]?.metaTitle || "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
          description: data?.product[0]?.metaDesc || "Explore the stylish collection of men's fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
          url: `https://voguemine.com/products/${pid}`,
          images: data?.product[0]?.images[0]?.url || [],
        },
        alternates: {
          canonical: `https://voguemine.com/products/${pid}`,
        },
        robots: {
          index: true,
          follow: true,
        },
        icons: {
          icon: "https://voguemine.com/favicon-32x32.png",
          apple: "https://voguemine.com/apple-touch-icon.png",
          shortcut: "https://voguemine.com/favicon.ico",
        },
        other: {
          "title": data?.product[0]?.metaTitle || "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle"
        },
      };
    }
  } catch (error) {
    console.error("Error fetching metadata:", error.message);
  }

  // Fallback metadata
  return {
    title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
    description: "Explore the stylish collection of men's fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
    keywords: ["Men's Loafers", "Premium Shoes", "Voguemine"],
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://voguemine.com/collections/${pid}`,
    },
  };
}

const page = async ({ params }) => {
  const { pid } = await params;
  let product = null;
  let products = [];
  let noPrdt = false;

  try {
    // Fetch single product first to get collectionHandle
    const productResponse = await fetch(
      `${process.env.API_PORT}products/single-product?productHandle=${pid}`
    );
    const productData = await productResponse.json();
    
    if (productData.success && productData.product[0]) {
      product = productData.product[0];
      
      // Now fetch related products using the collectionHandle
      try {
        const relatedProductsResponse = await fetch(
          `${process.env.API_PORT}products/single-page-products?collectionHandle=${product.collectionHandle}`
        );
        const relatedProductsData = await relatedProductsResponse.json();
        
        if (relatedProductsData.success && relatedProductsData.products) {
          products = relatedProductsData.products;
        }
      } catch (error) {
        console.error("Error fetching related products:", error.message);
        // Don't set noPrdt = true here, we still have the main product
      }
    } else {
      noPrdt = true;
    }
  } catch (error) {
    console.error("Error fetching product:", error.message);
    noPrdt = true;
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
          <Link href="/">
            <button
              style={{
                color: "white",
                border: "none",
                padding: "8px 20px",
                fontSize: "17px",
                letterSpacing: "1px",
                backgroundColor: "black",
                cursor: "pointer",
              }}
            >
              Return to Home
            </button>
          </Link>
        </div>
      ) : (
        <SingleProduct product={product} products={products} />
      )}
    </>
  );
};

export default page;