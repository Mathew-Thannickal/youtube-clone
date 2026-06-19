import VideoCard from "./VideoCard";

function VideoList({ videos }) {
  if (!videos || videos.length === 0) {
    return (
      <div className="empty-state" role="status">
        <div className="empty-icon" aria-hidden="true">📹</div>
        <h2>No videos found</h2>
        <p>Try a different search term or browse all videos.</p>
      </div>
    );
  }

  return (
    <section className="video-grid" aria-label="Video list">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </section>
  );
}

export default VideoList;
