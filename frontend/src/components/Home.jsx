import React from "react";
import banner from "../assets/banner.png";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import LatestJobCards from "./LatestJobCards";
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "./CategoryCarousel";
import abtImg from "../assets/about.png";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="font-sans">
        {/* Hero Section */}
        <section
          className="relative bg-center text-white py-44 text-center"
          style={{
            backgroundImage: `url(${banner})`, // Apply the imported banner image
          }}
        >
          {/* Overlay to darken the background */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6 text-white leading-tight">
              Find Your Dream Internship
            </h1>
            <p className="text-lg text-white mb-8">
              Start your career journey with our exclusive internship
              opportunities.
            </p>
            <button
              className="px-8 py-4 border solid text-white-500 font-bold rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
              onClick={() => {
                navigate("/jobs");
              }}
            >
              Browse Internships
            </button>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="mt-6 flex flex-col md:flex-row items-center gap-8">
              <img
                src={abtImg}
                alt="About Us"
                className="w-72 h-auto rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="text-left">
                <h2 className="text-4xl font-bold text-blue-600 inline-block border-blue-600 mb-7">
                  About Us
                </h2>
                <p className="text-lg text-gray-800 leading-relaxed">
                  We provide a platform that bridges the gap between students
                  and top companies, offering exceptional internship
                  opportunities. Whether you're looking to gain valuable
                  experience or take the first step toward your dream career,
                  we've got you covered.
                </p>
                <p className="mt-4 text-lg text-gray-800 leading-relaxed">
                  Our mission is to empower students by connecting them with
                  meaningful opportunities, fostering growth, and shaping a
                  better future for all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Internships Section */}
        {/* <section className="py-20 bg-gray-50 text-center"></section> */}
        <CategoryCarousel />

        {/* Contact Us Section */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-blue-500">
              Contact Us
            </h2>
            <form className="flex flex-col gap-4 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-3 border border-gray-300 rounded-lg text-lg"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-3 border border-gray-300 rounded-lg text-lg"
                required
              />
              <textarea
                placeholder="Your Message"
                className="px-4 py-3 border border-gray-300 rounded-lg text-lg"
                required
              ></textarea>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
