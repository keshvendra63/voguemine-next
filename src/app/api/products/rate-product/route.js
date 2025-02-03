import connectDb from "../../../../../config/connectDb";
import Product from "../../../../../models/productModel";
export async function PUT(req){
    const body=await req.json()
    try {
        const { star, prodId, comment, name, email } = body;
  connectDb()
        // Update product with new rating and comment
        const rateProduct = await Product.findByIdAndUpdate(
            prodId,
            {
                $push: {
                    ratings: {
                        star: star,
                        name: name,
                        email: email,
                        comment: comment,
                    },
                },
            },
            { new: true }
        );
  
        // Calculate new average rating for the product
        const product = await Product.findById(prodId);
        const totalRating = product.ratings.length;
        const ratingSum = product.ratings.reduce((prev, curr) => prev + curr.star, 0);
        const averageRating = Math.round(ratingSum / totalRating);
  
        // Update product with new average rating
        const updatedProduct = await Product.findByIdAndUpdate(
            prodId,
            { totalrating: averageRating },
            { new: true }
        );
  
        return Response.json(updatedProduct);
    } catch (error) {
        console.error("Error while updating rating:", error);
        return Response.json({ message: "Internal server error" },{status:500});
    }
  }