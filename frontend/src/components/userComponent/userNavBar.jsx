import { useState, useEffect } from "react";
import { useTokenValidation } from "../../hooks/validateToken";

export default function NavBar() {
  const [currentPage, setCurrentPage] = useState("/");
  const [user, setUser] = useState({ username: "Guest", img_url: "/" });

  useTokenValidation();

  // Fetch user data from localStorage
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.username && userData.img_url) {
        setUser({
          username: userData.username,
          img_url: userData.img_url,
        });
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      // Keep default user state if parsing fails
    }
  }, []);

  // Update current page based on URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("community")) {
      setCurrentPage("community");
    } else {
      setCurrentPage("/");
    }
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === "/") {
      window.location.href = "/";
    } else {
      window.location.href = `/${page}`;
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed z-40 w-64 h-full bg-white shadow-lg">
        <div className="flex flex-col items-start px-10 pt-10 h-full w-full">
          <h1 className="text-[30px] font-bold text-[#53675E] leading-tight">
            Plant2gether
          </h1>
          <p className="mt-1 text-[10px] text-gray-400 font-medium">
            Let's give them a drink !
          </p>
          <div className="mt-20 space-y-2 text-[#53675E] font-bold text-[18px]">
            <div
              className={`cursor-pointer transition-colors ${currentPage === "/" ? "text-[#53675E]" : "text-[#88AE9D]"}`}
              onClick={() => navigateTo("/")}
            >
              My Plants
            </div>
            <div
              className={`cursor-pointer transition-colors ${currentPage === "community" ? "text-[#53675E]" : "text-[#88AE9D]"}`}
              onClick={() => navigateTo("community")}
            >
              Community
            </div>
          </div>
          <div className="mt-auto mb-4 flex items-center text-[#53675E] font-medium">
            <div className="flex items-center w-full">
              <a href="/edit-account">
                <div className="relative w-12 h-12 rounded-full border border-[#1E5D1E] overflow-hidden mr-3 bg-gray-200 cursor-pointer">
                  <img
                    src={user.img_url}
                    alt={`${user.username}'s profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
              <div>
                <div className="text-[18px]">{user.username}</div>
                <button
                  className="flex items-center w-full underline text-[#D37070] text-[10px] font-light"
                  onClick={handleLogout}
                >
                  logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Navigation */}
      <div className="block md:hidden w-full px-5 py-6 bg-white">
        <div className="flex justify-between items-start p-1">
          <div>
            <h1 className="text-[30px] font-bold text-[#53675E]">
              Plant2gether
            </h1>
            <p className="text-[10px] font-medium text-[#C6C6C6]">
              Let's give them a drink !
            </p>
            <div className="flex mt-3 text-[18px] font-bold">
              <div
                className={`mr-6 ${currentPage === "/" ? "text-[#53675E] font-bold" : "text-[#88AE9D] font-bold"}`}
                onClick={() => navigateTo("/")}
              >
                My Plants
              </div>
              <div
                className={`${currentPage === "community" ? "text-[#53675E] font-bold" : "text-[#88AE9D] font-bold"}`}
                onClick={() => navigateTo("community")}
              >
                Community
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <a href="/edit-account">
              <div className="relative w-12 h-12 rounded-full border border-[#1E5D1E] overflow-hidden mr-3 bg-gray-200 cursor-pointer">
                <img
                  src={user.img_url}
                  alt={`${user.username}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>
            </a>
            <button
              className="text-[#D37070] text-[10px] font-light underline"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
