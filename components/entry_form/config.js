/**
 * Set us up the vars
 **/

STITCH_APP_ID = "30mindewf-aewla";     // Change this to your stitch ID - found in the MongoDB Atlas Console - https://cloud.mongodb.com
DBNAME = "30mindewf";                   // Name this whatever you like.

/**
 * Establish a connection to the MongoDB Atlas Service using the Stitch SDK
 **/

const client = stitch.Stitch.initializeDefaultAppClient(STITCH_APP_ID);
const mongodb = client.getServiceClient(stitch.RemoteMongoClient.factory,"mongodb-atlas");
const db = mongodb.db(DBNAME);
