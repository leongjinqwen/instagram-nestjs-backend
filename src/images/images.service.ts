import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {}

  async fileupload(file: any) {
    const s3 = new AWS.S3();
    AWS.config.update({
      accessKeyId: this.configService.get('configuration').awsKey,
      secretAccessKey: this.configService.get('configuration').awsSecret,
    });
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('configuration').bucketName,
      Body: file.buffer,
      Key: `${uuid()}-${file.originalname}`,
      ACL: 'public-read',
      ContentType: file.mimetype // if not set, the file will auto download when clicked
    })
    .promise();
    // uploadResult = {
    //   "ETag": "\"a989f3dba390043400f50fdd7df53c9a\"",
    //   "Location": "https://nextagram-backend.s3.amazonaws.com/rabbit.gif",
    //   "key": "rabbit.gif",
    //   "Key": "rabbit.gif",
    //   "Bucket": "nextagram-backend"
    // }
    return uploadResult.Location
  }

}