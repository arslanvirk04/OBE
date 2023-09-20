import {
  Injectable,
  Inject,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import * as dayjs from 'dayjs';
import { Op } from 'sequelize';
import { User } from 'src/modules/user/entities/user.entity';
import { UserContextService } from './user-context.service';
import { JWT_SECRET_KEY } from 'src/constants';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';

const jwtExtractor = (req) => {
  let token = null;
  if (req?.headers) {
    const tokenParts = req.headers?.authorization?.split('Bearer ');
    if (tokenParts?.[1]) {
      token = tokenParts[1];
      global.jwtToken = token;
    }
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userContextService: UserContextService,
    private readonly DB: GlobalDbService,
  ) {
    super({
      jwtFromRequest: jwtExtractor,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate(payload: any): Promise<User> {
    const { repo } = this.DB;
    try {
      const now = dayjs().toDate();
      const loggedInUser = await this.DB.repo.User.findOne({
        include: [
          {
            model: repo.LoginToken,
            where: {
              token: global.jwtToken,
              expiredAt: { [Op.gte]: now },
            },
            attributes: [],
          },
        ],
      });
      
      if (!loggedInUser) {
        throw new UnauthorizedException();
      }

      const userContext = await this.userContextService.getUserContext({
        user: loggedInUser,
      });

      return userContext;
    } catch (e) {
      
      throw new UnauthorizedException();
    }
  }
}
