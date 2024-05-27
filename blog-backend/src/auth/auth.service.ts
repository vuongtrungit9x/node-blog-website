import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/interfaces/users.interface';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';

@Injectable()
/**
 * Service responsible for authentication-related operations.
 */
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates a user's credentials.
   * @param username - The username of the user.
   * @param pass - The password of the user.
   * @returns A Promise that resolves to the validated user object if the credentials are valid, or null otherwise.
   */
  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByName(username);
    if (user && (await bcrypt.compare(pass, user.password_hash))) {
      const result = omit(user, 'password_hash');
      return result;
    }
    return null;
  }

  /**
   * Logs in a user and generates an access token.
   * @param user - The user object.
   * @returns An object containing the access token.
   */
  async login(username: string, pass: string) {
    const user = await this.validateUser(username, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
