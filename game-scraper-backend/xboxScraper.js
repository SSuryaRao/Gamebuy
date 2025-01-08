const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const Game = require("./models/Game");

// Use Puppeteer's stealth plugin
puppeteer.use(StealthPlugin());

const scrapeXboxGames = async () => {
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

    while (hasMore) {
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

      games = [...games, ...newGames];

      const uniqueGames = Array.from(new Map(games.map((game) => [game.title, game])).values());
      games = uniqueGames;

      hasMore = await page.evaluate(() => {
        const loadMoreButton = document.querySelector('button[aria-label="Load more"]');
        if (loadMoreButton) {
          loadMoreButton.click();
          return true;
        }
        return false;
      });

      if (hasMore) {
        await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 5000)));
      }
    }

    await browser.close();

    for (const game of games) {
      try {
        await Game.updateOne({ title: game.title }, game, { upsert: true });
      } catch (error) {
        console.error(`Error saving game '${game.title}':`, error.message);
      }
    }

    console.log("Games saved to MongoDB without duplicates");
  } catch (error) {
    console.error("Error scraping Xbox Store:", error);
  }
};

module.exports = scrapeXboxGames;
