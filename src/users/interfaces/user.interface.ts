import { Document } from 'mongoose';

export interface User extends Document{
    id?: number;
    username: string;
    password: string;
    email: string;
    profileImage: string;
} 