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

        req.body._id = new ObjectID(req.body._id);

        dbColl.insert(req.body, function(err, result) {

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

            res.status(201).send({ recipeFromDb: result.ops[0], insertWasSuccessful: 1 });
        });

    }
}

module.exports = routeFactory;
