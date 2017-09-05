// This function gets the given image from the asset folder.
//
// Params:
// - The identifier of the image (its name).
function routeFactory(imagesFolderLocation) {
    return function getImage(req, res) {
        const id = req.params.id;

        const options = {
            root: imagesFolderLocation,
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        res.sendFile(id, options);
    }
}

module.exports = routeFactory;
