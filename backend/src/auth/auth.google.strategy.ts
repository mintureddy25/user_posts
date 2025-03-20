// auth/google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService, // For accessing environment variables
    private authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID, // Use your Google OAuth client ID from the .env file
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Use your Google OAuth client secret from the .env file
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // The URL where Google will redirect after successful login
      scope: ['email', 'profile'], // Specify the scopes you want (email, profile, etc.)
    });
  }

  // This function is called once Google sends the user back to the callback URL
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, displayName, emails } = profile;

    // You can store the user information or do any custom logic here, like creating or updating the user in your database.
    const user = {
      googleId: id,
      name: displayName,
      email: emails[0].value, // Assuming the first email is the primary one
    };

    // Return the user to Passport (done) to proceed with authentication
    done(null, user);
  }
}
