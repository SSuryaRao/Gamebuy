const express = require("express");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cors = require("cors");
const mongoose = require("mongoose");

puppeteer.use(StealthPlugin());

const app = express();
const PORT = 5000;

app.use(cors());

// MongoDB Connection
const MONGO_URL =
  "mongodb+srv://surya:mongo1234@cluster0.686u6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schema for Games
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }, // Enforce unique titles
  price: { type: String, required: true },
  image: { type: String, required: true },
});

const Game = mongoose.model("Game", gameSchema);

// Scrape Xbox Games and Save to MongoDB
app.get("/scrape-xbox", async (req, res) => {
  const url = "https://www.xbox.com/en-US/games/all-games";
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });

    let games = [];
    let hasMore = true;
    let iteration = 0;
    const maxIterations = 1000;

    while (hasMore && iteration < maxIterations) {
      iteration++;
      console.log(`Scraping iteration: ${iteration}`);

      await page.waitForSelector(".ProductCard-module__cardWrapper___6Ls86", { timeout: 60000 });

      const newGames = await page.evaluate(() => {
        const gameElements = document.querySelectorAll(".ProductCard-module__cardWrapper___6Ls86");
        const gameData = [];

        gameElements.forEach((gameElement) => {
          const title = gameElement.querySelector(".ProductCard-module__title___nHGIp")?.innerText || "No title";
          const price = gameElement.querySelector(".ProductCard-module__price___cs1xr")?.innerText || "No price";

          const imageElement = gameElement.querySelector(".WrappedResponsiveImage-module__image___QvkuN");
          const image = imageElement
            ? imageElement.getAttribute("src") || imageElement.getAttribute("data-src")
            : "";

          gameData.push({ title, price, image });
        });

        return gameData;
      });

      console.log(`Found ${newGames.length} games in this iteration.`);
      games = [...games, ...newGames];

      // Remove duplicates
      const uniqueGames = Array.from(new Map(games.map((game) => [game.title, game])).values());
      console.log(`Unique games count: ${uniqueGames.length}`);
      games = uniqueGames;

      try {
        hasMore = await page.evaluate(() => {
          const loadMoreButton = document.querySelector('button[aria-label="Load more"]');
          if (loadMoreButton) {
            loadMoreButton.click();
            return true;
          }
          return false; // No more "Load More" button
        });
      } catch (err) {
        console.error("Error clicking 'Load More' button:", err.message);
        hasMore = false;
      }

      if (hasMore) {
        await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 5000))); // 5 seconds delay
      }
    }

    console.log(`Total unique games scraped: ${games.length}`);
    await browser.close();

    // Save games to MongoDB
    for (const game of games) {
      try {
        await Game.updateOne({ title: game.title }, game, { upsert: true }); // Upsert to avoid duplicates
      } catch (error) {
        console.error(`Error saving game '${game.title}':`, error.message);
      }
    }

    console.log("Games saved to MongoDB without duplicates");

    res.json({ message: "Games scraped and saved to MongoDB without duplicates", games });
  } catch (error) {
    console.error("Error scraping Xbox Store:", error);
    res.status(500).send("Error scraping Xbox Store");
  }
});

// Get Games from MongoDB for Frontend
app.get("/games", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error("Error fetching games from MongoDB:", error);
    res.status(500).send("Error fetching games from MongoDB");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
