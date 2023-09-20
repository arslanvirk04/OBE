import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { log } from 'console';
import { AuthGuard } from '@nestjs/passport';
import { GetLoggedInUser } from 'src/auth/decorators/getLoggedINUser';


@Controller('department')
export class DepartmentController {
  constructor(private readonly object: DepartmentService) {}
  @UseGuards(AuthGuard())

  @Post('add')
  create(@Body() body : any , @GetLoggedInUser() loggedInUser : any) {

    return this.object.create(body, loggedInUser);
  }
  @Post('addDepartmentImportFile')
  addDepartmentImportFile(@Body() body : any , @GetLoggedInUser() loggedInUser : any) {

    return this.object.addDepartmentImportFile(body, loggedInUser);
  }
  // @Post('add')
  // create(@Body() body : any) {

  //   return this.object.create(body);
  // }

  @Get('getAllDepartment')
  findAll(@Body() body : any) {
    return this.object.findAll();
  }

  @Get('/getOne/:id')
   findOne(@Param('id') id: string)
  {
    return this.object.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string) {
    return this.object.update(id );
  }

  @Delete('/destroy/:id')
  remove(@Param('id') id: string) {
    return this.object.remove(id);
  }
}
