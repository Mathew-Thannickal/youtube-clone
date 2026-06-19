import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { videos } from "../data/videos";
import {
  ArrowLeft,
  Play,
  ThumbsUp,
  Share2,
  Bookmark,
  MoreHorizontal,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

// Recommended card in the watch sidebar
function RecVideoCard({ video }) {
  const initials = video.channel
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link to={`/video/${video.id}`} className="rec-video-card" aria-label={`Watch: ${video.title}`}>
      <div className="rec-thumbnail">
        <img src={video.thumbnail} alt={video.title} loading="lazy" />
        {video.duration && (
          <span className="rec-duration">{video.duration}</span>
        )}
      </div>
      <div className="rec-info">
        <p className="rec-title">{video.title}</p>
        <p className="rec-channel">{video.channel}</p>
        <p className="rec-stats">{video.views} &bull; {video.time}</p>
      </div>
    </Link>
  );
}

function VideoDetails() {
  const { id } = useParams();
  const video = videos.find((item) => item.id === Number(id));
  const [descExpanded, setDescExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Recommended = other videos (exclude current)
  const recommended = videos.filter((v) => v.id !== Number(id));

  const initials = video
    ? video.channel.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "";

  if (!video) {
    return (
      <main className="content">
        <div className="not-found" role="alert">
          <AlertCircle size={48} className="alert-icon-error" />
          <h2>Video not found</h2>
          <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>
            This video may have been removed or doesn&apos;t exist.
          </p>
          <Link to="/" className="back-link" style={{ marginTop: 16 }}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="content">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>

      <div className="watch-layout">
        {/* ── Left Column: Player + Info ── */}
        <div className="watch-main">
          {/* Player */}
          <div className="video-player">
            <img src={video.thumbnail} alt={video.title} />
            <div className="player-overlay">
              <button className="play-btn" aria-label="Play video">
                <Play size={28} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="watch-title">{video.title}</h1>

          {/* Meta row */}
          <div className="watch-meta-row">
            <p className="watch-stats">
              {video.views} &bull; {video.time}
            </p>

            <div className="action-btns">
              <button
                id="like-btn"
                className={`action-btn${liked ? " primary" : ""}`}
                onClick={() => setLiked(!liked)}
                aria-pressed={liked}
                aria-label={liked ? "Unlike video" : "Like video"}
              >
                <ThumbsUp size={16} fill={liked ? "currentColor" : "none"} />
                <span>{liked ? parseInt(video.likes || "0") + 1 + "K" : video.likes || "0"}</span>
              </button>

              <button className="action-btn" aria-label="Share video">
                <Share2 size={16} />
                <span>Share</span>
              </button>

              <button className="action-btn" aria-label="Save video">
                <Bookmark size={16} />
                <span>Save</span>
              </button>

              <button className="action-btn icon-only" aria-label="More options">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Channel Info */}
          <div className="channel-info-card">
            <div className="channel-info-left">
              <div className="channel-avatar-lg" aria-hidden="true">
                {initials}
              </div>
              <div>
                <p className="channel-name">{video.channel}</p>
                <p className="channel-subs">{video.subscribers || "—"} subscribers</p>
              </div>
            </div>
            <button
              id="subscribe-btn"
              className={`subscribe-btn${subscribed ? " subscribed" : ""}`}
              onClick={() => setSubscribed(!subscribed)}
              aria-pressed={subscribed}
            >
              {subscribed ? <Check size={16} /> : null}
              <span>{subscribed ? "Subscribed" : "Subscribe"}</span>
            </button>
          </div>

          {/* Description */}
          <div
            className="description-box"
            onClick={() => setDescExpanded(!descExpanded)}
            role="button"
            tabIndex={0}
            aria-expanded={descExpanded}
            onKeyDown={(e) => e.key === "Enter" && setDescExpanded(!descExpanded)}
          >
            <div className="desc-stats">
              <span>{video.views}</span>
              <span>{video.time}</span>
            </div>
            <p className={`description-text${descExpanded ? "" : " truncated"}`}>
              {video.description}
            </p>
            <p className="description-toggle-text">
              {descExpanded ? (
                <>Show less <ChevronUp size={14} /></>
              ) : (
                <>Show more <ChevronDown size={14} /></>
              )}
            </p>
          </div>
        </div>

        {/* ── Right Column: Recommended ── */}
        <aside className="watch-sidebar" aria-label="Recommended videos">
          <p className="watch-sidebar-title">Up Next</p>
          {recommended.map((rec) => (
            <RecVideoCard key={rec.id} video={rec} />
          ))}
        </aside>
      </div>
    </main>
  );
}

export default VideoDetails;
