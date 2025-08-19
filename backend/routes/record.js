import express from "express"
import db from "../db/connection.js";
import { ObjectId } from "mongodb"

const router = express.Router()

//get the list of all the records
router.get("/", async (req, res) => {
    let collection = await db.collection("transactions");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

//get a single record
router.get("/:id", async (req, res) => {
    let collection = await db.collection("transactions");
    let query = { _id: new ObjectId(req.params.id) };
    let results = await collection.findOne(query);

    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

//creat e a new record
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
        let collection = await db.collection("transactions");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(200);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

//update the record
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level,
            }
        }

        let collection = await db.collection("transactions");
        let result = await collection.updateOne(query, updates);
        res.send(results).status(200);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
})

//delete a record
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const collection = await db.collection("transactions");

        let result = await collection.deleteOne(query);
        res.send(results).status(200);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
})

export default router;