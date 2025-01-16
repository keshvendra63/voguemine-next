const mongoose=require("mongoose")

const scrollSchema=new mongoose.Schema({
    banners:[
        
    ]

},{
    timestamps:true
}
)

mongoose.models={}
export default mongoose.model("Scroll", scrollSchema);