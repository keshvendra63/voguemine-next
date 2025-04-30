const mongoose=require("mongoose")

const watchscrollSchema=new mongoose.Schema({
    banners:[
        
    ]

},{
    timestamps:true
}
)

mongoose.models={}
export default mongoose.model("WatchBanner", watchscrollSchema);