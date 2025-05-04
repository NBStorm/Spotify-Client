import { useContext, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";

const VideoPlayer = ({ video, onClose }) => {
  const { playVideo, pauseVideo,videoRef } = useContext(PlayerContext);
  const videoSrc = video;
  
  console.log("Video source:", videoSrc);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    pauseVideo();
    onClose();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Autoplay failed:", error);
      });
    }
    playVideo();

    return () => {
      // Cleanup khi component unmount
      if (videoRef.current) {
        videoRef.current.pause();
      }
      pauseVideo();
    };
  }, [playVideo, pauseVideo]);

  const handleDownload = () => {
    if (!videoSrc) {
      console.error("Video source is not available for download.");
      return;
    }

    try {
      // Tạo tên file từ URL nếu có
      const filename = videoSrc.split('/').pop() || 'video.mp4';
      
      fetch(videoSrc)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          
          // Cleanup
          setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }, 100);
        })
        .catch(error => {
          console.error("Download failed:", error);
        });
    } catch (error) {
      console.error("Error during video download:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none"
          aria-label="Close video player"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video container */}
        <div className="bg-black rounded-lg overflow-hidden aspect-video">
          {videoSrc ? (
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
              muted={false} // Cho phép âm thanh nếu cần
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="p-8 text-center text-white bg-gray-800 h-full flex items-center justify-center">
              Video source is not available.
            </div>
          )}
        </div>

        {/* Download button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            disabled={!videoSrc}
          >
            Download Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;