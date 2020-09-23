import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<any> {
        const users = await this.usersService.findAll()
        return users.map(user=>({
            id: user._id,
            username: user.username,
            email: user.email,
        }))
    };
    
    @Get(':username')
    async findOne(@Param('username') username :string): Promise<any> {
        const user = await this.usersService.findOne(username)
        return {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    };
    @Post()
    async create(@Body() createUserDto :CreateUserDto): Promise<any> {
        const user = await this.usersService.create(createUserDto)
        if (!user) {
            throw new HttpException('Username or Email already existed.', HttpStatus.BAD_REQUEST);
        }
        return {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    };

    @Delete(':id')
    delete(@Param('id') id :string): Promise<User> {
        return this.usersService.delete(id)
    };
    
    @Put(':id')
    update(@Body() updateUserDto :CreateUserDto, @Param('id') id :string): Promise<User> {
        return this.usersService.update(id, updateUserDto)
    };
}
