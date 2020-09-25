import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose'
import { CreateImageDto } from './dto/create-image.dto'
import { Image } from './interfaces/image.interface'
import { Model } from 'mongoose'
import { Like } from '../likes/interfaces/like.interface';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Image') 
    private readonly imageModel:Model<Image>,
    @InjectModel('Like') 
    private readonly likeModel:Model<Like>,
    private readonly configService: ConfigService
  ) {}
  // helper function to upload file
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
  async create(userId: string, file: any) {
    const imageLink = await this.fileupload(file);
    let createImageDto = new CreateImageDto()
    createImageDto.userId = userId
    createImageDto.imageUrl = imageLink
    const newImage = new this.imageModel(createImageDto);
    return await newImage.save();
  }
  // return all image with user id
  async findAll(userId: string): Promise<Image[]> {
    return await this.imageModel.find({userId: userId})
  }
  // delete file with image id (delete all like also)
  async delete(userId: string, id: string) : Promise<Image> {
    const image = await this.imageModel.findOne({ _id: id });
    const likes = await this.likeModel.deleteMany({ imageId: id });
    if (!image){
      throw new HttpException('Image not found', HttpStatus.BAD_REQUEST);
    }
    if (image.userId !== userId) {
      throw new HttpException('You not authorized to delete this file.', HttpStatus.UNAUTHORIZED);
    }
    return await this.imageModel.findByIdAndRemove(id);
  }
}