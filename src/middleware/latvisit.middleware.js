export default function SetLastVisit(req, res, next) {
    // If 'lastvisit' cookie is already available, update the 'lastvisit' variable in res.locals
    if (req.cookies.lastvisit) {
        res.locals.lastvisit = new Date(req.cookies.lastvisit).toLocaleString();
    } else {
        // If 'lastvisit' cookie is not available, set a new cookie with current time as the last visit
        res.cookie('lastvisit', new Date().toISOString(), {
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds
        });
    }
    next();
}
