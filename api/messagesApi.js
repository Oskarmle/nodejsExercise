const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion } = require("mongodb");
const createServer = require("node:http");

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log("Time: ", Date().toString());
    next();
};
router.use(timeLog);

// define the home page route
router.get("/", (req, res) => {
    res.send("Messages");
});
// define the about route
router.post("/", (req, res) => {
    console.log("req", req.body);

    res.send("Post messages");
});

module.exports = router;
