import React from "react";

const About: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* About Section */}
      <main className="flex-grow">
        <section className="py-12">
          <div className="container mx-auto px-6 text-center md:text-left">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              About <span className="text-blue-500">PC Games</span>
            </h2>

            {/* Content */}
            <div className="md:flex md:items-center md:justify-between">
              {/* Text Section */}
              <div className="md:w-2/3">
                <p className="text-lg leading-relaxed mb-6">
                  At{" "}
                  <span className="text-blue-500 font-semibold">PC Games</span>,
                  we’re passionate about delivering the best deals, latest
                  trends, and an unmatched gaming experience. Our platform is
                  dedicated to gamers worldwide, offering an extensive
                  collection of games, price tracking, and exclusive offers to
                  suit all preferences.
                </p>
                <p className="text-lg leading-relaxed">
                  Whether you're a casual gamer or a hardcore enthusiast, our
                  mission is to make gaming affordable, accessible, and exciting
                  for everyone. Join us on this journey and level up your gaming
                  experience with{" "}
                  <span className="text-blue-500 font-semibold">PC Games</span>.
                </p>
              </div>

              {/* Image Section */}
              <div className="md:w-1/3 mt-6 md:mt-0">
                <img
                  src="media/images/about-gaming.jpg" // Replace with the actual path to your image
                  alt="About PC Games"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
