// src/auth/auth.controller.ts

import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.gaurd';



@Controller('auth')
export class AuthController {

  // Google login endpoint
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  // Google OAuth callback endpoint
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req , @Res() res) {
    //return { jwt: req.user.jwt };  // Return the JWT token
    // res.redirect(`http://localhost:3000/login/success?token=${user.accessToken}`);
  }
}
1
