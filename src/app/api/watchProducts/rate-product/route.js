import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import {WatchProductModel1,WatchProductModel2} from "../../../../../models/watchProductModel";
export async function PUT(req){
    const body=await req.json()
    try {
        const { star, prodId, comment, name, email } = body;
  await connectDb()
  await connectDb2()
        // Update product with new rating and comment
        const rateProduct = await WatchProductModel1.findByIdAndUpdate(
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
        const rateProduct1 = await WatchProductModel2.findByIdAndUpdate(
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
        const product = await WatchProductModel1.findById(prodId);
        const totalRating = product.ratings.length;
        const ratingSum = product.ratings.reduce((prev, curr) => prev + curr.star, 0);
        const averageRating = Math.round(ratingSum / totalRating);
        const product1 = await WatchProductModel2.findById(prodId);
        const totalRating1 = product1.ratings.length;
        const ratingSum1 = product1.ratings.reduce((prev, curr) => prev + curr.star, 0);
        const averageRating1 = Math.round(ratingSum1 / totalRating1);
  
        // Update product with new average rating
        const updatedProduct = await WatchProductModel1.findByIdAndUpdate(
            prodId,
            { totalrating: averageRating },
            { new: true }
        );
         // Update product with new average rating
         const updatedProduct1 = await WatchProductModel2.findByIdAndUpdate(
            prodId,
            { totalrating: averageRating1 },
            { new: true }
        );
  
        return Response.json(updatedProduct);
    } catch (error) {
        console.error("Error while updating rating:", error);
        return Response.json({ message: "Internal server error" },{status:500});
    }
  }