const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
  const Listing=require("../models/listing.js");
  const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
  const listingController=require("../controllers/listings.js");
  const multer=require('multer');
  const {storage}=require("../cloudConfig.js");
  const upload=multer({storage});


  router.route("/").get(wrapAsync(listingController.index))
  .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));


  //search route
  // Search route must come before "/:id"
router.get("/search", async (req, res) => {
  const query = req.query.q;
  let filter = {
    $or: [
      { country: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } }
    ]
  };

  if (!isNaN(query)) {
    filter.$or.push({ price: Number(query) });
  }

  const listings = await Listing.find(filter);
  res.render("listings/index", { allListings: listings }); // match your index.ejs
});


  //new route
router.get("/new",isLoggedIn,listingController.renderNewForm);
  //router route path for id path
  router.route("/:id").get(wrapAsync(listingController.showListing))
  .put(isOwner,upload.single("listing[image]"),validateListing,isLoggedIn,wrapAsync(listingController.updateListing))
  .delete(isOwner,wrapAsync(listingController.deleteListing));

  //edit route
  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//this is the place where i was getting an error
//corect post route
// router.post("/",wrapAsync(listingController.createListing));


// const { upload } = require("../config/cloudConfig");

router.post("/listings", upload.single("image"), async (req, res) => {
  console.log(req.file); // contains Cloudinary URL in req.file.path
});
module.exports=router;