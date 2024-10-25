import { AddVideoCard } from "./AddVideoCard";
import { VideoCard } from "./VideoCard";

export default function VideoCarousel({
  videos,
}: {
  videos: any[];
}) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 justify-center">
      <AddVideoCard />
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </div>
  );
}
