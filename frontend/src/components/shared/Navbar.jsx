import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import logo from "../../assets/logo2.png";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4 mx-8 max-w-7xl">
        {/* Logo */}
        <div className="logo w-28">
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-full h-auto" />
          </NavLink>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none text-gray-700"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <NavLink
                    to="/admin/companies"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[rgb(0,118,223)] font-semibold"
                        : "hover:text-[rgb(0,118,223)]"
                    }
                  >
                    Companies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/jobs"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[rgb(0,118,223)] font-semibold"
                        : "hover:text-[rgb(0,118,223)]"
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[rgb(0,118,223)] font-semibold"
                        : "hover:text-[rgb(0,118,223)]"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/jobs"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[rgb(0,118,223)] font-semibold"
                        : "hover:text-[rgb(0,118,223)]"
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/browse"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[rgb(0,118,223)] font-semibold"
                        : "hover:text-[rgb(0,118,223)]"
                    }
                  >
                    Browse
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <NavLink to="/login">
                <Button variant="outline">Login</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button className="bg-[rgb(0,118,223)] hover:bg-[rgb(0,90,180)]">
                  Signup
                </Button>
              </NavLink>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="Profile"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <NavLink to="/profile">View Profile</NavLink>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-gray-50 shadow-md lg:hidden">
          <ul className="flex flex-col items-center py-4 gap-3">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <NavLink
                    to="/admin/companies"
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[rgb(0,118,223)] font-semibold"
                        : "hover:text-[rgb(0,118,223)]"
                    }
                  >
                    Companies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/jobs"
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[rgb(0,118,223)] font-semibold"
                        : "hover:text-[rgb(0,118,223)]"
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/"
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[rgb(0,118,223)] font-semibold"
                        : "hover:text-[rgb(0,118,223)]"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/jobs"
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[rgb(0,118,223)] font-semibold"
                        : "hover:text-[rgb(0,118,223)]"
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/browse"
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[rgb(0,118,223)] font-semibold"
                        : "hover:text-[rgb(0,118,223)]"
                    }
                  >
                    Browse
                  </NavLink>
                </li>
              </>
            )}
            {!user ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    onClick={toggleMobileMenu}
                    className="text-[rgb(0,118,223)]"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    onClick={toggleMobileMenu}
                    className="text-[rgb(0,118,223)]"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    logoutHandler();
                    toggleMobileMenu();
                  }}
                  className="text-[rgb(0,118,223)]"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
