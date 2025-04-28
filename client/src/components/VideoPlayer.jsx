const VideoPlayer = ({ video,onClose }) => {
  const videoSrc = video;
  // const videoUrl = "/videos/demo.mp4";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoSrc;
    link.download = "demo.mp4"; // Tên file khi tải về
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Nút đóng modal */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none"
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

        <div className="bg-black rounded-lg overflow-hidden">
          {videoSrc ? (
            <video className="w-full" controls autoPlay muted>
              <source src={videoSrc} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          ) : (
            <div className="p-8 text-center text-white bg-gray-800">
              Video source is not available.
            </div>
          )}
        </div>

        {/* Nút download */}
        <div className="mt-4 text-center">
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Download Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
