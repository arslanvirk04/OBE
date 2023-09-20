import { Injectable } from '@nestjs/common';
import { CreateLoginTokenDto } from './dto/create-login-token.dto';
import { UpdateLoginTokenDto } from './dto/update-login-token.dto';

@Injectable()
export class LoginTokenService {
  create(createLoginTokenDto: CreateLoginTokenDto) {
    return 'This action adds a new loginToken';
  }

  findAll() {
    return `This action returns all loginToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loginToken`;
  }

  update(id: number, updateLoginTokenDto: UpdateLoginTokenDto) {
    return `This action updates a #${id} loginToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} loginToken`;
  }
}
