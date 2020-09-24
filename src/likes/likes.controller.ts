import { Controller, Get, Post, Param, Request, UseGuards, UseInterceptors, UploadedFile, Delete} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';

@Controller('api/v1/images')
export class LikesController {
    constructor(
        private readonly likesService: LikesService,
    ) {}

    @Get(':imageid/likes')
    @UseGuards(JwtAuthGuard)
    async findAll(@Request() req, @Param('imageid') imageid :string) {
        const likes = await this.likesService.findAll(imageid)
        const current = await this.likesService.findOne(req.user.id,imageid)
        if (!current) {
            return  {
                id: imageid,
                liked: false,
                likes: likes
            }
        }
        return  {
            id: imageid,
            liked: true,
            likes: likes
        }
    };

    @Post(':imageid/toggle_like') // upload one file
    @UseGuards(JwtAuthGuard)
    create(@Request() req, @Param('imageid') imageid :string): any {
        let createLike = new CreateLikeDto()
        createLike.userId = req.user.id
        createLike.imageId = imageid
        return this.likesService.deleteOrCreate(createLike)
    }
}
