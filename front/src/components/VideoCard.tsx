import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
  } from "@material-tailwind/react";
import { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";
   
import Manager from "../abi/Manager.json";

export function VideoCard({videoId, video}) {

  const account = useAccount();

  const { data: hasAccess, isLoading: hasAccessLoading, error } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_MANAGER_ADDRESS as Address,
    abi: Manager.abi,
    functionName: 'access',
    args: [
      Number(videoId),
      account.address
    ],
  })

  console.log(hasAccess);
  console.log(error);

    return (
      <Card className="w-full max-w-[26rem] shadow-lg ml-2 mr-2 mb-4">
        <CardHeader floated={false} color="blue-gray">
          <img
            src="/images/loading.webp"
            alt="ui/ux review check"
            width={400}
            height={300}
            className="w-full h-64 object-cover"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {video.name}
            </Typography>
          </div>
          <Typography color="gray">
            {video.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-3" style={{marginTop: "auto"}}>
          {account.address && hasAccessLoading && (
            <Button disabled={true} loading={true} size="lg" fullWidth={true}>
              Loading...
            </Button>
          )}
          {!hasAccessLoading && hasAccess === true && (
            <Button size="lg" fullWidth={true} variant="outlined">
              See Video
            </Button>
          )}
          {(account.address === undefined || (!hasAccessLoading && !hasAccess)) && (
            <Button size="lg" fullWidth={true}>
              Buy
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }