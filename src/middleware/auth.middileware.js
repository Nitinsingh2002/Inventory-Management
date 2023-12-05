export default function auth(req, res, next) {
    if (req.session.userEmail) {
        next()
    }
    else {
        res.redirect('/login')
    }
}



//check login is available  or not if not it  redirect to login page so we add this middleware except login and register page 