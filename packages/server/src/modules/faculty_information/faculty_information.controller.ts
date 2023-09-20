import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacultyInformationService } from './faculty_information.service';
import { CreateFacultyInformationDto } from './dto/create-faculty_information.dto';
import { UpdateFacultyInformationDto } from './dto/update-faculty_information.dto';

@Controller('faculty-information')
export class FacultyInformationController {
  constructor(private readonly facultyInformationService: FacultyInformationService) {}

  @Post('addFaculty')
  create(@Body() body:any ) {
    return this.facultyInformationService.create(body);
  }

  @Get('getAllFaculty')
  findAll(@Body() body : any) {
    return this.facultyInformationService.findAll(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facultyInformationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacultyInformationDto: UpdateFacultyInformationDto) {
    return this.facultyInformationService.update(+id, updateFacultyInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultyInformationService.remove(id);
  }
}
