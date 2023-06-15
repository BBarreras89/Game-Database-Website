import express from "express";
import mongoose from "mongoose";
import { Favorite } from "./model/Favorite.js";

mongoose.connect("mongodb+srv://reposurfers:OGoc4kyEVyf2Ho5G@mern-gaming.mw02ffd.mongodb.net/?retryWrites=true&w=majority")

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});

app.get("/api/favorites", (req, res) => {
    Favorite.find({})
        .then(faves => {
            console.log(faves)
            res.json(faves)
        })
});

app.post("/api/favorites", (req, res) => {
    const title = req.body.title;
    const image = req.body.image;
    const addedAt = Date.now();

    console.log(req.body)

    const favorite = new Favorite({
        title,
        image,
        addedAt
    });

    favorite.save()
        .then(fave => res.json(fave))
        .catch(err => res.status(400).json({ success: false }));
});

app.delete("/api/favorites/:id", (req, res) => {
    console.log(req.body)
    Favorite.deleteOne({ _id: req.params.id})
        .then(game => {
            console.log(game);
            })
        .catch(error => {
        console.error(error);
        });

        res.send("ok")
});

app.listen(3000, () => console.log("Server startet on port 3000"));