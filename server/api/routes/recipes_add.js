const getUserId = require('../jwt-reader');

// This function adds the given recipe to the database. No validation is done before
// adding the recipe to the database. we are relying on the frontend to
// provide the right information.
//
// Params:
// - The body of the request must be a recipe. No validation is done before
//   adding the recipe to the database. we are relying on the frontend to
//   provide the right information.
//
function routeFactory(dbColl) {
    return function addRecipe(req, res) {
        const ObjectID = require('mongodb').ObjectID;

        let newRecipe = req.body;
        newRecipe._id = new ObjectID(newRecipe._id);

        // Getting the user from the jwt
        const userAuthId = getUserId(req);
        newRecipe.owner = userAuthId;

        // If there was an error with the image, cancel the add and notify the user.
        if (req.imageError) {
            console.log(
                "An error occurred while uploading the image to the cloud."
            );
            console.log("Error:", req.imageError);
            res.sendStatus(500);
            return;
        }

        dbColl.insert(newRecipe, function(err, result) {

            // If an error occurred, display it.
            if(result.writeError != null) {
                console.log("A write error occurred during the insertion.");
                console.log("Error code:" + result.writeError.code + ": " + result.writeError.errmsg);
            }
            if(result.writeConcernError != null) {
                console.log("A write concern error occurred during the insertion.");
                console.log("Error code:" + result.writeConcernError.code + ": " + result.writeConcernError.errmsg);
            }

            if(err) {
                console.error(err);
            }

            if(err || result.writeError != null || result.writeConcernError != null) {
                res.sendStatus(500);
            }

            res.status(201).send(result.ops[0]);
        });

    }
}

module.exports = routeFactory;
