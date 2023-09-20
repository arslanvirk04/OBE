import { Module } from '@nestjs/common';
import { CurriculumSemestersService } from './curriculum-semesters.service';
import { CurriculumSemestersController } from './curriculum-semesters.controller';

@Module({
  controllers: [CurriculumSemestersController],
  providers: [CurriculumSemestersService]
})
export class CurriculumSemestersModule {}
