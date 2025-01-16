import connectDb from "../../../../../config/connectDb";
import Men from "../../../../../models/mensModel"
import Women from "../../../../../models/womensModel"
import Kid from "../../../../../models/kidsModel"
import Accessories from "../../../../../models/accessoriesModel"
import Collection from "../../../../../models/collectionModel";
import authMiddleware from "../../../../../controller/authController";

export async function DELETE(request) {
    const {searchParams}=new URL(request.url)
    const category=searchParams.get("category") || ""
    const id=searchParams.get("id") || ""
    const token=searchParams.get("token") || ""

    try {
        await connectDb()
        await authMiddleware(token)
        let data=""
                if(category==="" || id===""){
                return Response.json({status:400,message:"Not Enough Details"})   
                }
                if(category==="men"){
                    data=await Men.findByIdAndDelete(id)
                }
                else if(category==="women"){
                    data=await Women.findByIdAndDelete(id)
                }
                else if(category==="kids"){
                    data=await Kid.findByIdAndDelete(id)
                }
                else if(category==="accessories"){
                    data=await Accessories.findByIdAndDelete(id)
                }
                else{
                    console.log("Unable to Delete colllection")
                }
        await Collection.findOneAndDelete({title:data?.title})
                if(data!==""){
                    return Response.json(data)
                }
    } catch (error) {
        return Response.json({success:false,message:error},{status:500})   
    }
  }