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
        const imageManager = require('../image-manager');

        let newRecipe = req.body;
        newRecipe._id = new ObjectID(newRecipe._id);

        // Setting up the recipe before saving it to the database.
        const fullImage = newRecipe.fullImage;
        delete newRecipe.fullImage; // Not saving the image to the database.

        if(fullImage) {
            newRecipe.image = newRecipe._id.toString();
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

            // Saving the image to the file system.
            if(fullImage) {
                imageManager().saveImage(newRecipe.image, fullImage);
            }

            res.status(201).send({ recipeFromDb: result.ops[0], insertWasSuccessful: 1 });
        });

    }
}

module.exports = routeFactory;
