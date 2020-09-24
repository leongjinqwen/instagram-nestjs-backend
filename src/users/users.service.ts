import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './interfaces/user.interface'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt';
import { ImagesService } from '../images/images.service'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') 
        private readonly userModel:Model<User>,
        private readonly imagesService: ImagesService
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find()
    }
    async getById(id: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ _id: id });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        return user
    }
    async findOne(username: string): Promise<User | undefined> {
        return await this.userModel.findOne({ username: username });
    }
    async create(createUserDto: CreateUserDto) : Promise<User> {
        const duplicate_username = await this.userModel.findOne({ username: createUserDto.username });
        const duplicate_email = await this.userModel.findOne({ email: createUserDto.email });
        if (duplicate_email || duplicate_username) {
            return null
        }
        const hashed = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashed
        if (!createUserDto.profileImage){
            createUserDto.profileImage = "https://nextagram-backend.s3-ap-southeast-1.amazonaws.com/2020-01-24_001222.992069default_profile.png"
        }
        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }
    async delete(id: string) : Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }
    async update(id: string, updateUserDto: CreateUserDto) : Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto);
    }
    async addAvatar(userId: string, file: any) {
        const avatarLink = await this.imagesService.fileupload(file);
        const result = await this.userModel.updateOne({_id: userId}, {profileImage: avatarLink})
        return await this.userModel.findOne({ _id: userId });
    }
}