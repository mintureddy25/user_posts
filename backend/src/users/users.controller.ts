import { Controller, Get, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.gaurd';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard) 
  @Get('profile')
  async getUserProfile(@Request() req) {
    const user = req.user;
    console.log(user, 'user', user.userId);
    const userProfile = await this.userService.getUser(user.userId);
    if (!userProfile) {
        throw new NotFoundException('User not found');
      }
    return userProfile;
  }
}
