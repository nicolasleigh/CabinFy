import { NextFunction, Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import {
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @ts-ignore
const s3Client = new S3Client({
  endpoint: 'https://sfo3.digitaloceanspaces.com',
  forcePathStyle: false,
  region: 'sfo3',
  credentials: {
    accessKeyId: 'DO002U4XL2BFAKPWCRGL',
    secretAccessKey: process.env.SPACES_SECRET,
  },
});

// export const resizeImage = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const filePath = path.join(__dirname, `../../uploads/${uuid()}.webp`);
//   await sharp(req.file?.buffer).resize(720, 480).webp().toFile(filePath);
//   req.body.filePath = filePath;
//   next();
// };

export const resizeImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const image = req.files?.image;
  // @ts-ignore
  const images = req.files?.images;
  let coverPath;
  // @ts-ignore
  let filePaths;

  if (image) {
    coverPath = path.join(__dirname, `../../cover-${uuid()}.webp`);
    const coverName = coverPath.split('/').pop();

    // await sharp(image[0].path).resize(720, 480).webp().toFile(coverPath);

    // ********* AWS S3 *********
    const imageBuf = await sharp(image[0].path)
      .resize(720, 480)
      .webp()
      .toBuffer();

    const params = {
      Bucket: 'nicolas',
      Key: coverName,
      Body: imageBuf,
      ContentType: image[0].mimetype,
      ACL: 'public-read',
    };

    const uploadObject = async () => {
      try {
        // @ts-ignore
        await s3Client.send(new PutObjectCommand(params));
        console.log('Successfully uploaded file: ' + params.Key);
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    };

    await uploadObject();
    await fs.promises.unlink(image[0].path);
  }

  if (images?.length) {
    filePaths = Array(4)
      .fill('')
      .map(() => path.join(__dirname, `../../${uuid()}.webp`));

    const fileNameJson = [
      { fileName: filePaths[0].split('/').pop() },
      { fileName: filePaths[1].split('/').pop() },
      { fileName: filePaths[2].split('/').pop() },
      { fileName: filePaths[3].split('/').pop() },
    ];

    // await images.map((e: any, index: any) => {
    //   // @ts-ignore
    //   sharp(e.path).resize(720, 480).webp().toFile(filePaths[index]);
    // });

    // ********* AWS S3 *********
    await images.map(async (e: any, index: any) => {
      // @ts-ignore
      const imageBuf = await sharp(e.path).resize(720, 480).webp().toBuffer();

      const params = {
        Bucket: 'nicolas',
        Key: fileNameJson[index].fileName,
        Body: imageBuf,
        ContentType: e.mimetype,
        ACL: 'public-read',
      };

      const uploadObject = async () => {
        try {
          // @ts-ignore
          await s3Client.send(new PutObjectCommand(params));
          console.log('Successfully uploaded file: ' + params.Key);
        } catch (err) {
          console.error(err);
          res.status(500).send(err);
        }
      };

      await uploadObject();
    });

    images.map(async (e: any) => await fs.promises.unlink(e.path));
  }

  req.body.coverPath = coverPath;
  req.body.filePaths = filePaths;
  next();
};

export const resizeAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filePath = path.join(__dirname, `../../avatar-${uuid()}.webp`);
  const avatarName = filePath.split('/').pop();

  // await sharp(req.file?.buffer).resize(240, 240).webp().toFile(filePath);

  // ********* AWS S3 *********
  const imageBuf = await sharp(req.file?.buffer)
    .resize(240, 240)
    .webp()
    .toBuffer();

  const params = {
    Bucket: 'nicolas',
    Key: avatarName,
    Body: imageBuf,
    ContentType: req.file?.mimetype,
    ACL: 'public-read',
  };

  const uploadObject = async () => {
    try {
      // @ts-ignore
      await s3Client.send(new PutObjectCommand(params));
      console.log('Successfully uploaded file: ' + params.Key);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  await uploadObject();

  req.body.filePath = filePath;
  next();
};
