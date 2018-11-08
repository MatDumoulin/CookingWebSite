const stream = require("stream");
const Storage = require("@google-cloud/storage");
const fs = require("fs");

// Google auth needs to read a file that contains a json value with our credentials.
// But, we can't commit this file since it will compromise our credentials. Thus,
// we need to create a file with the credentials for Google Cloud Storage to read it.
const credentialsFilePath = "./config/GOOGLE_APPLICATION_CREDENTIALS.json";

fs.mkdirSync("./config", { recursive: true }, (err) => {
    if (err) throw err;
});
fs.writeFileSync(credentialsFilePath, process.env.GOOGLE_APPLICATION_CREDENTIALS);

const gcpStorageBucketName = process.env.IMAGE_STORAGE_NAME;
const storage = Storage({
    projectId: "mycookbook-1",
    keyFilename: credentialsFilePath
});
const bucket = storage.bucket(gcpStorageBucketName);

function imageManager() {
    let publicMethods = {
        middleware: null,
        getPublicUrl: null
    };

    /**
     * This middleware checks if there is a value on the rep.body.fullImage variable
     * of the request. If it is the case, it saves it to the cloud storage.
     * req.body.fullImage is processed and the req will have a new propertie:
     * ``fileError`` if there was an error while saving the image.
     *
     * On top of that, the req.body.image will be set to the public url of the image
     * if the save on the cloud was successful .
     */
    publicMethods.middleware = function(req, res, next) {
        const recipe = req.body;
        if (!recipe || !recipe.image || recipe.image.startsWith("http")) {
            return next();
        }
        // Extracting the basic image info.
        const imageName = recipe._id;
        let image = recipe.image;
        image = image.toString().replace(/^data:([A-Za-z-+\/]+);base64,/, "");
        const imageStream = convertBase64ToStream(image);
        const file = bucket.file(imageName);

        //Pipe the 'bufferStream' into a 'file.createWriteStream' method.
        imageStream
            .pipe(
                file.createWriteStream({
                    metadata: {
                        contentType: "image/jpeg",
                        metadata: {
                            custom: "metadata"
                        }
                    },
                    public: true
                })
            )
            .on("error", err => {
                req.fileError = err;
                req.body.image = null;
                next(err);
            })
            .on("finish", () => {
                // The file upload is complete.
                file.makePublic().then(() => {
                    req.body.image = publicMethods.getPublicUrl(imageName);
                    next();
                });
            });
    };

    publicMethods.deleteImage = function(imageName) {
        // Deletes the file from the bucket
        bucket
            .file(imageName)
            .delete()
            .then(() => {
                console.log(`gs://${bucket.name}/${imageName} deleted.`);
            })
            .catch(err => {
                console.error("ERROR:", err);
            });
    };

    // Returns the public, anonymously accessable URL to a given Cloud Storage
    // object.
    // The object's ACL has to be set to public read on Google Cloud in order for this function to work.
    publicMethods.getPublicUrl = function(filename) {
        return `https://storage.googleapis.com/${gcpStorageBucketName}/${filename}`;
    };

    return publicMethods;
}

function convertBase64ToStream(base64Data) {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(new Buffer(base64Data, "base64"));

    return bufferStream;
}

module.exports = imageManager();
