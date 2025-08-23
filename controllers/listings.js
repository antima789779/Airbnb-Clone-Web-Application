const Listing=require("../models/listing");
//index route callback
module.exports.index =async(req,res)=>{
 const allListings= await Listing.find({});
 res.render("listings/index",{allListings});
};
//new route callback
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new");  
};
// show route callback
 module.exports.showListing=async(req,res)=>{
let {id}=req.params;
 const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author",}}).populate("owner");
 if(!listing){
  req.flash("error","Listing you requested for doesn't exist!");
  res.redirect("/listings");
 }
 res.render("listings/show",{listing});
};

//create route callback
module.exports.createListing= async (req, res) => {
  let url=req.file.path;
  let filename=req.file.filename;
  console.log(url,"..",filename);
  // If `req.body.listing.image` is a string, convert it into object format
  if (typeof req.body.listing.image === "string") {
    req.body.listing.image = {
      filename: "uploaded-image", // Or any default filename
      url: req.body.listing.image
    };
  }

  const listing = new Listing(req.body.listing);
  listing.owner=req.user._id;
  listing.image={url,filename};
  await listing.save();
  req.flash("success","New listing Created");
 
  res.redirect("/listings");
};
//edit route callback
module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
     if(!listing){
  req.flash("error","Listing you requested for doesn't exist!");
  res.redirect("/listings");
 }
 let originalImageUrl=listing.image.url;
 originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit",{listing,originalImageUrl});
};


//update route callback
module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;

    // 1. Find listing
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // 2. Check owner
    if (!listing.owner.equals(res.locals.currUser._id)) {
      req.flash("error", "You don't have permission to edit this listing");
      return res.redirect(`/listings/${id}`);
    }

    // 3. Update fields
    Object.assign(listing, req.body.listing);

    // 4. If new file uploaded, replace image
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    // 5. Save
    await listing.save();

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Update error:", err);
    req.flash("error", "Something went wrong while updating");
    res.redirect("/listings");
  }
};

//delete route callback
 module.exports.deleteListing=async(req,res)=>{
      let {id}=req.params;
 let deletedListing=await Listing.findByIdAndDelete(id);
 console.log(deletedListing);
 req.flash("success","Listing Deleted");
    res.redirect("/listings");
};