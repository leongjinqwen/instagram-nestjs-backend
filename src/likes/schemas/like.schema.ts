import * as mongoose from 'mongoose'

export const LikeSchema = new mongoose.Schema({
    userId: String,
    imageId: String,
})