import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  username: {
    type: String,
    unique: true // Unique index. If you specify `unique: true`
    // specifying `index: true` is optional if you do `unique: true`
  }

  @Prop()
  email: {
    type: String,
    unique: true // Unique index. If you specify `unique: true`
    // specifying `index: true` is optional if you do `unique: true`
  }
  
  @Prop({ required: true })
  password: String;

  @Prop()
  profileImage: String;

}

export const UserSchema = SchemaFactory.createForClass(User);



// define schema without using decorators
// import * as mongoose from 'mongoose'

// export const UserSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String
// })