import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { FaUserCircle } from "react-icons/fa";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header + Profile Details Combined Section */}
        <div className="bg-white shadow sm:rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            {/* Header Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="cursor-pointer size-20">
                <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
              </Avatar>
              {/* <FaUserCircle className="h-16 w-16 text-gray-500" /> */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.fullname || "User Name"}
                </h2>
                <p className="text-sm text-gray-500">
                  {user?.email || "Email"}
                </p>
              </div>
            </div>
            {/* Edit Button */}
            <Button
              onClick={() => setOpen(true)}
              className="text-right"
              variant="outline"
            >
              <Pen />
            </Button>
          </div>

          {/* Profile Details Section */}
          <div className="mt-6">
            <div className="my-5">
              <div className="flex items-center gap-3 my-2">
                <Mail />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 my-2">
                <Contact />
                <span>{user?.phoneNumber || "NA"}</span>
              </div>
            </div>
            <div className="my-5">
              <h1>Skills</h1>
              <div className="flex items-center gap-1">
                {user?.profile?.skills?.length ? (
                  user.profile.skills.map((item, index) => (
                    <Badge key={index}>{item}</Badge>
                  ))
                ) : (
                  <span>NA</span>
                )}
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-md font-bold">Resume</Label>
              {isResume ? (
                <a
                  target="blank"
                  href={user?.profile?.resume}
                  className="text-blue-500 w-full hover:underline cursor-pointer"
                >
                  {user?.profile?.resumeOriginalName || "Download Resume"}
                </a>
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="max-w-7xl mx-auto bg-white rounded-2xl mt-6">
          <h1 className="font-bold text-lg my-5 px-6">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
