import connectDb from "../../../../../config/connectDb";
import {MenModel1,MenModel2} from "../../../../../models/mensModel"
import {WomenModel1,WomenModel2} from "../../../../../models/womensModel"
import {KidModel1,KidModel2} from "../../../../../models/kidsModel"
import {AccessoriesModel1,AccessoriesModel2} from "../../../../../models/accessoriesModel"
import {CollectionModel1,CollectionModel2} from "../../../../../models/collectionModel";
import authMiddleware from "../../../../../controller/authController";
import connectDb2 from "../../../../../config/connectDb2";
export async function POST(request) {
    const {searchParams}=new URL(request.url)
    const category=searchParams.get("category") || ""
    const token=searchParams.get("token") || ""

    const body=await request.json()
    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
        let data=""
        let data1=""
                if(category===""){
                return Response.json({status:400,message:"Not Enough Details"})   
                }
                if(category==="men"){
                    let data2=await MenModel1.create(body)
                    data=data2
                    data1=await MenModel2.create({...body,_id:data2?._id})

                }
                else if(category==="women"){
                    let data2=await WomenModel1.create(body)
                    data=data2
                    data1=await WomenModel2.create({...body,_id:data2?._id})
                }
                else if(category==="kids"){
                    let data2=await KidModel1.create(body)
                    data=data2
                    data1=await KidModel2.create({...body,_id:data2?._id})

                }
                else if(category==="accessories"){
                    let data2=await AccessoriesModel1.create(body)
                    data=data2
                    data1=await AccessoriesModel2.create({...body,_id:data2?._id})

                }
                else{
                    console.log("Unable to create colllection")
                }
                let col=await CollectionModel1.create(body)
                await CollectionModel2.create({...body,_id:col?._id})

        
                if(data!=="" && data1!==""){
                    return Response.json(data)
                }
    } catch (error) {
        return Response.json({success:false,message:error},{status:500})   
    }
  }