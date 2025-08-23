


const mongoose=require("mongoose");
const initData=require("./data.js");
 const MONGO_URL='mongodb://127.0.0.1:27017/Wanderlust3';
 const Listing=require("../models/listing");

 //call main function
 main().then(()=>{
    console.log("connection successful");
 }).catch((err)=>{
    console.log("an error occurred");
 });
  async function main(){
 mongoose.connect(MONGO_URL);
  }
const initDB=async()=>{
    await Listing.deleteMany({});
   initData.data= initData.data.map((obj)=>({...obj,owner:'68a3562bbb0e183749e0e728'}))
    await Listing.insertMany(initData.data);

    console.log("data was initialised");
};
initDB();