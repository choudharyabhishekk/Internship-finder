import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null, // Initialize as null for consistency
  });

  const [errors, setErrors] = useState({}); // State for error messages

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle text and radio input changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    // Clear the error for the current field
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle file input changes
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0] || null;
    setInput({ ...input, file });
    // Clear the error for the file field
    setErrors({ ...errors, file: "" });
  };

  // Validation function to ensure Profile Picture is uploaded
  const validate = () => {
    const newErrors = {};

    // Profile Picture Validation (Required)
    if (!input.file) {
      newErrors.file = "Profile Picture is required.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please upload a profile picture to proceed.");
      return;
    }

    const formData = new FormData(); // FormData object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("file", input.file); // Profile Picture is now required

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-20">
        <form
          onSubmit={submitHandler}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        >
          <h1 className="text-2xl font-bold mb-5 text-center">Sign Up</h1>

          {/* Full Name Field */}
          <div className="mb-6">
            <Label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </Label>
            <div className="relative mt-1">
              <Input
                id="fullname"
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Your Full Name"
                className="block w-full py-2 pl-4 border rounded-lg bg-gray-100 focus:ring-primary focus:border-primary"
              />
            </div>
            {/* Remove error display if not needed */}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <div className="relative mt-1">
              <Input
                id="email"
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="example@gmail.com"
                className="block w-full py-2 pl-4 border rounded-lg bg-gray-100 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="mb-6">
            <Label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </Label>
            <div className="relative mt-1">
              <Input
                id="phoneNumber"
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="8080808080"
                className="block w-full py-2 pl-4 border rounded-lg bg-gray-100 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="********"
                className="block w-full py-2 pl-4 border rounded-lg bg-gray-100 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Role Radio Group */}
          <div className="mb-6">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </Label>
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  id="student"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  id="recruiter"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile Picture Field */}
          <div className="mb-6">
            <Label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture <span className="text-red-500">*</span>
            </Label>
            <Input
              id="file"
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className={`block w-full py-2 border rounded-lg bg-gray-100 cursor-pointer focus:ring-primary focus:border-primary ${
                errors.file ? "border-red-500" : ""
              }`}
            />
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            {loading ? (
              <Button
                type="button"
                disabled
                className="w-full py-2 text-center bg-blue-500 text-white rounded-lg hover:bg-primary-dark flex items-center justify-center"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-primary-dark"
              >
                Signup
              </Button>
            )}
          </div>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
