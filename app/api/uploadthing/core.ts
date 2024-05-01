// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { currentUser } from "@clerk/nextjs/server";
// const f = createUploadthing();
 
// const getUser = async() => await currentUser()
 

// export const ourFileRouter = {
//   media: f({ image: { maxFileSize: "4MB", maxFileCount:1 } })

//     .middleware(async ({ req }) => {
//       // This code runs on your server before upload
//       const user = await getUser()
 
//       // If you throw, the user will not be able to upload
//       if (!user) throw new Error("Unauthorized");
 
//       // Whatever is returned here is accessible in onUploadComplete as `metadata`
//       return { userId: user.id };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       // This code RUNS ON YOUR SERVER after upload
//       console.log("Upload complete for userId:", metadata.userId);
 
//       console.log("file url", file.url);
//     }),
// } satisfies FileRouter;
 
// export type OurFileRouter = typeof ourFileRouter;

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from "@clerk/nextjs/server"; 
import { json, urlencoded } from "express";

const f = createUploadthing();
 
const getUser = async () => await currentUser();

// Configure the bodyParser middleware with the size limit
const bodyParserConfig = {
  limit: '4MB', // Set your desired limit here
};

export const ourFileRouter = {
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getUser();
 
      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
    }),
};

export type OurFileRouter = typeof ourFileRouter;
