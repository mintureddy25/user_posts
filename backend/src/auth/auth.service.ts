import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async createJwt(user: any) {
    const payload = { id: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // Verify JWT token
  verifyJwt(token: string) {
    try {
      const decoded = this.jwtService.verify(token); 
      return decoded;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
