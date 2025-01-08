const mongoose = require("mongoose");

// Define the schema for the Game model
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
});

// Check if the model already exists; if not, define it
const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

module.exports = Game;
