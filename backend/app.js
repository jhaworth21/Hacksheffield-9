const express = require('express');
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, "public")));
 
// Connect to Atlas cluster
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

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Server is running on port`, port));