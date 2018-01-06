const jwt = require('jsonwebtoken');
// Gets the recipes that are corresponding to the given filter.
// On top of it, it gets only the recipes that are in range from 'from' to 'to'.
//
// Params:
// -filter: Filtering the recipes by their name matching the given text.
// -from: Gets only the recipes starting from this index.
// -to: Gets only the recipes up to this index.
//
// Returns: A list of all recipes matching
function routeFactory(dbColl) {
    return function getRecipes(req, res) {
        // Getting the user from the jwt

        //const userAuthId = decoded.id;

        const filter = {"name": {$regex : ".*"+ req.query.filter +".*", $options : 'i'}, 'owner': userAuthId };
        const orderBy = {name: 1, rating: -1}; // name ascending, rating descending.
        const from = parseInt(req.query.from);
        const to = parseInt(req.query.to);

        // If any of the params was not sent
        if(!filter || Number.isNaN(from) || Number.isNaN(to)) {
            res.status(404).send("Invalid params.");
            return;
        }

        // Finds the recipes that are matching the given filter.
        dbColl.aggregate([
                { "$match": filter },
                // The insentitive column is there to allow a case insensitive sort.
                // MongoDB 3.4 does not allow it natively.
                { "$addFields": {  "insensitive": { "$toLower": "$name" }} },
                { "$sort": {insensitive: 1} },
                { "$skip" : from },
                { "$limit": to - from },
                { "$project": { _id: 1, name: 1, genre: 1, rating: 1}}],
                 function(err, recipes) {
                    if(err) {
                        console.error(err);
                        res.sendStatus(500);
                        return;
                    }

                    res.status(200).send(recipes);
                });
    }
}

module.exports = routeFactory;
