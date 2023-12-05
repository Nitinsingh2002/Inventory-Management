import ProductModel from "../model/product.model.js";
import UserModel from "../model/user.model.js"


export default class UserController {
    getRegister(req, res) {
        res.render('signUp')
    }
    getLogin(req, res) {
        res.render('login', {
            errorMessage: null,
        })
    }

    postRegister(req, res) {
        const { name, email, password } = req.body;
        UserModel.add(name, email, password);

        return res.render('login', {
            errorMessage: null,
        })
    }





    postLogin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.checkLogin(email, password);

        if (!user) {
            return res.render('login', { errorMessage: 'Invalid Credentials' });
        }

        req.session.userEmail = email;


        let products = ProductModel.get()
        return res.render("product", { products: products, userEmail: req.session.userEmail })
    }

    logout(req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err)
            }
            else{
                res.redirect('/login')
            }
        })
    }

}