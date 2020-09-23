import * as mongoose from 'mongoose'


export const ItemSchema = new mongoose.Schema({
    userId: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
})