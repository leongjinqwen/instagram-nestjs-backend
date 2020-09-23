import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

// blueprint
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @Get() // get method
  // getHello(): string { // controller function name
  //   return this.appService.getHello(); // view (render template)
  // }

  // extended the passport-local strategy
  // @UseGuards(AuthGuard('local')) // Passport local strategy has a default name of 'local'
  @UseGuards(LocalAuthGuard) // doc recommend creating your own class instead passing the strategy name directly to the AuthGuard() 
  @Post('auth/login') 
  async login(@Request() req) {
    // returning a JWT if authorized
    // return req.user
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
