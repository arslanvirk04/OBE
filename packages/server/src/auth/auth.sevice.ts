import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginToken } from 'src/modules/login-token/entities/login-token.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { UserContextService } from './user-context.service';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';

const dayjs = require('dayjs');
const JWT_TOKEN_EXPIRY_DEFAULT = 3600 * 8;
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly db: GlobalDbService,
    private readonly userContext: UserContextService,
  ) {}

  login = async (createUserDto, userinfo, transaction) => {
    const { email, password } = createUserDto;
    const user: any = await this.db.getOne('User', { email });

    if (!user) throw new ConflictException('user not found');
    if (user && user.password === password) {
      const response = await this.generateToken(
        { ...user.get({ plain: true }), ...createUserDto },
        userinfo,
      );

      return response;
    } else {
      throw new ConflictException('incorrect password');
    }
  };

  signup = async (body, userinfo, transaction) => {
    const person = await this.db.repo.User.findOne({
      where: { email: body.email },
    });

    if (person)
      throw new ConflictException('User with this email already exists');
    const user = await this.db.repo.User.create(body, transaction);

    const data: any = {
      userId: user.id,
      createdAt: new Date(),
    };

    if (body.type === 'teacher') {
      if (body.departmentName) {
        const deptData = {
          userId: user.id,
          createdAt: new Date(),
          name: body.departmentName,

     
        };
        const department: any = await this.db.repo.Department.create(deptData);

        data.departmentId = department.id;
        console.log("departmentId: ", data.departmentId );
        
        
      } else {
        // data.departmentId = department.id;
        data.departmentId = body.departmentId;
        data.designation = body.designation;
        data.teachingPlan = body.teachingPlan;
        data.areaOfSpecialization = body.areaOfSpecialization;
        data.experience = body.experience;
        data.coursesOffering = body.coursesOffering;
        data.joiningDate = body.joiningDate;

        console.log("departmentId: after ", data.departmentId );
      }
      const teacher: any = await this.db.repo.Teacher.create(data, transaction);
      console.log("departmentId: after created ", data.departmentId );
    }
    if (body.type === 'student') {
      data.departmentId = body.departmentId;
      data.registrationNo = body.registrationNo;
      data.program = body.program;
      data.session = body.session;
      data.createdBy = body.createdBy;
      data.isActive = body.isActive;
      data.contactNo = body.contactNo;
      data.city = body.city;
      data.address = body.address;
      const student: any = await this.db.repo.Student.create(data, transaction);
      console.log("student", student);
      console.log("body", body);
      
    }
    const response = await this.generateToken(
      { ...body, ...user.get({ plain: true }) },
      userinfo,
    );
    return response;
  };

  logout = async (token) => {
    const expiredAt = new Date();

    await this.db.repo.LoginToken.update(
      { expiredAt },
      { where: { token: token } },
    );
    return { message: 'token expired' };
  };

  async generateToken(user: any, userinfo): Promise<any> {
    const { ip, userAgent } = userinfo;
    const authSuccess = {
      user: {
        id: user.id,
        username: user.username,
      },
    };
    const token = this.jwtService.sign(authSuccess, {
      expiresIn: JWT_TOKEN_EXPIRY_DEFAULT,
    });
    const loginToken = new LoginToken();
    loginToken.userId = user.id;
    loginToken.ip = ip;
    loginToken.userAgent = userAgent;
    loginToken.expiredAt = dayjs(new Date()).add(8, 'hours').toDate();
    loginToken.token = token;
    loginToken.createdAt = new Date();
    loginToken.createdBy = user.id;
    try {
      await loginToken.save();
    } catch (error) {
      throw new ConflictException(error.message);
    }
    const userContext: any = await this.userContext.getUserContext({
      user,
    });
    const result = {
      ...userContext,
      token,
    };
    return result;
  }
  // generateToken(payload: User): string {
  //   return this.jwtService.sign(payload);
  // }
}
