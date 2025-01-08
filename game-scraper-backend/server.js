const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const scrapeXboxGames = require("./xboxScraper");
const Game = require("./models/Game");

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// MongoDB Connection
const MONGO_URL =
  "mongodb+srv://surya:mongo1234@cluster0.686u6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schedule the scraper to run at 3:00 AM daily
schedule.scheduleJob("0 3 * * *", () => {
  console.log("Starting Xbox games scraping at 3:00 AM...");
  scrapeXboxGames();
});

// API to manually trigger the scraper
app.get("/scrape-xbox", async (req, res) => {
  try {
    await scrapeXboxGames();
    res.json({ message: "Xbox games scraped successfully" });
  } catch (error) {
    console.error("Error scraping Xbox games:", error);
    res.status(500).send("Error scraping Xbox games");
  }
});

// API to fetch games from the database
app.get("/games", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error("Error fetching games from MongoDB:", error);
    res.status(500).send("Error fetching games from MongoDB");
  }
});

// Real-time search games by title
app.get("/search-games", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Search for matching games (case-insensitive)
    const games = await Game.find({
      title: { $regex: query, $options: "i" },
    }).limit(10); // Limit to 10 results for performance

    res.json(games);
  } catch (error) {
    console.error("Error searching games:", error);
    res.status(500).send("Error searching games");
  }
});




// Get game details by ID
app.get("/game/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(game);
  } catch (error) {
    console.error("Error fetching game details:", error);
    res.status(500).send("Error fetching game details");
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
