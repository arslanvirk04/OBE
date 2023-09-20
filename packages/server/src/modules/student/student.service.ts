import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Transaction } from 'sequelize';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';

@Injectable()
export class StudentService {
  constructor(private readonly db: GlobalDbService) {}

  create = async (body: any, loggedInUser: any) => {
    console.log('body', body);
    const userData: any = {
      name: body.name,
      email: body.email,
      contactNo: body.contactNo,
      address: body.address,
      city: body.city,
      password: body.password,
      createdAt: body.createdAt,
    };
    if (body.userId) {
      userData.id = body.userId;
    }
    console.log('userData', userData);

    const user: any = await this.db.save('User', userData, loggedInUser);
    console.log('user', JSON.stringify(user, null, 2));
    const studentData: any = {
      registrationNo: body.registrationNo,
      program: body.program,
      session: body.session,
      departmentId: body.departmentId,
      createdAt: body.createdAt,
      userId: user.getDataValue('id'),
    };

    if (body.id) {
      studentData.id = body.id;
    }
    console.log('loggedInUser', loggedInUser);

    console.log('studentData', studentData);
    const student: any = await this.db.save(
      'Student',
      studentData,
      loggedInUser,
    );
    return { student, user };
  };

  addImportFileStudent = async (body: any, loggedInUser: any) => {
    const transformedData = [];

    for (const row of body) {
      try {
        console.log('row', row);
        const departmentName = await this.db.repo.Department.findOne({
          where: { name: row.department },
        });
        const programName = await this.db.repo.Program.findOne({
          where: { name: row.program },
        });
        const student = await this.db.repo.Student.findOne({
          where: { registrationNo: row.registrationNo },
        });

        if (departmentName?.id && programName?.id && !student) {
          const currentTimestamp = new Date();
          transformedData.push({
            ...row,
            departmentId: departmentName?.id,
            programId: programName?.id,
            userId: loggedInUser.user.id,
            createdAt: currentTimestamp,
          });
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    console.log('transformedData', transformedData);
    const result = await this.db.repo.Student.bulkCreate(transformedData);
    console.log('result', result);
    return result;
  };

  findAll = async ( loggedInUser: any) => {
    const students: any = await this.db.repo.Student.findAndCountAll({
      loggedInUser,
      include: [
        {
          model: this.db.repo.User,
        },
        {
          model: this.db.repo.Department,
        },
        // {
        //   model: this.db.repo.Session,
        // },
        // {
        //   model: this.db.repo.Program,
        // },
      ],
    });
    return students;
  };

  findOne = async (id: string) => {
    const getOneStudent: any = await this.db.repo.Student.findOne({
      where: { id },
      include: [
        {
          model: this.db.repo.User,
        },
        {
          model: this.db.repo.Department,
        },
      ],
    });
    return getOneStudent;
  };

  update = async (id: string) => {
    const updateStudent: any = await this.db.repo.Student.update({
      where: { id },
    });
    return `This action updates a #${id} student`;
  };

  remove = async (id: string) => {
    const deleteOne: any = await this.db.repo.Student.destroy({
      where: { id },
    });
    return { message: 'Deleted Successfully' };
  };
}
