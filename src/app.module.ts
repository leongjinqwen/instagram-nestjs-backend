import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { LikesModule } from './likes/likes.module';
import * as path from 'path';

// register blueprint/controller
@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('configuration').mongoURI,
      }),
      inject: [ConfigService],
    }),
    AuthModule, UsersModule, ItemModule, ImagesModule, LikesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
