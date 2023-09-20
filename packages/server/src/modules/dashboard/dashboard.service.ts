import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';


@Injectable()
export class DashboardService {
  constructor(private readonly db: GlobalDbService) {}

  getStats = async () => {
    const { repo } = this.db;
    const students = await repo.Student.count();
    const teachers = await repo.Teacher.count();
    const curriculum = await repo.Curriculum.count();
    const courses = await repo.Course.count();
    const programs = await repo.Program.count();
    const sessions = await repo.Session.count();

    return {
      studentCount: students,
      teacherCount: teachers,
      curriculumCount: curriculum,
      coursesCount: courses,
      programCount: programs,
      sessionsCount: sessions,
    };
  };
}
