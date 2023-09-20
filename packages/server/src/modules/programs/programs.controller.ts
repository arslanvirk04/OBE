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
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetLoggedInUser } from 'src/auth/decorators/getLoggedINUser';

@UseGuards(AuthGuard())
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}


  @Post('/addProgram')
  create(@Body() body, @GetLoggedInUser() loggedInUser : any) {
    return this.programsService.create(body,loggedInUser);
  }
  @Post('/addProgramImportFile')
  addProgramImportFile(@Body() body, @GetLoggedInUser() loggedInUser : any) {
    return this.programsService.addProgramImportFile(body,loggedInUser);
  }
  @Get('/getAllPrograms')
  findAll(@Body() body: any) {
    return this.programsService.findAll();
  }
  @Get('/getOneProgram/:id')
  findOne(@Param('id') id: number) {
    return this.programsService.findOne(id);
  }
  @Patch('/update/:id')
  update(@Param('id') id: number) {
    return this.programsService.update(id);
  }
  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.programsService.remove(id);
  }
}
