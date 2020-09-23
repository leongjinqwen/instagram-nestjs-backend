import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto'
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('items') // declare route
export class ItemsController {
    constructor(
        private readonly itemsService: ItemsService
    ) {}
    // no need async and await in controller
    // get items with userId
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req): Promise<Item[]> {
        return this.itemsService.findAll(req.user.id)
    };
    @Get(':id')
    findOne(@Param('id') id:string): Promise<Item> {
        return this.itemsService.findOne(id)
    };
    // findOne(@Param() param): string {
    //     return `param id ${param.id}`
    // };
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createItemDto: CreateItemDto, @Request() req): Promise<Item> {
        createItemDto.userId = req.user.id
        return this.itemsService.create(createItemDto)
    };

    @Delete(':id')
    delete(@Param('id') id:string): Promise<Item> {
        return this.itemsService.delete(id)
    };

    @Put(':id')
    update(@Body() updateItemDto: CreateItemDto, @Param('id') id:string): Promise<Item> {
        return this.itemsService.update(id, updateItemDto)
    }
}
