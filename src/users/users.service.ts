import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './interfaces/user.interface'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>) {}

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
        const user = await this.userModel.findOne({ username: username });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        return user
    }
    async create(createUserDto: CreateUserDto) : Promise<User> {
        const duplicate_username = await this.userModel.findOne({ username: createUserDto.username });
        const duplicate_email = await this.userModel.findOne({ email: createUserDto.email });
        if (duplicate_email || duplicate_username) {
            return null
        }
        const hashed = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashed
        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }
    async delete(id: string) : Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }
    async update(id: string, updateUserDto: CreateUserDto) : Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto);
    }
}