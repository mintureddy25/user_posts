import { Controller, Get, UseGuards, Req, Res, NotFoundException } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.gaurd';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  clientUrl = `${process.env.CLIENT_URL}/callback`;

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req, @Res() res) {
    const user = req.user;
    let dbUser = await this.usersService.findUserByEmail(user.email);
    if (!dbUser) {
      dbUser = await this.usersService.createUser(user);
    }
    const jwt = await this.authService.createJwt(dbUser);
    res.cookie('jwt', jwt.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000,
      sameSite: 'Strict',
    });
    return res.redirect(this.clientUrl);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(@Req() req) {}

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookRedirect(@Req() req, @Res() res) {
    const user = req.user;
    let dbUser = await this.usersService.findUserByEmail(user.email);
    if (!dbUser) {
      dbUser = await this.usersService.createUser(user);
    }
    const jwt = await this.authService.createJwt(user);
    res.cookie('jwt', jwt.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000,
      sameSite: 'Strict',
    });
    return res.redirect(this.clientUrl);
  }

  @Get('token')
  async getToken(@Req() req, @Res() res) {
    const token = req.cookies['jwt'];
    if (!token) {
      throw new NotFoundException(`Token not found`);
    }
    res.clearCookie('jwt');
    return res.json({ token });
  }
}
