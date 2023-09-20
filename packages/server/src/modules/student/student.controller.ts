import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { GetLoggedInUser } from 'src/auth/decorators/getLoggedINUser';
import { AuthGuard } from '@nestjs/passport';
import { TransactionParam } from 'src/database/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { TransactionInterceptor } from 'src/database/transaction.interceptor';
import { Student } from './entities/student.entity';

@UseGuards(AuthGuard())
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('add')
  create(
    @Body() body: any,
    @GetLoggedInUser() loggedInUser: any,
  ) {
    return this.studentService.create(body, loggedInUser);
  }
  @Post('addImportFileStudent')
  addImportFileStudent(
    @Body() body: any,
    @GetLoggedInUser() loggedInUser: any,
  ) {
    return this.studentService.addImportFileStudent(body, loggedInUser);
  }
  @Get('findAllStudent')
  findAll( @GetLoggedInUser() loggedInUser: any,) {
    return this.studentService.findAll(loggedInUser);
  }
  @Get('/getOne/:id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }
  @Patch('/update/:id')
  update(@Param('id') id: string) {
    return this.studentService.update(id);
  }
  @Delete('/destroy/:id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
