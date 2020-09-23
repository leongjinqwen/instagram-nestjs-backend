import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema:UserSchema }])],
  providers: [UsersService],
  // exports: the subset of providers that are provided by this module and should be available in other modules which import this module
  exports: [UsersService], // why need export? because UsersService import in auth.service
  controllers: [UsersController],
})
export class UsersModule {}
