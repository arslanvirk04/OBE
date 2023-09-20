import { UnauthorizedException } from '@nestjs/common';
const dayjs = require('dayjs');

export class Validate {
  constructor() {}
  async token(tokenDetail: any) {
    if (!tokenDetail) {
      throw new UnauthorizedException('Token expired');
    }
    const checkedAt = dayjs();
    const expiredAt = dayjs(tokenDetail.expiredAt);
    if (checkedAt > expiredAt) {
      throw new UnauthorizedException('Token expired');
    }
    return true;
  }
}
