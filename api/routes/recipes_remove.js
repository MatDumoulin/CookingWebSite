// Removes the recipe with the given id from the database.
//
// Params:
// -id: The identifier of the recipe to remove.
function routeFactory(dbColl) {
    return function removeRecipe(req, res) {
        const ObjectID = require('mongodb').ObjectID;
        let id;
        try {
            id = new ObjectID(req.params.id);
        }
        catch(err) {
            console.error(err);
            res.status(404).send("Invalid identifier.");
            return;
        }

        dbColl.deleteOne({_id: id}, function(err, status) {
            if(err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            res.status(200).send('deleted');
        });
    }
}

module.exports = routeFactory;
