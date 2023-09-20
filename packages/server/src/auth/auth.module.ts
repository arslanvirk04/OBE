import { Module } from '@nestjs/common';
import { PassportLocalStrategy } from './passport.local.strategy';
import { AuthService } from './auth.sevice';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { UserContextService } from './user-context.service';
import { JWT_SECRET_KEY } from 'src/constants';
import { Validate } from 'src/helpers/validate';


@Module({
  imports: [
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
    }),
    UserModule,
    Validate
  ],
  controllers: [AuthController],
  providers: [AuthService,UserContextService, JwtStrategy, Validate],
  exports: [AuthService, JwtStrategy, UserContextService, PassportModule],
})
export class AuthModule {}
