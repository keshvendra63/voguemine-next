import React from "react";
import styles from "../../blogs.module.css";


// Function to fetch a single blog
const getBlog = async (bid) => {
  try {
    const response = await fetch(`${process.env.API_PORT}/blogs/get-single-blog?id=${bid}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch blog data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
};

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const { bid } = params;

  try {
    const blogData = await getBlog(bid);
    if (blogData) {
      return {
        title: blogData.metaTitle || "Default Blog Title",
        description: blogData.metaDesc || "Default Blog Description",
        keywords: blogData.title || "default, keywords",
        openGraph: {
          title: blogData.metaTitle || "Default Blog Title",
          description: blogData.metaDesc || "Default Blog Description",
          url: `https://voguemine.com/blogs/news/${blogData.handle}`,
          images: blogData.images?.length ? [{ url: blogData.images[0].url }] : [],
        },
        robots: { index: true, follow: true },
        alternates: { canonical: `https://voguemine.com/blogs/news/${blogData.handle}` },
        icons: {
          icon: "https://voguemine.com/favicon-32x32.png",
          apple: "https://voguemine.com/apple-touch-icon.png",
          shortcut: "https://voguemine.com/favicon.ico",
        },
      };
    }
  } catch (error) {
    console.error("Metadata fetch error:", error);
  }

  // Fallback metadata if fetching fails
  return {
    title: "Vogue Blogs | Online Shopping for Women, Men, Kids Lifestyle",
    description:
      "Explore the stylish collection of men’s fashion at Voguemine. From trendy outfits to classic essentials, find premium-quality clothing and accessories tailored for the modern man. Shop now!",
    keywords: ["Men's Loafers", "Premium Shoes", "Voguemine"],
    robots: { index: true, follow: true },
    alternates: { canonical: "https://voguemine.com/blogs/news/default" },
  };
}

// Blog page component
const Page = async ({ params }) => {
  const { bid } = params;
  const blogData = await getBlog(bid);

  return (
    <div className={styles.singleBlog}>
      <h1>{blogData?.title || "Blog Not Found"}</h1>
      <p dangerouslySetInnerHTML={{ __html: blogData?.description || "<p>No content available.</p>" }} />
    </div>
  );
};

export default Page;
