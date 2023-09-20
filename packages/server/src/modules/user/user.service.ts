import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';

@Injectable()
export class UserService {
  constructor(private readonly db: GlobalDbService) {}

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update = async (body: UpdateUserDto) => {
    const loggedInUser = {
      user: { id: body.id },
    }

    const user: any = await this.db.save('User', body, loggedInUser);

    return `user updated successfully here`;
  };

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
