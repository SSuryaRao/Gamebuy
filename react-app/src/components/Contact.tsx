import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Navbar */}
     

      {/* Contact Section */}
      <main className="flex-grow">
        <section className="py-12">
          <div className="container mx-auto px-6">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
              Contact <span className="text-blue-500">Us</span>
            </h2>

            {/* Contact Form */}
            <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
              <form>
                {/* Name Field */}
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-lg font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}

    </div>
  );
};

export default Contact;
