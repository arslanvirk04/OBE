import { Injectable } from '@nestjs/common';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';

@Injectable()
export class CoursesService {
  constructor(private readonly db: GlobalDbService) {}

  create = async (body: any, loggedInUser: any) => {
    const data = {
      ...body.courseData,
      Pre_Req : body.courseData.preReq,
      reference_Book : body.courseData.referenceBooks
    }
    console.log("data",data );

    const addCourse: any = await this.db.save(
      'Course',
      data,   
      loggedInUser,
    );
    console.log("addCourse",addCourse );
    
    const destroy = await this.db.repo.Clo.destroy({where :{courseId : addCourse.id},
    force : true
    })

    for (let index = 0; index < body.cloList.length; index++) {
      const clo = body.cloList[index];
      clo.courseId = addCourse.id;
      clo.code = `CLO-${index + 1}`;
      console.log('clo', clo);
      clo.createdAt = new Date();
      delete clo.id
      const addClo: any = await this.db.save('Clo', clo, loggedInUser);
      console.log('addClo', addClo);
    }
    return addCourse;
  };

  AddImportFile = async (body: any, loggedInUser: any) => {
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
        const course = await this.db.repo.Course.findOne({
          where: { courseCode: row.courseCode },
        });
        if (departmentName?.id && programName?.id && !course) {
          transformedData.push({
            ...row,
            departmentId: departmentName?.id,
            programId: programName?.id,
          });
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    console.log('transformedData', transformedData);

    const result = await this.db.repo.Course.bulkCreate(transformedData);
    console.log('result', result);
    return result;
  };

  findAll = async (body: any) => {
    const getAllCourses: any = await this.db.repo.Course.findAndCountAll({
      include: [
        {
          model: this.db.repo.Department,
        },
        {
          model: this.db.repo.Program,
        },
        {
          model: this.db.repo.Clo,
        },
      ],
    });
    return getAllCourses;
  };
  findOne = async (id: string) => {
    const getOneCourse: any = await this.db.repo.Course.findOne({
      where: { id },
      include: [
        {
          model: this.db.repo.Clo,
        },
      ],
    });
    return getOneCourse;
  };
  update = async (id: string) => {
    const updateOne: any = await this.db.repo.Course.update({ where: { id } });
    return updateOne;
  };
  remove = async (id: string) => {
    const deleteCourse: any = await this.db.repo.Course.destroy({
      where: { id },
    });
    return { message: 'Deleted Successfully' };
  };
}
