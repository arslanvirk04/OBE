import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginTokenService } from './login-token.service';
import { CreateLoginTokenDto } from './dto/create-login-token.dto';
import { UpdateLoginTokenDto } from './dto/update-login-token.dto';

@Controller('login-token')
export class LoginTokenController {
  constructor(private readonly loginTokenService: LoginTokenService) {}

  @Post()
  create(@Body() createLoginTokenDto: CreateLoginTokenDto) {
    return this.loginTokenService.create(createLoginTokenDto);
  }

  @Get()
  findAll() {
    return this.loginTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginTokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginTokenDto: UpdateLoginTokenDto) {
    return this.loginTokenService.update(+id, updateLoginTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginTokenService.remove(+id);
  }
}
