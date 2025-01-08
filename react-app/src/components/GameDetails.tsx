import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Game {
  _id: string;
  title: string;
  price: string;
  image: string;
  description?: string; // Optional if you want to include a game description
}

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the game ID from the URL
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch game details by ID
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/game/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch game details");
        }
        const data = await response.json();
        setGame(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-700">Loading game details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-700">Game not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Game Title */}
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{game.title}</h1>
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-10">
          {/* Game Image */}
          <img
            src={game.image}
            alt={game.title}
            className="w-full max-w-sm rounded-lg shadow-lg object-cover mb-6 lg:mb-0"
          />
          {/* Game Details */}
          <div className="flex-1">
            {/* Game Price */}
            <p className="text-2xl font-semibold text-gray-700 mb-4">
              Price: <span className="text-green-500">{game.price}</span>
            </p>
            {/* Game Description */}
            {game.description && (
              <p className="text-gray-600 mb-6 leading-relaxed">
                {game.description}
              </p>
            )}
            {/* Add to Cart Button */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              onClick={() => alert(`${game.title} added to cart!`)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
