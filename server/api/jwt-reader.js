const jwt = require('jsonwebtoken');

module.exports =  function getUserId(req) {
    let decoded;

    try {
        // The substring is to remove the 'Bearer ' string before the jwt.
        // This prefix must be in the header for the JWT middleware, but not for the jsonwebtoken library.
        decoded = jwt.verify(req.headers.authorization.substring(7), 'mycookingbook-billie&keetah');
    } catch (e) {
        console.log(e);
        return res.status(401).send('unauthorized');
    }

    return decoded.id;
}
