import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// session blueprint (login)
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService // to generate jwt
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        // check hashed password
        const passwordMatched = await bcrypt.compare(pass, user.password)
        if (user && passwordMatched) {
            // const { password, username, _id, email } = user; // destructuring (result only include id & username)
            return {
                _id : user._id,
                email : user.email,
                username : user.username,
            };
        }
        // if password wrong, return null
        return null;
    }
    async login(user: any) {
        // create token with username and userid as payload
        const payload = { username: user.username, sub: user._id };
        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            access_token: this.jwtService.sign(payload), // token
        };
    }
}