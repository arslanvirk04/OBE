import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurriculumSemesterCoursesService } from './curriculum-semester-courses.service';
import { CreateCurriculumSemesterCourseDto } from './dto/create-curriculum-semester-course.dto';
import { UpdateCurriculumSemesterCourseDto } from './dto/update-curriculum-semester-course.dto';

@Controller('curriculum-semester-courses')
export class CurriculumSemesterCoursesController {
  constructor(private readonly curriculumSemesterCoursesService: CurriculumSemesterCoursesService) {}

  @Post('/add')
  create(@Body() body:any ) {
    return this.curriculumSemesterCoursesService.create(body);
  }

  @Get('/getAll')
  findAll(@Body() body : any) {
    return this.curriculumSemesterCoursesService.findAll();
  }

  @Get('/getOne/:id')
  findOne(@Param('id') id: string) {
    return this.curriculumSemesterCoursesService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string) {
    return this.curriculumSemesterCoursesService.update(id);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.curriculumSemesterCoursesService.remove(id);
  }
}
