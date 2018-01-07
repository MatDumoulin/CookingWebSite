const getUserId = require('../jwt-reader');
// Finds the recipes that are matching the given filter. Gets only the name field
// from the matching recipes.

// Params:
// -filter: Partial name of recipes that is used to filter the results. It can be an empty string for no filtering.
function routeFactory(dbColl) {
    return function getRecipeNames(req, res) {
        const limit = 5;
        const userAuthId = getUserId(req);
        const filter = {"name": {$regex : ".*"+ req.query.filter +".*", $options : 'i'}, 'owner': userAuthId };

        dbColl.aggregate([
                { "$match": filter },
                { "$limit": limit },
                { "$group": { _id: "$name" } },
                // The insentitive column is there to allow a case insensitive sort.
                // MongoDB 3.4 does not allow it natively.
                { "$project": {  _id: 0, name: "$_id", "insensitive": { "$toLower": "$_id" }} },
                { "$sort": {insensitive: 1} }],
                 function(err, docs) {
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
