// This function updates the given recipe in the database. No validation is done before
// updating the recipe. We are relying on the frontend to
// provide the right information.
//
// Params:
// - The body of the request must be a recipe. No validation is done before
//   adding the recipe to the database. we are relying on the frontend to
//   provide the right information.
//
function routeFactory(dbColl) {
    return function updateRecipe(req, res) {
        const ObjectID = require('mongodb').ObjectID;
        // Getting the id of the recipe to update from the url.
        let id;
        try {
            id = new ObjectID(req.params.id);
        }
        catch(err) {
            console.error(err);
            res.status(404).send("Invalid identifier.");
            return;
        }

        const docToUpdateIdentifier = {_id: id};
        const orderIfConflict = [['_id','asc']];
        // MongoDB does not allow to update the _id of a recipe.
        delete req.body._id;

        dbColl.findAndModify(docToUpdateIdentifier, orderIfConflict, {$set: req.body}, {upsert: false, new: true}, // Do not create a new record if no doc found.
            function(err, result) {

            // If an error occurred, display it.
            if(err) {
                console.error("An error occurred during the update :" + err);
                res.sendStatus(500);
                return;
            }

            res.status(200).send({ recipeFromDb: result.value, updateWasSuccessful: 1 });
        });

    }
}

module.exports = routeFactory;
