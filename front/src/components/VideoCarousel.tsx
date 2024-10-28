
import { Address } from "viem";

import { AddVideoCard } from "./AddVideoCard";
import { VideoCard } from "./VideoCard";

import Video from "../abi/Video.json";
import { useReadContract, useReadContracts } from "wagmi";


export default function VideoCarousel({}: {}) {

  // Fetch the number of id
  const { data: lastTokenId, isLoading: lastTokenIdLoading } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_VIDEO_ADDRESS as Address,
    abi: Video.abi,
    functionName: 'nextTokenId',
    args: [],
  })

  const { data: videos, isLoading: videosLoading } = useReadContracts({
    contracts: Array.from({ length: Number(lastTokenId) }).map(
      (_, index) => ({
        abi: Video.abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_VIDEO_ADDRESS as Address,
        functionName: "getMetadata",
        args: [index],
      })
    ),
  });

  console.log(videos);

  return (
    <div className="grid grid-cols-4 gap-4 p-4 justify-center">
      <AddVideoCard />
      {videos && videos.map((video, index) => (
        <VideoCard key={index} videoId={index} video={video.result} />
      ))}
    </div>
  );
}
