import connectDb from "../../../../../config/connectDb"
import {MenModel1} from "../../../../../models/mensModel"
import {WomenModel1} from "../../../../../models/womensModel"
import {KidModel1} from "../../../../../models/kidsModel"
import {AccessoriesModel1} from "../../../../../models/accessoriesModel"
export const config = {
  maxDuration: 10,
};
export async function GET(request){
    const {searchParams}=new URL(request.url)
    const id=searchParams.get("id") || ""
    const category=searchParams.get("category") || ""
    try{
        await connectDb()
        let data=""
        if(id==="" || category===""){
        return Response.json({status:400,message:"Not Enough Details"})   
        }
        if(category==="men"){
            data=await MenModel1.findById(id)
        }
        else if(category==="women"){
            data=await WomenModel1.findById(id)
        }
        else if(category==="kids"){
            data=await KidModel1.findById(id)
        }
        else if(category==="accessories"){
            data=await AccessoriesModel1.findById(id)
        }
        else{
            console.log("Unable to fetch colllection")
        }

        if(data!==""){
            return Response.json(data)
        }


    }
    catch(error){
        return Response.json({status:500,message:error})
    }
}