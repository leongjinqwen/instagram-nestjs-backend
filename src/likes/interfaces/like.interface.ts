import { Document } from 'mongoose';

export interface Like extends Document{
    id?: number;
    userId: string;
    imageId: string;
} 