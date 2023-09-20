import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { GetLoggedInUser } from 'src/auth/decorators/getLoggedINUser';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('add')
  create(@Body() body: any , @GetLoggedInUser() loggedInUser: any) {
    return this.coursesService.create(body,loggedInUser);
  }
  @Post('addImportFile')
  AddImportFile(@Body() body: any , @GetLoggedInUser() loggedInUser: any) {
    return this.coursesService.AddImportFile(body,loggedInUser);
  }

  @Get('getAllCourses')
  findAll( @Body()  body : any) {
    return this.coursesService.findAll(body);
  }
 
  @Get('/getOne/:id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string) {
    return this.coursesService.update(id);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
