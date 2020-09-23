import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemSchema } from './schemas/item.schema';

// register blueprint/controller
@Module({
  imports: [MongooseModule.forFeature([{ name: "Item", schema:ItemSchema }])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemModule {}
