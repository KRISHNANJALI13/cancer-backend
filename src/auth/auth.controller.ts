import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { uname: string; pwd: string }) {
    try {
      const result = await this.authService.validateUser(body.uname, body.pwd);
      return { statusCode: 200 }; // Always return 200 on success
    } catch (error) {
      throw new HttpException({ statusCode: 401 }, HttpStatus.UNAUTHORIZED);
    }
  }
}
