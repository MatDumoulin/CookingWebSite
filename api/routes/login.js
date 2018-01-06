let GoogleAuth = require('google-auth-library');
const jwt = require('jsonwebtoken');

const CLIENT_ID = "611116082789-nnb2ap65tvvfiq99nnve5oh8d6tksc2a.apps.googleusercontent.com";
const expiresInSeconds = 3600;
let auth = new GoogleAuth;
let client = new auth.OAuth2(CLIENT_ID, '', '');

// This function verifies if the given user is known or not.
//
// Params: The body of the request must contain
// - email: The email of the user. (only if logged in using native app authentication)
// - password: The password of the user. (only if logged in using native app authentication)
// - googleToken: The token issued by google. (only if logged in using Google auth)
function routeFactory(usersColl) {
    return function login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const googleToken = req.body.googleToken;

        if(googleToken) {
            // Handle login with Google.
            loginWithGoogle(usersColl, res, googleToken)
        }
        else if(email && password) {
            // Handle standard login through the application.
            return res.sendStatus(501); // Not implemented.
        }
        else {
            return res.sendStatus(401); // Unauthorized
        }
    }
}

function loginWithGoogle(usersColl, res, googleToken) {
    client.verifyIdToken(googleToken, CLIENT_ID, (e, login) => {
                const payload = login.getPayload();
                const userid = payload['sub'];

                // First, we check if the user exists in the database.
                usersColl.find({authId: userid}).toArray((err, user) => {
                    // If an error occurred with the database, signal it.
                    if(err) {
                        console.error(err);
                        res.sendStatus(500);
                        return;
                    }

                    // If no user is found in the database, create a new user.
                    if(!user || user.length <= 0) {
                        const newUser = {
                            authId: userid,
                            firstName: payload['given_name'],
                            familyName: payload['family_name'],
                            email: payload['email'],
                            profilePicture: payload['picture'],
                            locale: payload['locale']
                        }
                        usersColl.insert(newUser, (error, result) => {
                            if(error) {
                                console.error(error);
                                res.sendStatus(500);
                                return;
                            }

                            // Creating the JWT.
                            const userToken = createToken(userid);

                            res.status(201).send({ user: result.ops[0],
                                                   token: userToken,
                                                   tokenExpiresIn: expiresInSeconds,
                                                   insertWasSuccessful: 1 });
                        });
                    }
                    else {
                        getUserFromDBUsingAuthId(usersColl, res, userid);
                    }
                });
            });
}

function getUserFromDBUsingAuthId(usersColl, res, authenticationId) {
    usersColl.find({authId: authenticationId}).toArray((err, userFromDb) => {
        // If an error occurred with the database, signal it.
        if(err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        // Creating the JWT.
        const userToken = createToken(authenticationId);

        res.status(200).send({ user: userFromDb[0],
                               token: userToken,
                               tokenExpiresIn: expiresInSeconds });
    });
}

function createToken(userId) {
    console.log(userId);
    return jwt.sign({ id: userId }, 'mycookingbook-billie&keetah', { algorithm: 'HS256', expiresIn: expiresInSeconds });
}

module.exports = routeFactory;
