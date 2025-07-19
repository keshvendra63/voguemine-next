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
        description: data?.collection?.metaDesc || "Explore the stylish collection of men's fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
        keywords: [data?.collection?.title, data?.collection?.category],
        openGraph: {
          title: data?.collection?.metaTitle || "Vogue Mine | Online Shopping for Women, Men, Kids Lifestyle",
          description: data?.collection?.metaDesc || "Explore the stylish collection of men's fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
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
      "Explore the stylish collection of men's fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
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
  const { cid } = await params;
  const { page, sort, color, brand, size } = await searchParams;

  let prdtData = null;
  let filterData = null;
  let noPrdt = false;

  try {
    // Build product URL
    const productUrl = new URL(`${process.env.API_PORT}products`);
    productUrl.searchParams.append("page", page || 1);
    productUrl.searchParams.append("collectionHandle", cid);
    productUrl.searchParams.append("state", "active");
    if (size) productUrl.searchParams.append("size", size);
    if (sort) productUrl.searchParams.append("sort", sort);
    if (color) productUrl.searchParams.append("color", color);
    if (brand) productUrl.searchParams.append("brand", brand);

    // Build filter URL
    const filterUrl = `${process.env.API_PORT}filter?collectionHandle=${cid}`;

    // Fetch both APIs concurrently using Promise.all
    const [productResponse, filterResponse] = await Promise.all([
      fetch(productUrl),
      fetch(filterUrl)
    ]);

    // Parse both responses concurrently
    const [productData, filterDataResponse] = await Promise.all([
      productResponse.json(),
      filterResponse.json()
    ]);

    // Process product data
    if (productData.success) {
      prdtData = productData;
    } else {
      console.log("Error fetching products");
      noPrdt = true;
    }

    // Process filter data
    if (filterDataResponse.success) {
      filterData = filterDataResponse;
    } else {
      console.log("Error fetching filter data");
      // Don't set noPrdt = true for filter failure, products can still work
    }

  } catch (error) {
    console.log("Error fetching data:", error.message);
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
          <Link prefetch={true} href="/">
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
        <Products data={prdtData} initialFilterData={filterData} />
      )}
    </>
  );
};

export default Page;