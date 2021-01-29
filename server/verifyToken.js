const jwt = require('jsonwebtoken');

const public = '/api/authentication';
const static = '/api';

module.exports = (req, res, next) => {
    //If public route no authentication
    if (req.path.startsWith(public)) return next();
    if (!req.path.startsWith(static)) return next();

    //Get token
    let token = req.header('auth-token');

    //Verify token
    try {
        let verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token.');
    }
}