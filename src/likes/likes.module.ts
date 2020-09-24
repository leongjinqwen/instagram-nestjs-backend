import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikeSchema } from './schemas/like.schema';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "User", schema:UserSchema }]), 
        MongooseModule.forFeature([{ name: "Like", schema:LikeSchema }]), 
        UsersModule
    ],
    providers: [LikesService],
    controllers: [LikesController], 
})
export class LikesModule {}
