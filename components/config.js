/**
 * Set us up the vars
 * */
STITCH_APP_ID = "30mindewf-urhlb";     // Change this to your stitch ID - found in the MongoDB Atlas Console - https://cloud.mongodb.com
DBNAME = "30minDEWF";                   // Name this whatever you like.

/**
 * Establish a connection to the MongoDB Atlas Service using the Stitch SDK
 */

const client = stitch.Stitch.initializeDefaultAppClient(STITCH_APP_ID);
const mongodb = client.getServiceClient(stitch.RemoteMongoClient.factory,"mongodb-atlas");
const db = mongodb.db(DBNAME);

/**
 * Create a logout function
 */
function logout() {
    client.auth.isLoggedIn = false;
    client.auth.logout().then(() => {
        // So logout of Google explicitly by going to https://accounts.google.com/logout
        // NOTE: this will log you out of all the Google accounts that you are signed into
        // window.location.replace("https://accounts.google.com/logout");
        window.location = "/index.html";
    });
}