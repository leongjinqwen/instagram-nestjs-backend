import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImageSchema } from './schemas/image.schema';
import { MongooseModule } from '@nestjs/mongoose'
import { LikeSchema } from 'src/likes/schemas/like.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Image", schema:ImageSchema }]),
        MongooseModule.forFeature([{ name: "Like", schema:LikeSchema }])
    ],
    providers: [ImagesService],
    exports: [ImagesService],
    controllers: [ImagesController], 
})
export class ImagesModule {}
