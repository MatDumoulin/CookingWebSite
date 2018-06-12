// Removes the recipe with the given id from the database.
//
// Params:
// -id: The identifier of the recipe to remove.
function routeFactory(dbColl) {
    return function removeRecipe(req, res) {
        const ObjectID = require('mongodb').ObjectID;
        const imageManager = require('../image-manager');
        const getUserId = require('../jwt-reader');

        const userId = getUserId(req);

        let id;
        try {
            id = new ObjectID(req.params.id);
        }
        catch(err) {
            console.error(err);
            res.status(404).send("Invalid identifier.");
            return;
        }

        dbColl.findAndRemove({_id: id}, [['_id',1]], (err, doc) => {
            if(err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            if(doc.value.owner != userId) {
                // The user does not have the permission to delete the recipe. We revert the removal of the recipe.
                dbColl.insert(doc.value, () => {});
                return res.status(401).send('unauthorized');
            }
            else {
                if(doc.value.image) {
                    imageManager.deleteImage(id.toString());
                }

                res.status(200).send({status: "Success"});
            }
        });
    }
}

module.exports = routeFactory;
