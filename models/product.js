// //^ Importing the mongoose library to use the mongodb
// const mongoose = require('mongoose');

// const reviewSchema = mongoose.Schema(
//     {
//       name: { type: String, required: true },
//       rating: { type: Number, required: true },
//       comment: { type: String, required: true },
//       user        : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     },
//     {
//       timestamps: true,
//     }
// )

// //^ Creating the product schema
// const productSchema = new mongoose.Schema(
// {
//     user        : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     name        : { type: String, required: true,},
//     image       : {type: String,required: true,},
//     brand       : { type: String, required: true,},
//     category    : { type: String, required: true,},
//     tagline    : { type: String, required: true,},
//     description : { type: String, required: true,},
//     rating      : { type: Number, required: true, default: 0},
//     numReviews  : { type: Number, required: true, default: 0},
//     price       : { type: Number, required: true, default: 0,},
//     countInStock: {type: Number,required: true,default: 0,},
//     reviews: [reviewSchema]
// },{ timestamps: true, }
// );


// //^ Exporting the model Product created using the above schema
// module.exports = mongoose.models.Product||mongoose.model('Product', productSchema);


const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    profile_image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const offerSchema = mongoose.Schema(
  {
    offer: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true }, //which user creates
    name: { type: String, required: true }, // name of the product
    main_image: { type: String, required: true }, // main image of the product
    all_images: [ { type: String, required: true } ], // all images of the product
    brand: { type: String, required: true }, // brand of the product
    category: { type: String, required: true }, // category of the product
    tagline: { type: String, required: true }, // tagline of the product
    description: [{ type: String, required: true }], // description of the product
    rating: { type: Number, required: true, default: 0 }, // rating of the product
    numReviews: { type: Number, required: true, default: 0 }, // number of reviews of the product
    price: { type: Number, required: true, default: 0 }, // price of the product
    countInStock: { type: Number, required: true, default: 0 }, // count of the product in stock
    reviews: [reviewSchema],
    offers: [offerSchema],
  },
  { timestamps: true }
);


module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
