import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImageSchema } from './schemas/image.schema';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [MongooseModule.forFeature([{ name: "Image", schema:ImageSchema }])],
    providers: [ImagesService],
    exports: [ImagesService],
    controllers: [ImagesController], 
})
export class ImagesModule {}
