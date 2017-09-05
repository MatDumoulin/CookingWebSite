// Finds all of the recipe genres in the database.

// Params:
// No parameter is needed.
function routeFactory(dbColl) {
    return function getRecipeGenres(req, res) {
        // These variable are used only for clarity purpose. They could have
        // been inline in the 'distinct' call but it wasn't explicit enough.
        const field = 'genre';
        const condition = {"genre": {$exists: true, $ne: ""}};

        // Gets all of the recipe genre from the database.
        dbColl.distinct(field, condition, function(err, docs) {
            if(err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            res.status(200).send(docs);
        });
    }
}

module.exports = routeFactory;
