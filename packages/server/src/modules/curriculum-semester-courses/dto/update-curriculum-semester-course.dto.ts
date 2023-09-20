import { PartialType } from '@nestjs/mapped-types';
import { CreateCurriculumSemesterCourseDto } from './create-curriculum-semester-course.dto';

export class UpdateCurriculumSemesterCourseDto extends PartialType(CreateCurriculumSemesterCourseDto) {}
