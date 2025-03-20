import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async createGoogleJwt(user: any) {
    const payload = { googleId: user.googleId, name: user.name };
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
