const VideoPlayer = ({ video }) => {
  const videoSrc = video;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-4 bg-white rounded-2xl shadow-lg">
        {videoSrc ? (
          <video className="w-full rounded-xl" controls muted>
            <source src={videoSrc} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        ) : (
          <p className="text-center text-red-500">
            Video source is not available.
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
