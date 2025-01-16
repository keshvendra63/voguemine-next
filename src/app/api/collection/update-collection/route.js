import connectDb from "../../../../../config/connectDb";
import Men from "../../../../../models/mensModel"
import Women from "../../../../../models/womensModel"
import Kid from "../../../../../models/kidsModel"
import Accessories from "../../../../../models/accessoriesModel"
import Collection from "../../../../../models/collectionModel";
import authMiddleware from "../../../../../controller/authController";

export async function PUT(request) {
    const {searchParams}=new URL(request.url)
    const category=searchParams.get("category") || ""
    const id=searchParams.get("id") || ""
    const token=searchParams.get("token") || ""

    const body=await request.json()
    try {
        await connectDb()
        await authMiddleware(token)
        let data=""
                if(category==="" || id===""){
                return Response.json({status:400,message:"Not Enough Details"})   
                }
                if(category==="men"){
                    data=await Men.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                }
                else if(category==="women"){
                    data=await Women.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                }
                else if(category==="kids"){
                    data=await Kid.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                }
                else if(category==="accessories"){
                    data=await Accessories.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                }
                else{
                    console.log("Unable to Update colllection")
                }
                if(data!==""){
                    await Collection.findOneAndUpdate({title:data.title}, body, {
                        new: true,
                      });
            
                    return Response.json(data)
                }
    } catch (error) {
        console.log(error)
        return Response.json({success:false,message:error},{status:500})   
    }
  }