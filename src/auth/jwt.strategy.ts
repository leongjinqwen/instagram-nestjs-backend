import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

// When implementing a strategy, you can provide a name for it by passing a second argument to the PassportStrategy function. 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // If you don't do this, each strategy will have a default name (e.g., 'jwt' for jwt-strategy)
// export class JwtStrategy extends PassportStrategy(Strategy, 'myjwt') => Named strategy
    constructor(private readonly config: ConfigService) {
        super({  // strategy requires some initialization, so we do that by passing in an options object in the super() call.
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, 
            // delegates the responsibility of ensuring that a JWT has not expired to the Passport module
            // passport handle expired token request with 401 unauthorized response
            secretOrKey: config.get('configuration').secretKey,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, username: payload.username };
  }
}