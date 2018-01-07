fs = require('fs');
// Gets the recipe with the given id in the database. This id is unique.
//
// Params:
// -id: The identifier of the recipe.
function routeFactory(dbColl, imagesFolderLocation) {
    return function getRecipe(req, res) {
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

        dbColl.find({_id: id}).toArray(function(err, recipe) {
            if(err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            res.status(200).send(recipe[0]);

            // Retrieving the image from the file system.
            /*fs.readFile(imagesFolderLocation + recipe[0].image, (err, image) => {
                if(err) {
                    console.error(err);
                    recipe[0].fullImage = [];
                }
                else {
                    recipe[0].fullImage = image.data;
                }

                res.status(200).send(recipe[0]);
            });*/
        });
    }
}

module.exports = routeFactory;
