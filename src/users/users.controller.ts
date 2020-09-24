import { Controller, Get, Post, Put, Delete, Body, Param, Request, HttpException, UseGuards, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';


@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<any> {
        const users = await this.usersService.findAll()
        return users.map(user=>({
            id: user._id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
        }))
    };
    
    @Get(':username')
    async findOne(@Param('username') username :string): Promise<any> {
        const user = await this.usersService.findOne(username)
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
        }
    };
    @Post()
    async create(@Body() createUserDto :CreateUserDto): Promise<any> {
        const user = await this.usersService.create(createUserDto)
        if (!user) {
            throw new HttpException('Username or Email already existed.', HttpStatus.BAD_REQUEST);
        }
        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            },
            message: 'Sign up successfully. You now can sign in to continue.'
        }
    };

    @Post('upload') // upload one file
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@UploadedFile() file, @Request() req) {
        return this.usersService.addAvatar(req.user.id, file);
    }
    
    @Delete(':id')
    delete(@Param('id') id :string): Promise<User> {
        return this.usersService.delete(id)
    };
    
    @Put(':id')
    update(@Body() updateUserDto :CreateUserDto, @Param('id') id :string): Promise<User> {
        return this.usersService.update(id, updateUserDto)
    };
}
