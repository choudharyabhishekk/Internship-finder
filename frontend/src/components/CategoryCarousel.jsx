import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import bgImg from "../assets/bg.png";
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-[500px] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://www.goto.com//-/media/images/shared/heroes/go-hero_1.png')", // Replace with your image URL
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h2 className="text-5xl font-bold mb-6">Featured Jobs</h2>
        <p className="mb-12 text-lg text-gray-300">
          Explore top categories and find your dream job
        </p>
        <Carousel className="w-full max-w-4xl">
          <CarouselContent className="flex gap-6">
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center transition transform hover:scale-105"
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="rounded-full px-6 py-6 text-lg  font-semibold text-gray-800 bg-white shadow-md hover:bg-gray-100 hover:text-blue-500"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-100 transition" />
          <CarouselNext className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-100 transition" />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
