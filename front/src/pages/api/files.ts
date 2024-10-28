
import fs from 'fs/promises';
import multiparty from 'multiparty';
import { NextResponse, NextRequest } from "next/server";
import { pinata } from "../../utils/config";
import { NextApiRequest, NextApiResponse } from "next";
import { FileObject } from 'pinata';


export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    try {
      const form = new multiparty.Form();
      

      const { fields, files } = await parseForm(req);

      // form.parse(req, async (err: any, fields: any, files: any[]) => {
        // if (err) {
        //   console.error("Error parsing form data:", err);
        //   return res.status(500).json({ error: 'File parsing failed' });
        // }

        // Get the first file
        let file = files.file[0];
        console.log(file)

        // Read the file content as a Buffer
        const fileContent = await fs.readFile(file.path);
        console.log(fileContent)
 
        // Create a Blob from the Buffer
        const fileBlob = new Blob([fileContent], { type: file.headers['content-type'] });

        const fileObject = new File([fileBlob], file.originalFilename, {
          type: file.headers['content-type'],
          lastModified: Date.now(),
        });

      // // Create a file-like object for Pinata
      // const fileObject = {
      //   originalFilename: file.originalFilename,
      //   buffer: fileBlob, // Use Blob instead of Buffer
      //   mimetype: file.headers['content-type'],
      //   size: file.size,
      // };

        const uploadData = await pinata.upload.file(fileObject)
        console.log(uploadData)


        // let url = await pinata.gateways.createSignedURL({
        //   cid: uploadData.cid,
        //   expires: 3600,
        // });
     
        res.status(200).json({cid: uploadData.cid}) 
    } catch (e) {
      console.log(e);
      res.status(500).json({error: "Internal Server Error"})
    }
  }
}
