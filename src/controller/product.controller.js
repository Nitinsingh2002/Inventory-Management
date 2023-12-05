import path from "path"
import ProductModel from "../model/product.model.js";

export default class ProductController {
    getProduct(req, res) {
      let products = ProductModel.get()
      res.render("product", {products:products ,userEmail:req.session.userEmail })
    }



    getAddForm(req,res){
      res.render('form', { errorMessage: null });
    }




// adding form data to model
    addNewProduct(req,res){

      const{name,desc,price} = req.body
      //file come under req.file and images is folder when image are stored
      const imageUrl  ="images/"+req.file.filename

      ProductModel.add(name,desc,price,imageUrl)

      //sending to product ejs file
      let products = ProductModel.get()
      return res.render("product", {products:products,userEmail:req.session.userEmail  })
    }



//finding product details for performing operions(delete,update)
    getProductFound(req,res){
      const id = req.params.id;
      let ProductFound = ProductModel.getById(id)

      if(ProductFound){
        res.render("update-product",{product:ProductFound, errorMessage:null,userEmail:req.session.userEmail })
        console.log(ProductFound)
      }
      else{
       res.send("Product not found")
      }
    }


  
    getProductUpdate(req, res) {
      const {id,  name, desc, price } = req.body;
      const updatedProduct = {
          id,
          name,
          desc,
          price
      };
  
      if (req.file) {
          const newImageUrl = "images/" + req.file.filename;
          updatedProduct.imageUrl = newImageUrl;
      }
  
      ProductModel.update(updatedProduct);
  
      // Get the updated list of products
      let products = ProductModel.get();
      return res.render('product', { products: products,userEmail:req.session.userEmail  });
  }
  
  


    deleteProduct(req,res){
      const  id = req.params.id;
     let ProductFound = ProductModel.delete(id);

      let products = ProductModel.get()
      return res.render('product',{products:products,userEmail:req.session.userEmail })

    }
    
}





















// export default function ProductController(req, res) {

//    let products= ProductModel.get()
  
//     //  product is name of ejs file  and the products is the data tht is send to product.ejsa
//    res.render("product",{products:products })




// }
