import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/modules/user/user.service';


@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly UserService: UserService) {
    super();
  }

  validate(username: string, password: string) {
    console.log('username', username); 
    console.log('password', password);
    // const user = this.UserService.db(username, password);

    // console.log('user is here', user);

    // if (!user) {
    //   throw new UnauthorizedException('No Such user exists');
    // }

    // if (user.password !== password) throw new UnauthorizedException('incorrect password');
    
    // return user;
  }
}
