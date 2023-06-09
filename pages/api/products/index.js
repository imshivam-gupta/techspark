import Product from "../../../models/product";
import mongoose from "mongoose";
import User from "../../../models/user";
import { log } from "console";

export default async function handler(req, res) {
 

  try {
    
    const { method } = req;
    await mongoose.connect(process.env.DB_URL)

    switch (method) {

        case "GET":
          
        
          try {
            
            const pageSize = 50
            const page = Number(req.query.pageNumber) || 1 

            const keyword = req.query.keyword?{
              name:{
                  $regex: req.query.keyword,
                  $options: 'i'
              }
            }: {}

            const count = await Product.count({...keyword})
            const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1));
            res.status(200).json({data: products,page,pages: Math.ceil(count/pageSize) });
          } catch (error) {
            log(error);
            res.status(400).json({ success: false });
          } finally
          {
            mongoose.connection.close();
          }
    

          break;
    
        case "POST":
          try {

            const user_email = req.headers.user_email;

            const temp =await User.findOne({email:user_email})
            console.log(temp);
            console.log(user_email);
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
    mongoose.connection.close();
  }

  
}
