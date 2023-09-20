import {
  Body,
  Controller,
  Post,
  Headers,
  Ip,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.sevice';
import { response } from 'express';
import { TransactionInterceptor } from 'src/database/transaction.interceptor';
import { TransactionParam } from 'src/database/transaction-param.decorator';
import { Transaction } from 'sequelize';
@UseInterceptors(TransactionInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private object: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() body: any,
    @Headers('user-agent') userAgent: any,
    @Ip() ip: string,
    @TransactionParam() transaction: Transaction,
  ) {
    console.log('Login successful');
    return this.object.login(body,transaction, { userAgent, ip ,transaction});
  }

  @Post('signup')
  signup(
    @Body() body: any,
    @Headers('user-agent') userAgent: any,
    @Ip() ip: string,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.object.signup(body,transaction ,{ userAgent, ip });
  }

  @Post('logout')
  logout(@Body() body: any) {
    console.log('logout successful');

    return this.object.logout(body.token);
  }
}
