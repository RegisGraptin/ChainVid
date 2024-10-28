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
   
  export function VideoCard({video}) {

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
          <Button size="lg" fullWidth={true}>
            Buy
          </Button>
        </CardFooter>
      </Card>
    );
  }