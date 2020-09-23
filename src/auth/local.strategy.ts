import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// passport-local authentication flow
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }
    // the passport-local strategy by default expects properties called username and password in the request body
    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        // password wrong, user = null, then throw unauthorized
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}