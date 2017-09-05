// Finds the ingredients that are matching the given filter. This function only
// get the name of the matching ingredients.

// Params:
// -filter: Partial name of an ingredient that is used to filter the results. It can be an empty string for no filtering.
function routeFactory(dbColl) {
    return function getIngredients(req, res) {
        const limit = 5;
        const filterForField = {"ingredientSection.ingredients.name": {'$regex' : ".*" + req.query.filter +".*", '$options' : 'i'} };

        dbColl.aggregate([
                { "$project": {"ingredientSection.ingredients.name":1} },
                { "$unwind": "$ingredientSection" },
                { "$unwind": "$ingredientSection.ingredients" },
                { "$match": filterForField },
                { "$limit": limit },
                { "$group": { _id: "$ingredientSection.ingredients.name" } },
                { $project: {  _id: 0, name: "$_id"} }],
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
