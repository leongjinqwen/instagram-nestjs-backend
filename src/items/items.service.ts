import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateItemDto } from './dto/create-item.dto'


@Injectable()
export class ItemsService {
    // In the constructor, you added @InjectModel('Post'), 
    // which will inject the Post model into this BlogService class. 
    // You will now be able to use this injected model to retrieve all posts, 
    // fetch a single post, and carry out other database-related activities.
    constructor(@InjectModel('Item') private readonly itemModel:Model<Item>) {}

    // retrieve all items for specific user
    async findAll(userId :string): Promise<Item[]> {
        return await this.itemModel.find({userId: userId})
    }
    async findOne(id: string): Promise<Item> {
        return await this.itemModel.findOne({ _id: id })
    }
    async create(createItemDto: CreateItemDto) : Promise<Item> {
        const newItem = new this.itemModel(createItemDto);
        return await newItem.save();
    }
    async delete(id: string): Promise<Item> {
        return await this.itemModel.findByIdAndRemove(id)
    }
    async update(id: string, updateItemDto: CreateItemDto): Promise<Item> {
        return await this.itemModel.findByIdAndUpdate(id, updateItemDto, {new: true}) // if get none then create new
    }
}
