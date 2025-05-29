const mongoose=require("mongoose")
import connectDb2 from "../config/connectDb2";

const watchscrollSchema=new mongoose.Schema({
    banners:[
        
    ]

},{
    timestamps:true
}
)
const WatchBannerModel1 =mongoose.models.WatchBanner || mongoose.model("WatchBanner", watchscrollSchema);
let WatchBannerModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.WatchBanner) {
    WatchBannerModel2 = conn2.models.WatchBanner;
  } else {
    WatchBannerModel2 = conn2.model("WatchBanner", watchscrollSchema);
  }
};

setupDb2Model();

export { WatchBannerModel1, WatchBannerModel2 };