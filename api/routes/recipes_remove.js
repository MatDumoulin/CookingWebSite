// Removes the recipe with the given id from the database.
//
// Params:
// -id: The identifier of the recipe to remove.
function routeFactory(dbColl) {
    return function removeRecipe(req, res) {
        const ObjectID = require('mongodb').ObjectID;
        const imageManager = require('../image-manager');
        let id;
        try {
            id = new ObjectID(req.params.id);
        }
        catch(err) {
            console.error(err);
            res.status(404).send("Invalid identifier.");
            return;
        }

        dbColl.findAndRemove({_id: id}, [['_id',1]], function(err, doc) {
            if(err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            if(doc.value.image) {
                imageManager().deleteImage(doc.value.image);
            }

            res.status(200).send('deleted');
        });
    }
}

module.exports = routeFactory;
