import React from "react";
import Products from "../../../../components/Products";
import Link from "next/link";

// Function to generate dynamic metadata
export async function generateMetadata({ params }) {
  const { cid } = await params;

  try {
    const response = await fetch(`${process.env.API_PORT}collection?handle=${cid}`);
    const data = await response.json();
    if (data.success) {
      return {
        title: data?.collection?.metaTitle || "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
        description: data?.collection?.metaDesc || "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
        keywords: [data?.collection?.title, data?.collection?.category],
        openGraph: {
          title: data?.collection?.metaTitle || "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
          description: data?.collection?.metaDesc || "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
          url: `https://voguemine.com/collections/${cid}`,
          images: data?.collection?.images[0]?.url || [],
        },
        alternates: {
          canonical: `https://voguemine.com/collections/${cid}`,
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
          // Add custom meta tags here
          "title": data?.collection?.metaTitle || "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle"
        },
      };
    }
  } catch (error) {
    console.error("Error fetching metadata:", error.message);
  }

  return {
    title: "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
    description:
      "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
    keywords: ["Men's Loafers", "Premium Shoes", "Voguemine"],
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://voguemine.com/collections/${cid}`,
    },
  };
}

// Page component
const Page = async ({ params, searchParams }) => {
  const { cid } =await params;
  const {page,sort,color,brand,size}=await searchParams
  // const page = searchParams?.page || 1;
  // const sort = searchParams?.sort || "";
  // const color = searchParams?.color || "";
  // const brand = searchParams?.brand || "";
  // const size = searchParams?.size || "";

  let prdtData = null;
  let noPrdt = false;

  try {
    const productUrl = new URL(`${process.env.API_PORT}products`);
    productUrl.searchParams.append("page", page);
    productUrl.searchParams.append("collectionHandle", cid);
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
    noPrdt = true;

    }
  } catch (error) {
    console.log("Error fetching data:", error.message);
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
                backgroundColor: "#d2b188",
                cursor: "pointer",
              }}
            >
              Return to Home
            </button>
          </Link>
        </div>
      ) : (
        <Products data={prdtData} />
      )}
    </>
  );
};

export default Page;
