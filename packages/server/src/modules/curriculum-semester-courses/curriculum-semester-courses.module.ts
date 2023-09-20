import { Module } from '@nestjs/common';
import { CurriculumSemesterCoursesService } from './curriculum-semester-courses.service';
import { CurriculumSemesterCoursesController } from './curriculum-semester-courses.controller';

@Module({
  controllers: [CurriculumSemesterCoursesController],
  providers: [CurriculumSemesterCoursesService]
})
export class CurriculumSemesterCoursesModule {}
