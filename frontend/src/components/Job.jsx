import React from "react";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="shadow-2xl rounded-lg p-4 m-3  bg-white">
      {/* Header Section */}
      <div
        className="header flex items-center"
        onClick={() => navigate(`/description/${job?._id}`)}
      >
        <div className="company-icon">
          <Avatar className="w-12 h-12">
            <AvatarImage src={job?.company?.logo || "/default-icon.png"} />
          </Avatar>
        </div>
        <div className="flex flex-col mx-3">
          <h1 className="font-bold text-md">{job?.company?.name}</h1>
          <p className="text-gray-500 text-sm">{job?.location}</p>
        </div>
      </div>

      {/* Job Content */}
      <div
        className="job-content mt-3 cursor-pointer"
        onClick={() => navigate(`/description/${job?._id}`)}
      >
        <h1 className="font-bold text-lg">{job?.title}</h1>
        <p className="text-sm my-2 text-gray-600">
          {job?.description?.split(" ").length > 20
            ? `${job?.description.split(" ").slice(0, 18).join(" ")}...`
            : job?.description}
        </p>
        <div className="tags flex gap-2 mt-3">
          <span className="px-2 py-1 text-sm rounded bg-gray-100">
            {job?.jobType}
          </span>
          <span className="px-2 py-1 text-sm rounded bg-gray-100">
            ${job?.salary} Per Hour
          </span>
          <span className="px-2 py-1 text-sm rounded bg-gray-100">
            {job?.position} Positions
          </span>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="btns mt-5 flex gap-2 items-center">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-primary hover:text-white"
        >
          Apply Now
        </button>
        <button
          type="button"
          className="border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-primary hover:text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Job;
