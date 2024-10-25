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
 
export function AddVideoDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file ? file.name : null); // Store file name in state
  };

  const handleOpen = () => setOpen(!open);
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
 
    console.log("On click he")
    console.log(formData)
  }
 
  

  return (
    <>
        <Button onClick={handleOpen} size="lg" fullWidth={true}>
          Add your video
        </Button>
        <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
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
              onClick={handleOpen}
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
            <Button className="ml-auto" type="submit">
              Add video
            </Button>
          </DialogFooter>
          </form>
        </Dialog>
      
    </>
  );
}