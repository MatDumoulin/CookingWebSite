// This is the manager for the routers of the main server.
// It acts like an embedded api to keep a nice separation between the server and
// the routes.
// Basically, the server is there to render the pages and the api is there to
// get data from the database.
//
// The API is not separated onto an other server because the scale of the
// project is small. The time required to securize the API would not worth the benefits.
function routerManager(express, db) {
    const router = express.Router();
    const recipesCollection = db.collection('recipes');

    // Getting all the handlers for the routes.
    const getRecipes = require('./routes/recipes_get');
    const getSpecificRecipe = require('./routes/recipes_get_specific');
    const getRecipeNames = require('./routes/recipes_get_names');
    const getRecipeGenres = require('./routes/recipes_get_genres');
    const getRecipeAdvancedSearch = require('./routes/recipes_advanced_search');
    const addRecipe = require('./routes/recipes_add');
    const getIngredientsName = require('./routes/ingredients_get_names');

    // Creating the routes
    router.get('/recipes', getRecipes(recipesCollection));
    router.post('/recipe', addRecipe(recipesCollection));
    router.get('/recipes/names', getRecipeNames(recipesCollection));
    router.get('/recipes/genres', getRecipeGenres(recipesCollection));
    router.get('/recipes/ingredients', getIngredientsName(recipesCollection));
    router.post('/recipes/advanced', getRecipeAdvancedSearch(recipesCollection));
    router.route('/recipes/:id').get(getSpecificRecipe(recipesCollection));

    // Got to return the router for it to be used later on.
    return router;
}


module.exports = routerManager;
