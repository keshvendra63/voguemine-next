import connectDb from "../../../../../config/connectDb";
import {MenModel1,MenModel2} from "../../../../../models/mensModel"
import {WomenModel1,WomenModel2} from "../../../../../models/womensModel"
import {KidModel1,KidModel2} from "../../../../../models/kidsModel"
import {AccessoriesModel1,AccessoriesModel2} from "../../../../../models/accessoriesModel"
import {CollectionModel1,CollectionModel2} from "../../../../../models/collectionModel";
import authMiddleware from "../../../../../controller/authController";
import connectDb2 from "../../../../../config/connectDb2";

export async function DELETE(request) {
    const {searchParams}=new URL(request.url)
    const category=searchParams.get("category") || ""
    const id=searchParams.get("id") || ""
    const token=searchParams.get("token") || ""

    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
        let data=""
        let data1=""
                if(category==="" || id===""){
                return Response.json({status:400,message:"Not Enough Details"})   
                }
                if(category==="men"){
                    data=await MenModel1.findByIdAndDelete(id)
                    data1=await MenModel2.findByIdAndDelete(id)

                }
                else if(category==="women"){
                    data=await WomenModel1.findByIdAndDelete(id)
                    data1=await WomenModel2.findByIdAndDelete(id)

                }
                else if(category==="kids"){
                    data=await KidModel1.findByIdAndDelete(id)
                    data1=await KidModel2.findByIdAndDelete(id)

                }
                else if(category==="accessories"){
                    data=await AccessoriesModel1.findByIdAndDelete(id)
                    data1=await AccessoriesModel2.findByIdAndDelete(id)

                }
                else{
                    console.log("Unable to Delete colllection")
                }
        await CollectionModel1.findOneAndDelete({title:data?.title})
        await CollectionModel2.findOneAndDelete({title:data?.title})

                if(data!=="" && data1!==""){
                    return Response.json(data)
                }
    } catch (error) {
        return Response.json({success:false,message:error},{status:500})   
    }
  }