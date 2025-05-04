import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { FiList } from "react-icons/fi";
import { followArtist } from "../api/user-follow-artist"; // Import follow API
import { unfollowArtist } from "../api/user-unfollow-artist"; // Import unfollow API
import { isUserFollowing } from "../api/is-user-follow"; // Import API to check follow status

const PlayBarArtist = ({ playArtist, artistId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const followStatus = await isUserFollowing(artistId); // Check follow status
        setIsFollowing(followStatus);
      } catch (error) {
        console.error("Failed to check follow status:", error);
      }
    };

    checkFollowStatus();
  }, [artistId]); // Run when artistId changes

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowArtist(artistId); // Call unfollow API
      } else {
        await followArtist(artistId); // Call follow API
      }
      setIsFollowing(!isFollowing); // Toggle the follow state
    } catch (error) {
      console.error("Failed to follow/unfollow artist:", error);
    }
  };

  return (
    <div className="flex items-center justify-between pt-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={playArtist}
          className="flex items-center justify-center w-15 h-15 rounded-full bg-green-500 text-white"
        >
          <FaPlay className="text-lg" />
        </button>
        {/* Follow/Unfollow Button */}
        <button
          onClick={toggleFollow}
          className="px-4 py-1 border border-gray-300 text-white font-semibold rounded-full bg-transparent hover:border-2 transition-all duration-200"
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>

        {/* More Options (3 dots) */}
        <button className="flex items-center justify-center text-gray-300 hover:text-white transition">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="4" cy="10" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
          </svg>
        </button>
      </div>

      <button className="text-white">
        <FiList className="text-lg" />
      </button>
    </div>
  );
};

export default PlayBarArtist;
