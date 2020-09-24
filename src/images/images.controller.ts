import { Controller, Get, Post, Param, Request, UseGuards, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { Image } from './interfaces/image.interface'
import { ImagesService } from './images.service';

@Controller('api/v1/images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Get(':userid')
    findAll(@Param('userid') userid :string): Promise<Image[]> {
        return this.imagesService.findAll(userid)
    };

    @Post('upload') // upload one file
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file, @Request() req): Promise<Image> {
        return this.imagesService.create(req.user.id, file);
    }

    @Delete(':id') // delete file with image id
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id :string, @Request() req): Promise<Image> {
        return this.imagesService.delete(req.user.id, id);
    }
}
