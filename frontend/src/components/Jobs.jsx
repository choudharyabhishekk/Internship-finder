import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs(); // Hook to fetch all jobs
  const { allJobs } = useSelector((store) => store.job); // Redux state for jobs
  const dispatch = useDispatch();

  // Local state for filters
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [employmentType, setEmploymentType] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");

  // Clean up searched query on unmount
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  // Apply filters and sorting
  useEffect(() => {
    let jobs = [...allJobs];

    // Search filter
    if (searchQuery) {
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Employment type filter
    if (employmentType !== "All") {
      jobs = jobs.filter((job) => job.jobType === employmentType);
    }

    // Sort jobs by date
    jobs = jobs.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredJobs(jobs);
  }, [allJobs, searchQuery, employmentType, sortOrder]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl m-8 my-10">
        {/* Filters Section */}
        <div className="mb-6 flex gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Jobs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-2/3 p-3 border border-gray-300 rounded-md"
          />

          {/* Employment Type Filter */}
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="w-1/6 p-3 border border-gray-300 rounded-md"
          >
            <option value="All">Filter Job</option>
            <option value="Full-time">Full-Time</option>
            <option value="Part-time">Part-Time</option>
          </select>

          {/* Sort Order Filter */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-1/6 p-3 border border-gray-300 rounded-md"
          >
            <option value="latest">Sort by Latest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>

        {/* Job Listing */}
        <h1 className="font-bold text-xl my-5">
          Search Results ({filteredJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
