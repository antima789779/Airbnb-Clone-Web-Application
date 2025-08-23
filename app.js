if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express=require("express");
const app=express();
const port=8080;
const mongoose=require("mongoose");
const ejs=require("ejs");
//  const MONGO_URL='mongodb://127.0.0.1:27017/Wanderlust3';
const dbUrl=process.env.ATLASDB_URL;
 const path=require("path");
 const methodOverride=require("method-override");
 const ejsMate=require("ejs-mate");
 const listingRouter=require("./routes/listing.js");
 const reviewRouter=require("./routes/review.js");
 const session=require("express-session");
 const MongoStore=require("connect-mongo");
 const flash= require("connect-flash");
 const passport=require("passport");
 const LocalStrategy=require("passport-local");
 const User=require("./models/user.js");
 const userRouter=require("./routes/user.js");

 //call main function
 main().then(()=>{
    console.log("connection successful");
 }).catch((err)=>{
    console.log("an error occurred");
 });
  async function main(){
 mongoose.connect(dbUrl);
  }
  //all setting function
  app.set("view engine",'ejs');
  app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
//sessionStorage
const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
       secret:process.env.SECRET,
    },
     touchAfter:24*3600,
});
store.on("errror",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});
const sessionOptions={
    store,
     secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
     res.locals.error=req.flash("error");
     res.locals.currUser=req.user;
    next();
});
app.use("/listings",listingRouter);
//id would notpass into routes folders and rest of params will pass into the routes folder so we will use merge params to get id into routes folder through exprress router
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);
app.use((err,req,res,next)=>{
    // res.send("something went wrong");
    let {status=500,message="Somethings went wrong!"}=err;
    res.status(status).render("error.ejs",{message});
});
app.listen(port,(req,res)=>{
    console.log(`app in listening at ${port}`);
});



