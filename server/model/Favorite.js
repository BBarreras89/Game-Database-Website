import { Schema, model } from "mongoose";

const favoriteSchema = new Schema({
    title: {type: String, unique: true},
    image: String,
    addedAt: Date,
});

const Favorite = model("Favorite", favoriteSchema)

export { Favorite };