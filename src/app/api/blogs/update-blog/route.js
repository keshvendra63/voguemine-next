import {BlogModel1,BlogModel2} from "../../../../../models/blogModel";
import connectDb from "../../../../../config/connectDb";
import authMiddleware from "../../../../../controller/authController";
import connectDb2 from "../../../../../config/connectDb2";

export async function PUT(req){
    const body=await req.json()
    const {id,data,token}=body
    try{
        if(!id || !token || !body){
        return Response.json({message:"Insufficient Information"},{status:404})

        }
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
        const blog=await BlogModel1.findByIdAndUpdate(id,data,{new:true})
        const blog1=await BlogModel2.findByIdAndUpdate(id,data,{new:true})
        if(blog && blog1){
            return Response.json(blog)
        }
        else{
        return Response.json({message:"Unable to update blog"},{status:404})

        }

    }catch(err){
        console.log(err)
        return Response.json({err,message:"Unable to Update blog"},{status:500})
    }
}