// src/auth/auth.controller.ts

import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.gaurd';



@Controller('auth')
export class AuthController {
  constructor(e) {}

  // Google login endpoint
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  // Google OAuth callback endpoint
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req) {
    return { jwt: req.user.jwt };  // Return the JWT token
  }
}
1
