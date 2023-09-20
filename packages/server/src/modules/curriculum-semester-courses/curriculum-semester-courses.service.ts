import { Injectable } from '@nestjs/common';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';


@Injectable()
export class CurriculumSemesterCoursesService {
  constructor(private readonly db: GlobalDbService) {}
  create = async (body: any) => {
    const courseData: any = await this.db.repo.CurriculumSemesterCourse.create(
      body,
    );
    return courseData;
  };

  findAll = async () => {
    const getAllSemesterCourses: any =
      await this.db.repo.CurriculumSemesterCourse.findAndCountAll();
    return getAllSemesterCourses;
  };

  findOne = async (id: string) => {
    const getOneSemesterCourses: any =
      await this.db.repo.CurriculumSemesterCourse.findOne({ where: { id } });
    return getOneSemesterCourses;
  };

  update = async (id: string) => {
    const updateOneSemesterCourses: any =
      await this.db.repo.CurriculumSemesterCourse.update({ where: { id } });
    return updateOneSemesterCourses;
  };

  remove = async (id: string) => {
    const deleteSemesterCourses: any =
      await this.db.repo.CurriculumSemesterCourse.destroy({ where: { id } });
    return deleteSemesterCourses;
  };
}
