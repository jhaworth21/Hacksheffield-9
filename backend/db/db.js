const { MongoClient } = require("mongodb");
 
// Connect to your Atlas cluster
const client = new MongoClient(process.env.MONGO_URL);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);