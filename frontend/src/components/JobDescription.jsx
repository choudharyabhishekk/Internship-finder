import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // Helps real-time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  if (!singleJob) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl m-auto my-5 p-6 border rounded-md shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{singleJob?.title}</h1>
        <div className="flex gap-4 mb-4">
          <div className="company-icon">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={singleJob?.company?.logo || "/default-icon.png"}
              />
            </Avatar>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">{singleJob?.companyName}</h2>
            <p className="text-slate-500">{singleJob?.location}</p>
            <p className="text-gray-500">
              Posted on: {formatDate(singleJob?.createdAt)}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Job Description:</h2>
          <p className="mt-2">{singleJob?.description}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Job Requirements:</h2>
          <ul className="mt-2 list-disc list-inside">
            {singleJob?.requirements?.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>

        <div className="details mt-4 flex flex-wrap gap-3">
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Employment Type:</strong> {singleJob?.jobType}
          </div>
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Experience:</strong>{" "}
            {singleJob?.experienceLevel || "intermediate"} Year
          </div>
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Pay:</strong> ${singleJob?.salary} Per Hour
          </div>
          <div className="p-2 text-sm rounded bg-gray-100">
            <strong>Applicants:</strong> {singleJob?.applications?.length}
          </div>
        </div>

        <div className="btns mt-6 flex gap-3">
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
          <Button className="px-4 py-2 border text-black border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition">
            Save for Later
          </Button>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
