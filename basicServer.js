import { MongoClient, ServerApiVersion } from "mongodb";
import { createServer } from "node:http";

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017/";

const hostname = "127.0.0.1";
const port = 3000;
const server = createServer((req, res) => {
    // res.statusCode = 200;
    // res.setHeader("Content-Type", "text/plain");

    if (req.method === "POST") {
        let body = "";
        console.log("method post is working");


        req.on("data", (chunk) => {
            body = +chunk.toString();
        });

        req.on("end", () => {
            console.log(body);
            
            const parsedBody = JSON.parse(body);
            run(parsedBody).this(function(id) {
                res.writeHead(201);
                res.end(JSON.stringify({ pizzaMenu: id }))
            });
        });
    }
    res.end("hello world test");
    // insertPizza().catch(console.dir);
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

async function insertPizza() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        const myDB = client.db("mongoTest");
        const myColl = myDB.collection("pizzaMenu");

        const doc = { name: "Pepperoni pizza", shape: "Triangle" };
        const result = await myColl.insertOne(doc);
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`
        );
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
