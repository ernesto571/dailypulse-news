import { NavLink, useNavigate } from "react-router-dom";
import { Newspaper, Menu, X, Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

function NavBar() {
  const { logout, authUser } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate()

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/news", label: "News" },
    { path: "/sports", label: "Sports" },
    { path: "/business", label: "Business" },
    { path: "/entertainment", label: "Entertainment" },
    { path: "/technology", label: "Technology" },
    { path: "/health", label: "Health" },
    { path: "/crypto", label: "Crypto" },
    { path: "/arts", label: "Arts" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query.toLowerCase()}`);
    setSidebarOpen(false);
  };

  return (
    <div className="mb-[62px]">
      {/* Navbar Top Section */}
      <div className="fixed top-0 z-50 w-full border-[1px] border-gray-200 bg-white">
        <div className="flex items-center justify-between w-[96%] mx-auto py-2">
          {/* Logo + Hamburger */}
          <span className="flex items-center">
            {/* Hamburger icon for mobile */}
            <button
              className="flex hover:bg-gray-200"
              onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? (
                <X />
              ) : (
                <span className="flex items-center">
                  <Menu />
                  <Search className="ml-[-2px]" />
                </span>
              )}
            </button>

            {/* Logo */}
            <NavLink to="/" className="flex items-center justify-center ml-4">
              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
                <Newspaper className="w-6 h-7 text-red-500" />
              </div>
              <h1 className="pl-2 text-[1.3rem] font-bold text-gray-800">
                DailyPulse
              </h1>
            </NavLink>
          </span>

          {/* Navigation Links */}
          <span className=" gap-5 font-bold text-gray-800 hidden lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative pb-1 transition-all ${
                    isActive
                      ? "text-red-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-600"
                      : "hover:text-red-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </span>

          {/* Auth Buttons */}
          {!authUser ? (
            <div className="flex gap-5">
              <button className="py-2 px-7 border-[1px] border-gray-400 font-bold text-[1.1rem] text-gray-600 rounded-[8px] hover:text-gray-800 hover:border-gray-600"  onClick={()=> {navigate('/login')}}>
                Sign In
              </button>
              <button className="py-2 px-7 font-bold text-[1.1rem] text-white bg-black rounded-[8px] hover:bg-gray-700" onClick={()=> {navigate('/register')}}>
                Register
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <NavLink
                to="/bookmarks"
                className="py-2 px-7 border-[1px] border-gray-400 font-bold text-[1.1rem] text-gray-600 rounded-[8px] hover:text-gray-800 hover:border-gray-600">
                Bookmarks
              </NavLink>
              <button
                onClick={logout}
                className="py-2 px-7 font-bold text-[1.1rem] text-white bg-black rounded-[8px] hover:bg-gray-700">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar content */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[50%] md:w-[40%] lg:w-[20%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col w-full gap-6 pt-6 font-bold text-gray-800">
          {/* Close button */}
          <button
            className="self-start ml-2"
            onClick={() => setSidebarOpen(false)}>
            <X size={30} className="hover:bg-gray-200 " />
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex w-[98%] mx-auto my-[-16px] border-y-2 border-gray-300 bg-gray-100">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news, topics and more"
              className="pl-2 text-[1.1rem] font-normal w-[85%] ml-[1%] bg-white py-2 my-2 border border-black focus:outline-none focus:ring-[1px] focus:ring-black"
            />
            <div className="my-2">
              <button className="bg-black px-3 py-3">
                <Search className="text-white" size={20} />
              </button>
            </div>
          </form>

          {/* Sidebar Links */}
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-[1.1rem] transition-all border-b-[1px] border-gray-300 px-4 pt-3 pb-4 items-center ${
                    isActive
                      ? "text-red-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-600"
                      : "hover:text-red-600"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
