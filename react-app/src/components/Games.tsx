import React from "react";
import FeaturedGames from "./FeaturedGames"; // Import FeaturedGames component

const Games: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
    

      {/* Games Section */}
      <main className="flex-grow">
        <section className="py-12">
          <div className="container mx-auto px-6">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
              Explore <span className="text-blue-500">Games</span>
            </h2>

            {/* Featured Games */}
            <FeaturedGames />
          </div>
        </section>
      </main>

   
    </div>
  );
};

export default Games;
