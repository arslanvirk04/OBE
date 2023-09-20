import { PartialType } from '@nestjs/mapped-types';
import { CreateFacultyInformationDto } from './create-faculty_information.dto';

export class UpdateFacultyInformationDto extends PartialType(CreateFacultyInformationDto) {}
