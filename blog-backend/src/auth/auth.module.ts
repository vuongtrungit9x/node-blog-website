import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
// import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';
import { UsersController } from '../users/users.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [UsersController],
  exports: [AuthService],
})
export class AuthModule {}
