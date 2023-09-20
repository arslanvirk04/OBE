import { Module } from '@nestjs/common';
import { FacultyInformationService } from './faculty_information.service';
import { FacultyInformationController } from './faculty_information.controller';

@Module({
  controllers: [FacultyInformationController],
  providers: [FacultyInformationService]
})
export class FacultyInformationModule {}
