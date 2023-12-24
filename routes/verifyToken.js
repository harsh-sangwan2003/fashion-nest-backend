const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.token;

    if (authHeader) {

        jwt.verify(token, process.env.JWT_SEC, (err, user) => {

            if (err)
                res.status(403).send("Token is not valid.");

            res.user = user;
            next();
        })
    }

    else {

        res.status(401).send("You are not authenticated.");
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {

    verifyToken(req, res, () => {

        if (req.user.id === req.params.id || req.user.isAdmin)
            next();

        else
            res.status(403).send("You are not allowed to do that!");
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization };