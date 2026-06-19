import { Link } from "react-router-dom";
import { Check } from "lucide-react";

// Deterministic avatar color based on channel name
const avatarColors = ["red", "blue", "green", "orange", "purple", "teal"];
function getAvatarColor(channel) {
  let hash = 0;
  for (let i = 0; i < channel.length; i++) hash += channel.charCodeAt(i);
  return avatarColors[hash % avatarColors.length];
}

function VideoCard({ video }) {
  const initials = video.channel
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const color = video.avatarColor || getAvatarColor(video.channel);

  return (
    <Link to={`/video/${video.id}`} className="video-card" aria-label={`Watch: ${video.title}`}>
      {/* Thumbnail */}
      <div className="thumbnail-wrapper">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
        />
        {video.duration && (
          <span className="video-duration">{video.duration}</span>
        )}
      </div>

      {/* Card Body */}
      <div className="video-card-body">
        {/* Channel Avatar */}
        <div className={`channel-avatar ${color}`} aria-hidden="true">
          {initials}
        </div>

        {/* Meta */}
        <div className="video-meta">
          <h3 className="video-title">{video.title}</h3>
          <p className="video-channel">
            {video.channel}
            <span className="verified-badge" aria-label="Verified">
              <Check size={10} strokeWidth={4} />
            </span>
          </p>
          <p className="video-stats">
            {video.views} &bull; {video.time}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
