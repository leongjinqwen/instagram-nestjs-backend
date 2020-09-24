import * as mongoose from 'mongoose'

export const ImageSchema = new mongoose.Schema({
    userId: String,
    imageUrl: String,
})