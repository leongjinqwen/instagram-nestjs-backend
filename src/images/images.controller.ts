import { Controller, Get, Post, Param, Request, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { CreateImageDto } from './dto/create-image.dto'
import { Image } from './interfaces/image.interface'
import { ImagesService } from './images.service';

@Controller('api/v1/images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Get(':userid')
    async findAll(@Param('userid') userid :string): Promise<any> {
        return await this.imagesService.findAll(userid)
    };

    @Post('upload') // upload one file
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file, @Request() req) {
        return this.imagesService.uploadImage(req.user.id, file);
    }
}