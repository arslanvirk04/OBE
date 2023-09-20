import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';

@Injectable()
export class TeacherService {
  constructor(private readonly db : GlobalDbService){}
   
  create = async (
    body: any,
    loggedInUser: any
  ) => {
    console.log('body', body);
    const userData: any = {
      userId : body.userId,
      name: body.name,
      email: body.email,
      contactNo: body.contactNo,
      city : body.city,
      address: body.address,
      password: body.password,
    };
    const TeacherData: any = {
       id : body.id,
       userId : body.userId,
      contactNo : body.contactNo,
      departmentId: body.departmentId,
      designation: body.designation,
      experience: body.experience,
      joiningDate : body.joiningDate,
      teachingPlan: body.teachingPlan,
      areaOfSpecialization: body.areaOfSpecialization,
      coursesOffering : body.coursesOffering,
      createdAt: body.createdAt,
    };

    if (body.id) {
      TeacherData.id = body.id;
    }
    if (body.userId) {
      userData.id = body.userId;
    }
    console.log('userData', userData);

    const user: any = await this.db.save(
      'User',
      userData,
      loggedInUser
    );
    console.log('user', user);
    TeacherData.userId = user.getDataValue('id');
    console.log('TeacherData', TeacherData);
    const Teacher: any = await this.db.save(
      'Teacher',
      TeacherData,
      loggedInUser
    );
    return { Teacher, user };
  };


  addImportFileTeacher = async (body: any, loggedInUser: any) => {
    const transformedData = [];
  
    for (const row of body) {
      try {
        const departmentName = await this.db.repo.Department.findOne({
          where: { name: row.department },
        });
        if (!departmentName) {
          throw new Error(`Department not found for name: ${row.department}`);
        }
   
        console.log('departmentName', departmentName);
        
        transformedData.push({
          ...row,
          departmentId: departmentName.id,
          userId: loggedInUser.user.id,
          createdAt:  new Date(),
          joiningDate: new Date(row.joiningDate)
        });
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  
    console.log('transformedData', transformedData);
  
    const result=  await this.db.repo.Teacher.bulkCreate(transformedData);
    console.log("result" , result);
    return result;
  };

  findAll= async(body: any)=> {
    const getAllTeachers = await this.db.repo.Teacher.findAndCountAll({
      include: [
        {
          model: this.db.repo.User,
        },
        {
          model: this.db.repo.Department,
        },
      ],
    });
    return getAllTeachers;
  }

  findOne = async(id: string) =>{
    const getOne : any= await this.db.repo.Teacher.findOne({where : {id},
      include: [
        {
          model: this.db.repo.User,
        },
        {
          model: this.db.repo.Department,
        },
      ],
    });
    return getOne;
  }
  update= async(id: string )=> {
    const updateTeacher : any = await this.db.repo.Teacher.update({where : {id},
      include: [
        {
          model: this.db.repo.User,
        },
        {
          model: this.db.repo.Department,
        },
      ],
    })
    return {message:"updated Successfully"};
  }

  remove= async(id: string) =>{
    const deleteOne  : any = await this.db.repo.Teacher.destroy({where : {id}})
    return {message:"Deleted Successfully"};
  }
}
