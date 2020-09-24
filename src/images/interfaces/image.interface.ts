import { Document } from 'mongoose';

export interface Image extends Document{
    id?: number;
    userId: string;
    imageUrl: string;
} 