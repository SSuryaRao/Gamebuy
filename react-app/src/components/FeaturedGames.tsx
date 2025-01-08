import React, { useState, useEffect } from "react";
import FeaturedGamesSidebar from "./FeaturedGamesSidebar";
import "./FeaturedGames.css";

interface Game {
  title: string;
  price: string;
  image: string;
}

const ITEMS_PER_PAGE = 12; // Load 12 games at a time

const FeaturedGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("none");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch games from the backend
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/games");
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await response.json();

        const cleanedData = data.map((game: any) => ({
          title: game.title,
          price: game.price.replace(/[^\d.]/g, ""),
          image: game.image,
        }));

        setGames(cleanedData);
        setFilteredGames(cleanedData);
        setDisplayedGames(cleanedData.slice(0, ITEMS_PER_PAGE)); // Show the first 12 games
      } catch (err) {
        setError("Failed to load games. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Apply filters and sorting
  const applyFiltersAndSort = () => {
    let updatedGames = [...games];

    if (sortOrder === "asc") {
      updatedGames.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === "desc") {
      updatedGames.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    updatedGames = updatedGames.filter(
      (game) => parseFloat(game.price) <= priceRange
    );

    if (selectedCategory !== "All") {
      updatedGames = updatedGames.filter((game) =>
        game.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    setFilteredGames(updatedGames);
    setDisplayedGames(updatedGames.slice(0, ITEMS_PER_PAGE)); // Reset to show the first 12 games
    setCurrentPage(1); // Reset current page when filters change
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [sortOrder, selectedCategory, priceRange, games]);

  // Load more games
  const loadMoreGames = () => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedGames((prev) => [
      ...prev,
      ...filteredGames.slice(startIndex, endIndex),
    ]);
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="featured-games-container">
      <FeaturedGamesSidebar
        categories={["All", "Action", "Adventure", "RPG"]}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      <div className="game-list">
        {loading ? (
          <p>Loading games...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : displayedGames.length > 0 ? (
          <>
            {displayedGames.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
            {displayedGames.length < filteredGames.length && (
              <div className="load-more-button-container">
                <button className="load-more-button" onClick={loadMoreGames}>
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <p>No games match your filters.</p>
        )}
      </div>
    </div>
  );
};

// Separate GameCard component for rendering each game
const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <div className="game-card">
    <img
      src={game.image}
      alt={game.title}
      onError={(e) => {
        e.currentTarget.src = "/path/to/placeholder-image.jpg";
      }}
    />
    <div className="game-info">
      <h1>{game.title}</h1>
      <div className="game-price">${game.price}</div>
      <button>Buy now</button>
    </div>
  </div>
);

export default FeaturedGames;
