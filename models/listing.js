const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const listingSchema=new Schema({
  title:{
   type: String,
   required:true,
  },
    description:{
    type:String,
    },
      image: {
   
        url:String,
        filename:String,
  },
    price:{
        type:Number,
    },
    location:{
        type:String,
         validate: {
      validator: function (v) {
        return /^[A-Za-z\s]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid location (only letters and spaces allowed)`,
    },
    },
    country:{
       type: String,
        validate: {
      validator: function (v) {
        return /^[A-Za-z\s]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid location (only letters and spaces allowed)`,
    },
    },
     reviews:[
    {
    type:Schema.Types.ObjectId,
    ref:"Review",
    },
  ],
  owner:{
    type:Schema.ObjectId,
    ref:"User",
  }
});
//mongoose middleware
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
  await Review.deleteMany({_id:{$in:listing.reviews}});
  }
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
