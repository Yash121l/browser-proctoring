import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class RecordingsService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({ region: process.env.AWS_REGION });
  }

  async getUploadUrl(key: string, contentType: string) {
    const bucket = process.env.AWS_S3_BUCKET as string;
    const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
    const url = await getSignedUrl(this.s3, cmd, { expiresIn: 60 * 5 });
    return { url, bucket, key };
  }
}

