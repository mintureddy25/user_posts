import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'emails', 'name', 'picture'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, name, emails, photos } = profile;
    const user = {
      facebookId: id,
      username: (name.givenName && name.familyName) 
        ? `${name.givenName}.${name.familyName}` 
        : (name.givenName || name.familyName || (emails && emails[0] && emails[0].value) || ''),
      email: emails ? emails[0].value : null,
      image: photos ? photos[0].value : 'https://wallpapers.com/images/high/cartoon-profile-pictures-3opqz8op53khmhjp.webp',
      provider: 'facebook',
    };

    done(null, user);
  }
}
