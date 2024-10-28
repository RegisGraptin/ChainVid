import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
  } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Address } from "viem";
import { useAccount, useReadContract, useSignMessage } from "wagmi";
   
import Manager from "../abi/Manager.json";
import React from "react";



export function VideoCard({videoId, video}) {

  const account = useAccount();

  const [videoUrl, setVideoUrl] = React.useState("");
  const [openVideo, setOpenVideo] = React.useState(false);
  const handleOpenVideo = () => setOpenVideo(!openVideo);



  const { data: hasAccess, isLoading: hasAccessLoading, error } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_MANAGER_ADDRESS as Address,
    abi: Manager.abi,
    functionName: 'access',
    args: [
      Number(videoId),
      account.address
    ],
  });

  const { signMessage, data: signedMessage } = useSignMessage()

  const auth = async () => {
    signMessage({ message: 'Prove you are the owner of ' + account.address?.toString() }, {
      async onSuccess(signature) {
        console.log("data");
        console.log(signature);

        const data = {
          "address": account.address?.toString(),
          "tokenId": videoId,
          "signature": signature
        };

        // Send backend request
        const uploadRequest = await fetch("/api/load", {
          method: "POST",
          body: JSON.stringify(data),
        });

        const apiData = await uploadRequest.json();

        console.log("apiData result");
        console.log(apiData);
        console.log(apiData["url"]);

        setVideoUrl(apiData["url"])
        handleOpenVideo();
      }
    })
  }


    return (
      <>
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
            <Button size="lg" fullWidth={true} variant="outlined" onClick={auth}>
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

      {/* Dialog for storing the video */}
      <Dialog size="sm" open={openVideo} handler={handleOpenVideo} className="p-4">
      
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          {video.name}
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
        {video.description}
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={handleOpenVideo}
        >
          <XMarkIcon className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="space-y-4 pb-6">
      <video className="h-full w-full rounded-lg" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </DialogBody>
      
    </Dialog>
    </>
    );
  }