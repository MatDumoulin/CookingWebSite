// Gets all the recipes that are matching the given information.
//
// Params:
// All params are optionnal. If they are empty/null, they will not be used as a filter.
// -name: The name of the recipes to get. Can be a partial name.
// -genre: The genre of the recipes to get. Can be a partial genre.
// -rating: All recipe with greater or equal rating will be retrieved from the db.
// -totalTime: All recipe with lower or equal duration (prep + cooking + cooldown) will be retrieved from the db.
// -ingredients: All the names of the ingredients that must be in the retrieved recipes. These name can be partial.
function routeFactory(dbColl) {
    return function getRecipeAdvancedSearch(req, res) {

        // Setting up the stages for the aggregate query.
        var project = { $project: {
                              name: 1,
                              genre:1,
                              rating: 1,
                              "ingredientSection.ingredients.name":1,
                              totalTime: {$sum: ["$cookTime", "$prepTime"]}
                          }
                      };

        var match = { };
        // I only include the field that are in the request to speed up the db query.
        if(req.body.name) {
          match.name = { $regex: ".*" + req.body.name + ".*", $options : 'i' }
        }

        if(req.body.genre) {
          match.genre = { $regex: ".*" + req.body.genre + ".*", $options : 'i' }
        }

        if(req.body.rating) {
          match.rating = { $gte: req.body.rating }
        }

        if(req.body.totalTime) {
          match.totalTime = { $lte: req.body.totalTime }
        }

        if(req.body.ingredients.length > 0) {

            let ingredientQuery = {
                                    include: [],
                                    exclude: []
                                  };
            let currentSelector;

            for(let i = 0; i < req.body.ingredients.length; ++i) {
                currentSelector = { $elemMatch : { name: {$regex: ".*" + req.body.ingredients[i].name + ".*", $options : 'i' } } };

                // If the ingredient must be in the recipe.
                if(req.body.ingredients[i].include) {
                    ingredientQuery.include.push( currentSelector );
                }
                // Otherwise, it must not be in the recipe.
                else {
                  ingredientQuery.exclude.push( currentSelector );
                }
            }
            // Only add to the query if there is a positive number of ingredient to include.
            if(ingredientQuery.include.length > 0) {
              match['ingredientSection.ingredients'] = { $all: ingredientQuery.include };
            }
            // Only add to the query if there is a positive number of ingredient to exclude.
            if(ingredientQuery.exclude.length > 0) {
              match['ingredientSection.ingredients'] = { $not: { $all: ingredientQuery.exclude }};
            }
        }

        dbColl.aggregate([project, {$match: match}], function(err, docs) {
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
