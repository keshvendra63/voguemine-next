import {BlogModel1,BlogModel2} from "../../../../../models/blogModel";
import connectDb from "../../../../../config/connectDb";
import authMiddleware from "../../../../../controller/authController";
import connectDb2 from "../../../../../config/connectDb2";
export const config = {
    maxDuration: 10,
  };
export async function POST(req){
    const body=await req.json()
    const {data,token}=body
    try{
        if(!token || !body){
        return Response.json({message:"Insufficient Information"},{status:404})

        }
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
        const blog=await BlogModel1.create(data)
        const blog1=await BlogModel2.create({...data,_id:blog?._id})

        if(blog && blog1){
            return Response.json(blog)
        }
        else{
        return Response.json({message:"Unable to create blog"},{status:404})

        }

    }catch(err){
        console.log(err)
        return Response.json({err,message:"Unable to create blog"},{status:500})
    }
}