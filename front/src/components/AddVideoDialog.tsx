import React, { FormEvent, useState } from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useWriteContract } from "wagmi";
 
import Manager from "../abi/Manager.json";
import { Address } from "viem";
import { useAccount } from 'wagmi'

type OwnerEntry = {
  address: string;
  percent: number;
}

export function AddVideoDialog() {
  const [openVideo, setOpenVideo] = React.useState(false);
  const [openOwner, setOpenOwner] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const account = useAccount()

  const [cid, setCid] = useState(null);

  const [ownerAddresses, setOwnerAddresses] = useState<OwnerEntry[]>([{address: account.address?.toString() || "", percent: 100}]);

  const addOwnerEntry = () => {
    const values = [...ownerAddresses];
    values.push({address: "", percent: 0});
    setOwnerAddresses(values);
  }

  function handleRemoveOwner(i: number) {
      if (ownerAddresses.length == 1) { return; }
      const values = [...ownerAddresses];
      values.splice(i, 1);
      setOwnerAddresses(values);
  }

  function handleChange(i: number, field: keyof OwnerEntry, event: any) {
      const values = [...ownerAddresses];
      values[i] = {...values[i], [field]: field === "percent" ? Number(event.target.value) : event.target.value}
      setOwnerAddresses(values);
  }

  const { data, error, writeContract, isPending, isError } = useWriteContract()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file ? file.name : null); // Store file name in state
  };

  const handleOpenVideo = () => setOpenVideo(!openVideo);
  const handleOpenOwner = () => setOpenOwner(!openOwner);
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
 
    setUploading(true);
    
    console.log(formData)
    console.log(formData.get("fileVideo"))

    const data = new FormData();
    data.set("file", formData.get("fileVideo"));

    const uploadRequest = await fetch("/api/files", {
      method: "POST",
      body: data,
    });
    console.log(uploadRequest);
    const _cid = await uploadRequest.json();
    console.log(_cid);
    setCid(_cid["cid"])

    handleOpenVideo();
    setUploading(false);
    handleOpenOwner();
  }



  async function onSubmitOwner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    // Get all owners
    const owners = ownerAddresses.map((entry) => entry.address);

    // Get all allocation 
    const allocation = ownerAddresses.map((entry) => entry.percent);

    // Add a new video
    writeContract({
      abi: Manager.abi,
      address: process.env.NEXT_PUBLIC_CONTRACT_MANAGER_ADDRESS as Address,
      functionName: 'addNewVideo',
      args: [
          owners,
          allocation,
          cid,
      ],
    })
  }
  

  return (
    <>
        <Button onClick={handleOpenVideo} size="lg" fullWidth={true}>
          Add your video
        </Button>

        {/* Dialog for storing the video */}
        <Dialog size="sm" open={openVideo} handler={handleOpenVideo} className="p-4">
          <form onSubmit={onSubmit}>
          <DialogHeader className="relative m-0 block">
            <Typography variant="h4" color="blue-gray">
              Add a new video
            </Typography>
            <Typography className="mt-1 font-normal text-gray-600">
              Create, Publish and Sell your videos.
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
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Title
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. Singapore Travel Vlog"
                name="name"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Category (Optional)
              </Typography>
              <Select
                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                placeholder="1"
                labelProps={{
                  className: "hidden",
                }}
                name="category"
              >
                <Option>Vlog</Option>
                <Option>Food</Option>
                <Option>Travel</Option>
              </Select>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Description (Optional)
              </Typography>
              <Textarea
                rows={3}
                name="description"
                placeholder="eg. This is a white shoes with a comfortable sole."
                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <label htmlFor="uploadFile"
              className="bg-white text-gray-500 font-semibold text-base rounded h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000" />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000" />
              </svg>
              {selectedFile ? (
                <p className="text-sm font-medium text-gray-600 mt-2">{selectedFile}</p>
              ) : (
                <p>Upload file</p>
              )}
              
              <input type="file" id='uploadFile' className="hidden" name="fileVideo" onChange={handleFileChange} />
              <p className="text-xs font-medium text-gray-400 mt-2">Mov, AVI and MP4 are Allowed.</p>
            </label>
          </DialogBody>
          <DialogFooter>
            <Button className="ml-auto" type="submit" disabled={uploading} loading={uploading} >
              {uploading ? "Uploading..." : "Add video"}
            </Button>
          </DialogFooter>
          </form>
        </Dialog>

         {/* Dialog for setting the owner */}
         <Dialog size="sm" open={openOwner} handler={handleOpenOwner} className="p-4">
          <form onSubmit={onSubmitOwner}>
          <DialogHeader className="relative m-0 block">
            <Typography variant="h4" color="blue-gray">
              Defined the owner
            </Typography>
            <Typography className="mt-1 font-normal text-gray-600">
              Defined the royalties
            </Typography>
            <IconButton
              size="sm"
              variant="text"
              className="!absolute right-3.5 top-3.5"
              onClick={handleOpenOwner}
            >
              <XMarkIcon className="h-4 w-4 stroke-2" />
            </IconButton>
          </DialogHeader>
          <DialogBody className="space-y-4 pb-6">
              
          <div className="flex items-center gap-4">
          <div className="w-1/2">
                <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 text-left font-medium"
                    >
                      Owner Address
                    </Typography>
              </div>
              <div className="w-1/2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 text-left font-medium"
                    >
                      Share Percent
                    </Typography>
                    </div>
          </div>
            {ownerAddresses.map((ownerAddress, key) => {
              return (
                <div key={key} className="flex items-center gap-4">
                  <div className="w-1/2">
                    <Input
                      color="gray"
                      size="lg"
                      placeholder="0x00...00"
                      name="owner"
                      className="placeholder:opacity-100 focus:!border-t-gray-900 min-w-[72px]"
                      required
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e) => handleChange(key, "address", e)}
                      value={ownerAddress.address}
                    />
                  </div>
                  <div className="w-1/4">
                    <Input
                      color="gray"
                      size="lg"
                      placeholder="100%"
                      name="percent"
                      type="number"
                      required
                      className="placeholder:opacity-100 focus:!border-t-gray-900 min-w-[72px]"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(e) => handleChange(key, "percent", e)}
                      value={ownerAddress.percent}
                    />
                  </div>
                  <div className="w-1/4">
                  <Button className="mr-3" disabled={uploading || isPending} loading={uploading} onClick={handleRemoveOwner}>
                    X
                  </Button>
                  </div>
                </div>
              );
            })}  
          </DialogBody>

          <DialogFooter>

            <div>
              {isError && error && error.message}
            </div>

            <Button className="mr-3" disabled={uploading | isPending} onClick={addOwnerEntry}>
              Add new owner
            </Button>

            <Button className="" variant="outlined" type="submit" disabled={uploading || isPending} loading={uploading || isPending} >
              {uploading ? "Confirming..." : "Validate"}
            </Button>
          </DialogFooter>
          </form>
        </Dialog>
      
      
    </>
  );
}