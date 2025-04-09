// import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div
      className={`transition-all duration-300 ${
        isCollapsed ? "w-[5%]" : "w-[25%]"
      } p-2 flex-col gap-2 text-white hidden lg:flex h-full`}
    >
      <div className="bg-[#121212] h-full rounded">
        <div
          className={`transition-all duration-300 ${
            isCollapsed ? "flex flex-col" : "flex justify-between"
          } p-4  items-center `}
        >
          <button
            className="flex items-center gap-3"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <img className="w-8" src={assets.stack_icon} alt="stack_icon" />
            {!isCollapsed && <p className="font-semibold">Your Library</p>}
          </button>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <img className="w-5" src={assets.plus_icon} alt="plus_icon" />
              <img className="w-5" src={assets.arrow_icon} alt="arrow_icon" />
            </div>
          )}

          {isCollapsed && (
            <img className="pt-5 w-5" src={assets.plus_icon} alt="plus_icon" />
          )}
        </div>

        {!isCollapsed && (
          <>
            {/* Playlist block */}
            <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
              <h1>Create Your first playlist</h1>
              <p className="font-light">it's easy we will help you</p>
              <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
                Create Playlist
              </button>
            </div>

            {/* Podcast block */}
            <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
              <h1>Let's find some podcasts to follow</h1>
              <p className="font-light">
                We'll keep you updated on new episodes
              </p>
              <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
                Browse podcasts
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
