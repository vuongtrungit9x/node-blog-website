import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
/**
 * Strategy that implements JSON Web Token (JWT) authentication.
 */
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET_KEY'),
    });
  }

  /**
   * Validates the JWT payload.
   * @param payload - The payload extracted from the JWT.
   * @returns An object containing the user ID and username.
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
