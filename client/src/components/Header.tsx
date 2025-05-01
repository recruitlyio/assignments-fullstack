import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface HeaderProps {
  isProfileVisible: boolean;
  toggleProfile: () => void;
}

const Header = ({ isProfileVisible, toggleProfile }: HeaderProps) => {
  return (
    <header className="w-full bg-gradient-to-r from-[#f0f2f0] to-[#000c40] shadow-lg">
      <div className="rounded-xl mx-2 sm:mx-4 my-2">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-md border-2 border-white overflow-hidden bg-white">
              <img
                src="/pic.png"
                alt="CandiBot"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't load
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzZjUxYjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1yb2JvdCI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiB4PSI0IiB5PSI5IiByeD0iMiIvPjxwYXRoIGQ9Ik05IDljMCAxLS41NiAzLTMgMyIvPjxwYXRoIGQ9Ik0xNSA5YzAgMS41Ni45IDMgMyAzIi8+PHBhdGggZD0iTTEyIDEyaDAuMDEiLz48cGF0aCBkPSJNMTIgN3YyIi8+PHBhdGggZD0iTTkgM2gxMSIvPjxwYXRoIGQ9Ik0xMiAzdjIiLz48cGF0aCBkPSJNMyA3aDMiLz48cGF0aCBkPSJNMTggN2gzIi8+PC9zdmc+";
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#e0e0e0] to-[#a9a9a9] tracking-wide drop-shadow candibot-title">
                CandiBot
              </h1>
              <p className="text-xs sm:text-sm font-medium tracking-wider recruiting-assistant-text">
                Recruiting Assistant
              </p>
            </div>
          </div>

          <button
            onClick={toggleProfile}
            className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all text-white shadow-md hover:shadow-lg transform hover:scale-105 border border-white border-opacity-30"
          >
            <span className="hidden sm:inline font-medium">
              {isProfileVisible ? "Hide Profile" : "View Profile"}
            </span>
            {isProfileVisible ? (
              <FaEyeSlash className="text-lg" />
            ) : (
              <FaEye className="text-lg" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
