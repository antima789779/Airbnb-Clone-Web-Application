   const Listing=require("../models/listing.js");
   const Review=require("../models/review");
//review postroute callback
  module.exports.createReview=async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
      if (!req.user) {
    req.flash("error", "You must be logged in to add a review");
    return res.redirect("/login");
  }
    const newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    await newReview.save();

    // Safeguard: Initialize reviews array if undefined
    if (!listing.reviews) {
      listing.reviews = [];
    }

    listing.reviews.push(newReview._id); // or newReview if embedded
    await listing.save();
    req.flash("success","New Review Added")
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

//delete route callback
 module.exports.deleteReview=async(req,res)=>{
  let {id,reviewId}=req.params;
 await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success"," Review Deleted")
  res.redirect(`/listings/${id}`);
};