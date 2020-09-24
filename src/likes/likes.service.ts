import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Like } from './interfaces/like.interface'
import { User } from '../users/interfaces/user.interface'
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel('Like') 
    private readonly likeModel:Model<Like>,
    @InjectModel('User') 
    private readonly userModel:Model<User>
  ) {}

  // return array of users who liked the image
  async findAll(imageid: string){
    const likes = await this.likeModel.find({imageId: imageid})
    let list = []
    for (let like of likes){
      const user = await this.userModel.findOne({_id: like.userId})
      list.push({
        id:user._id,
        profileImage:user.profileImage,
        username:user.username,
      })
    }
    return list
  }
  async findOne(userId: string, imageId: string) {
    return await this.likeModel.findOne({ userId: userId,imageId:imageId });
  }
  // delete if existed
  async deleteOrCreate(createLikeDto: CreateLikeDto) {
    const like = await this.likeModel.findOne(createLikeDto)
    if (!like){
      const newLike = new this.likeModel(createLikeDto);
      const result = await newLike.save()
      return {
        image_id:result.imageId,
        liked: true
      };
    }
    const result = await this.likeModel.findByIdAndRemove({_id:like._id})
    return {
      image_id:result.imageId,
      liked: false
    }
  }
}
