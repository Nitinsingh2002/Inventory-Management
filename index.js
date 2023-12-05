import express, { urlencoded } from 'express';
import ProductController from './src/controller/product.controller.js';
import ProductModel from './src/model/product.model.js'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import validateRequest from './src/middleware/validation.middleware.js';
import { uploadFile } from './src/middleware/file-upload.middleware.js';
import UserController from './src/controller/user.controller.js';
import session from 'express-session';
import auth from './src/middleware/auth.middileware.js';
import cookieParser from 'cookie-parser';
import SetLastVisit from './src/middleware/latvisit.middleware.js';


const server = express();
server.use(express.urlencoded({ "extended": false }))
//use cookie-parser and and use last visit
server.use(cookieParser())






// Rendering static files
server.use(express.static('public'))
server.use(express.static('src/views'));
server.use(express.static('css'))
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))



//setting view engine
server.set('view engine', 'ejs');
// setting the directory of ejs
server.set("views", path.join(path.resolve(), 'src', 'views'))
//using ejs layouts
server.use(ejsLayouts);






// Creating an instance of the ProductController for calling method (getProduct) if we used class based controller
const productController = new ProductController();
const userController = new UserController();

server.get("/",SetLastVisit,auth, productController.getProduct);
server.get("/new",auth, productController.getAddForm)


//uploadFile.single('imageUrl') is multer  middleware that we created in middleware folder single means only one file select to upload
server.post("/",auth, uploadFile.single('imageUrl'), validateRequest, productController.addNewProduct)


server.get("/product-update/:id",auth, productController.getProductFound)
server.post("/product-update", auth,uploadFile.single('imageUrl'), productController.getProductUpdate)
server.post("/delete-product/:id",auth, productController.deleteProduct)
server.get("/register", userController.getRegister)
server.get("/login", userController.getLogin)
server.post("/register", userController.postRegister)
server.post("/login", userController.postLogin)
server.get('/logout',auth,userController.logout)
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port number: ${port}`);
});
