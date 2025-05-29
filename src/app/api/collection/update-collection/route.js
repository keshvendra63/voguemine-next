import connectDb from "../../../../../config/connectDb";
import {MenModel1,MenModel2} from "../../../../../models/mensModel"
import {WomenModel1,WomenModel2} from "../../../../../models/womensModel"
import {KidModel1,KidModel2} from "../../../../../models/kidsModel"
import {AccessoriesModel1,AccessoriesModel2} from "../../../../../models/accessoriesModel"
import {CollectionModel1,CollectionModel2} from "../../../../../models/collectionModel";
import authMiddleware from "../../../../../controller/authController";
import connectDb2 from "../../../../../config/connectDb2";

export async function PUT(request) {
    const {searchParams}=new URL(request.url)
    const category=searchParams.get("category") || ""
    const id=searchParams.get("id") || ""
    const token=searchParams.get("token") || ""

    const body=await request.json()
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
                    data=await MenModel1.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                      data1=await MenModel2.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                }
                else if(category==="women"){
                    data=await WomenModel1.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                      data1=await WomenModel2.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                }
                else if(category==="kids"){
                    data=await KidModel1.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                      data1=await KidModel2.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                }
                else if(category==="accessories"){
                    data=await AccessoriesModel1.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                      data1=await AccessoriesModel2.findByIdAndUpdate(id, body, {
                        new: true,
                      });
                }
                else{
                    console.log("Unable to Update colllection")
                }
                if(data!=="" && data1!==""){
                    await CollectionModel1.findOneAndUpdate({title:data.title}, body, {
                        new: true,
                      });
                      await CollectionModel2.findOneAndUpdate({title:data.title}, body, {
                        new: true,
                      });
            
                    return Response.json(data)
                }
    } catch (error) {
        console.log(error)
        return Response.json({success:false,message:error},{status:500})   
    }
  }