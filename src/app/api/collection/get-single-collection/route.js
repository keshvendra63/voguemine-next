import connectDb from "../../../../../config/connectDb"
import Men from "../../../../../models/mensModel"
import Women from "../../../../../models/womensModel"
import Kid from "../../../../../models/kidsModel"
import Accessories from "../../../../../models/accessoriesModel"
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
            data=await Men.findById(id)
        }
        else if(category==="women"){
            data=await Women.findById(id)
        }
        else if(category==="kids"){
            data=await Kid.findById(id)
        }
        else if(category==="accessories"){
            data=await Accessories.findById(id)
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