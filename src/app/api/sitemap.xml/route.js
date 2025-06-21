import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import {ProductModel1} from '../../../../models/productModel';
import {MenModel1} from '../../../../models/mensModel';
import {WomenModel1} from '../../../../models/womensModel';
import {KidModel1} from '../../../../models/kidsModel';
import {AccessoriesModel1} from '../../../../models/accessoriesModel';
import {BlogModel1} from '../../../../models/blogModel';
import connectDb from '../../../../config/connectDb';

async function getAllUrls() {
  await connectDb(); // Ensure database connection

  const products = await ProductModel1.find({}).select('handle -_id');
  const men = await MenModel1.find({}).select('handle -_id');
  const women = await WomenModel1.find({}).select('handle -_id');
  const kids = await KidModel1.find({}).select('handle -_id');
  const accessories = await AccessoriesModel1.find({}).select('handle -_id');
  const blogs = await BlogModel1.find({}).select('handle -_id');

  const pages = [
    { url: "/", changefreq: "monthly", priority: 1 },
    { url: "/men", changefreq: "monthly", priority: 1 },
    { url: "/women", changefreq: "monthly", priority: 1 },
    { url: "/kids", changefreq: "monthly", priority: 1 },
    { url: "/accessories", changefreq: "monthly", priority: 1 },
    { url: "/about", changefreq: "monthly", priority: 1 },
    { url: "/pages/contact", changefreq: "monthly", priority: 0.8 },
    { url: "/blogs", changefreq: "weekly", priority: 0.6 },
    { url: "/pages/shipping-policy", changefreq: "monthly", priority: 0.5 },
    { url: "/pages/refund-and-return-policy", changefreq: "monthly", priority: 0.5 },
    { url: "/pages/terms-of-service", changefreq: "monthly", priority: 0.5 },
    { url: "/pages/privacy-policy", changefreq: "monthly", priority: 0.5 },
  ];

  const allUrls = [
    ...products.map(prod => ({ url: `/products/${prod.handle}`, changefreq: "daily", priority: 0.9 })),
    ...men.map(col => ({ url: `/collections/${col.handle}`, changefreq: "monthly", priority: 0.7 })),
    ...women.map(col => ({ url: `/collections/${col.handle}`, changefreq: "monthly", priority: 0.7 })),
    ...kids.map(col => ({ url: `/collections/${col.handle}`, changefreq: "monthly", priority: 0.7 })),
    ...accessories.map(col => ({ url: `/collections/${col.handle}`, changefreq: "monthly", priority: 0.7 })),
    ...blogs.map(blog => ({ url: `/blogs/news/${blog.handle}`, changefreq: "weekly", priority: 0.6 })),
    ...pages,
  ];

  // Deduplicate URLs
  const uniqueUrls = Array.from(
    new Map(allUrls.map(item => [item.url, item])).values()
  );

  return uniqueUrls;
}

export async function GET(req) {
  try {
    const links = await getAllUrls(); // Fetch unique URLs
    const sitemapStream = new SitemapStream({ hostname: "https://voguemine.com" });

    // Stream the sitemap
    const xmlStream = Readable.from(links).pipe(sitemapStream);
    const sitemap = await streamToPromise(xmlStream);

    // Return the response with XML content
    return new Response(sitemap.toString(), {
      headers: {
        "Content-Type": "application/xml",
      },
      status: 200,
    });
  } catch (e) {
    console.error('Error generating sitemap:', e.message);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to generate sitemap" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
