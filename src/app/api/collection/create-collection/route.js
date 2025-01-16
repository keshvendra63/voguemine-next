import connectDb from "../../../../../config/connectDb";
import Men from "../../../../../models/mensModel"
import Women from "../../../../../models/womensModel"
import Kid from "../../../../../models/kidsModel"
import Accessories from "../../../../../models/accessoriesModel"
import Collection from "../../../../../models/collectionModel";
import authMiddleware from "../../../../../controller/authController";
export async function POST(request) {
    const {searchParams}=new URL(request.url)
    const category=searchParams.get("category") || ""
    const token=searchParams.get("token") || ""

    const body=await request.json()
    try {
        await connectDb()
        await authMiddleware(token)
        let data=""
                if(category===""){
                return Response.json({status:400,message:"Not Enough Details"})   
                }
                if(category==="men"){
                    data=await Men.create(body)
                }
                else if(category==="women"){
                    data=await Women.create(body)
                }
                else if(category==="kids"){
                    data=await Kid.create(body)
                }
                else if(category==="accessories"){
                    data=await Accessories.create(body)
                }
                else{
                    console.log("Unable to create colllection")
                }
                await Collection.create(body)
        
                if(data!==""){
                    return Response.json(data)
                }
    } catch (error) {
        return Response.json({success:false,message:error},{status:500})   
    }
  }