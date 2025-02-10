import Blog from "../../../../../models/blogModel";
import connectDb from "../../../../../config/connectDb";

export async function GET(req){
    const {searchParams}=new URL(req.url)
    const id=searchParams.get("id") || ""
    try{
        await connectDb()
        const blog=await Blog.findById(id)
        if(blog){
            return Response.json(blog)
        }
        else{
        return Response.json({message:"No Blog Find"},{status:404})

        }

    }catch(err){
        console.log(err)
        return Response.json({err,message:"Unable to find blog"},{status:500})
    }
}