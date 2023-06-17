import mongoose from "mongoose";
import User from "../../../models/user";


export default async function handler(req, res) {
 

  try {
    
    const { method } = req;
    await mongoose.connect(process.env.DB_URL)

    switch (method) {

        case "GET":
            
          try {
            const user_email = req.headers.user_email;
            const user = await User.findOne({ email: user_email });
            res.status(200).json({data: user});
          } catch (error) {
            console.log(error);
            res.status(400).json({ message: "user not found" });
          } 

          break;
    
          try {

            const user_email = req.headers.user_email;

            const temp =await User.findOne({email:user_email})
            // console.log(temp);
            // console.log(user_email);
            const {name,main_image,all_images,quantity,brand,category,tagline,description,price,offers} = req.body;
            const product = new Product({
              user:temp._id,
              name,
              main_image,
              all_images,
              brand,
              category,
              tagline,
              price,
              description,
              offers,
              countInStock:quantity
            })
              
            const createdProduct = await product.save()
            res.status(200).json({ success: true, product: createdProduct })
      
          } catch (error) {
            console.log(error);
            res
              .status(500)
              .json({ success: false, message: "Internal Server Error" });
          }
    
          break;
        default:
          res.status(400).json({ success: false });
          break;
      }
  } catch (error) {
    console.log(error);
  } finally {
    // mongoose.connection.close();
  }

  
}
