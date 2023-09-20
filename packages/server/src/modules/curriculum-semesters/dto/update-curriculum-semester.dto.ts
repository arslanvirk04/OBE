import { PartialType } from '@nestjs/mapped-types';
import { CreateCurriculumSemesterDto } from './create-curriculum-semester.dto';

export class UpdateCurriculumSemesterDto extends PartialType(CreateCurriculumSemesterDto) {}
