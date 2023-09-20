import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { GetLoggedInUser } from 'src/auth/decorators/getLoggedINUser';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('addTeacher')
  create(
    @Body()
    body: any,
    @GetLoggedInUser() loggedInUser: any,
  ) {
    return this.teacherService.create(body, loggedInUser);
  }

  @Post('addImportFileTeacher')
  addImportFileTeacher(
    @Body()
    body: any,
    @GetLoggedInUser() loggedInUser: any,
  ) {
    return this.teacherService.addImportFileTeacher(body, loggedInUser);
  }

  @Get('getAllTeachers')
  findAll(@Body() body: any) {
    return this.teacherService.findAll(body);
  }

  @Get('/getOne/:id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string) {
    return this.teacherService.update(id);
  }

  @Delete('/destroy/:id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
