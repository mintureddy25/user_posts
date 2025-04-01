import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  private s3Client: S3Client;

  constructor() {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const bucketName = process.env.AWS_BUCKET_NAME;

    if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
      throw new Error('AWS credentials or region are not set in environment variables.');
    }

    this.s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  async generateUploadUrl(fileName: string, fileType: string): Promise<{ presignedUrl: string; key: string }> {
    const allowedImageTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    if (!allowedImageTypes.includes(fileType)) {
      throw new Error('Invalid image format. Allowed formats: jpeg, jpg, png, gif, webp.');
    }

    const uniqueKey = `toleram/${uuidv4()}-${fileName}`;

    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: uniqueKey,
      ContentType: fileType,
      ACL: ObjectCannedACL.public_read,
    };

    try {
      const command = new PutObjectCommand(s3Params);
      const url = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });

      return { presignedUrl: url, key: uniqueKey };
    } catch (error) {
      throw new Error('Error generating presigned URL');
    }
  }
}
