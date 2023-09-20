import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as sequelize from 'sequelize';
import * as _ from 'lodash';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';
// import { GlobalDbService } from 'global-db.service';
const { Op } = sequelize;
const BASE_URL = 125;
@Injectable()
export class UserContextService {
  private logger = new Logger('UserContextService');
  private isActiveWhere = { isActive: true };
  constructor(private readonly db: GlobalDbService) {}

  async getUserContext(loggedInUser: any): Promise<any> {
    const userData = loggedInUser.user;


    try {
      const userPromise = this.getUserDetails(userData);
      // let assignedClients = [];
      // let Company: any = {};

      const [user] = await Promise.all([userPromise]);
      // const isSuperAdmin = !_.isEmpty(user.SuperUser);
      const isStudent = !_.isEmpty(user.Student);
      const isTeacher = !_.isEmpty(user.Teacher);
      const loggedInUser: any = {
        user: {
          ..._.pick(user, ['id', 'name', 'email', 'Student', 'Teacher']),
        },
        baseUrl: BASE_URL,
        isStudent,
        isTeacher,
      };
      return loggedInUser;
    } catch (e) {
      console.log('error', e.message);

      if (e.response && e.response.error == 'Unauthorized') {
        throw new UnauthorizedException('user is in-active');
      } else {
        this.logger.error('Error occurred while getUserContext ', e);
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserDetails(user: any): Promise<any> {
    const { repo } = this.db;
    const { id } = user;
    try {
      const cUser = await repo.User.findOne({
        where: { id },
        attributes: [
          'id',
          'name',
          'email',
          'contactNo',
          // 'isActive',
        ],
        include: [
          {
            model: repo.Student,
            required: false,
          },
          {
            model: repo.Teacher,
            required: false,
          },
        ],
      });
      if (cUser) {
        return cUser;
      } else {
        throw new UnauthorizedException('user is in-active');
      }
    } catch (e) {
      if (e.response && e.response.error == 'Unauthorized') {
        throw new UnauthorizedException('user is in-active');
      } else {
        this.logger.error('Error occurred while getUserDetails ', e);
        throw new InternalServerErrorException();
      }
    }
  }

  // async getUserRolePermissions(user: any): Promise<any> {
  //   const { repo } = this.db;
  //   try {
  //     let permissions = await repo.Permission.findAll({
  //       where: this.isActiveWhere,
  //       attributes: ['permission'],
  //       include: [
  //         {
  //           model: repo.RolePermission,
  //           required: true,
  //           attributes: [],
  //           include: [
  //             {
  //               model: repo.Role,
  //               as: 'Role',
  //               where: this.isActiveWhere,
  //               required: true,
  //               attributes: [],
  //               include: [
  //                 {
  //                   model: repo.User,
  //                   where: { id: user.id },
  //                   required: true,
  //                   attributes: [],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     permissions = _.map(permissions, 'permission');
  //     return permissions;
  //   } catch (e) {
  //     this.logger.error('Error occured while getUserRolePermissions ', e);
  //     throw new InternalServerErrorException();
  //   }
  // }
}
