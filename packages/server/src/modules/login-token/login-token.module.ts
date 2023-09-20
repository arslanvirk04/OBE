import { Module } from '@nestjs/common';
import { LoginTokenService } from './login-token.service';
import { LoginTokenController } from './login-token.controller';

@Module({
  controllers: [LoginTokenController],
  providers: [LoginTokenService]
})
export class LoginTokenModule {}
