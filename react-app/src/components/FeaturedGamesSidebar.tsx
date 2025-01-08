import React from "react";
import "./FeaturedGames.css";

interface SidebarProps {
  categories: string[];
  sortOrder: string;
  setSortOrder: (order: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
}

const FeaturedGamesSidebar: React.FC<SidebarProps> = ({
  categories,
  sortOrder,
  setSortOrder,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
}) => {
  return (
    <div className="sidebar">
      <h2>Filters</h2>
      <div>
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Price Range: {priceRange}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Sort By:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="none">None</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FeaturedGamesSidebar;
