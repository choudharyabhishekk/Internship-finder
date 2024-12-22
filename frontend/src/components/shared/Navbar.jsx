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
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 w-28">
            <NavLink to="/">
              <img src={logo} alt="logo" className="w-full h-auto" />
            </NavLink>
          </div>

          <div className="flex items-center justify-end flex-1">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 mr-4">
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
                        Internships
                      </NavLink>
                    </li>
                    {user && (
                      <li>
                        <NavLink
                          to="/profile"
                          className={({ isActive }) =>
                            isActive
                              ? "text-[rgb(0,118,223)] font-semibold"
                              : "hover:text-[rgb(0,118,223)]"
                          }
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )}
                  </>
                )}
              </ul>
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

            {/* Auth Buttons and Profile */}
            <div className="hidden lg:flex items-center gap-2">
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
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="flex-shrink-0">
                          <AvatarImage
                            src={user?.profile?.profilePhoto}
                            alt="Profile"
                          />
                        </Avatar>
                        <div className="flex flex-col">
                          <h4 className="font-medium">{user?.fullname}</h4>
                          <p className="text-sm text-muted-foreground">
                            {user?.profile?.bio}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 text-gray-600">
                        {user && user.role === "student" && (
                          <div className="flex items-center gap-2 cursor-pointer">
                            <User2 size={20} />
                            <NavLink
                              to="/profile"
                              className="text-gray-600 hover:text-gray-900"
                            >
                              View Profile
                            </NavLink>
                          </div>
                        )}
                        <div className="flex items-center gap-2 cursor-pointer">
                          <LogOut size={20} />
                          <button
                            onClick={logoutHandler}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
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
                      Internship
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile"
                      onClick={toggleMobileMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[rgb(0,118,223)] font-semibold"
                          : "hover:text-[rgb(0,118,223)]"
                      }
                    >
                      Dashboard
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
    </nav>
  );
};

export default Navbar;
