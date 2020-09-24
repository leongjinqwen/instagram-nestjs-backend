import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';

@Module({
    imports: [],
    providers: [ImagesService],
    exports: [ImagesService], 
})
export class ImagesModule {}
