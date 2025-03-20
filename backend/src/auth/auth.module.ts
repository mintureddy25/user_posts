// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/auth.gaurd';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './auth.google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }), 
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
    }),
    ConfigModule
  ],
  providers: [AuthService, GoogleStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
