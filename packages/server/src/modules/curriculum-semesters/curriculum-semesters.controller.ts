import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurriculumSemestersService } from './curriculum-semesters.service';
import { CreateCurriculumSemesterDto } from './dto/create-curriculum-semester.dto';
import { UpdateCurriculumSemesterDto } from './dto/update-curriculum-semester.dto';

@Controller('curriculum-semesters')
export class CurriculumSemestersController {
  constructor(private readonly curriculumSemestersService: CurriculumSemestersService) {}

  @Post('add')
  create(@Body() body : any ) {
    return this.curriculumSemestersService.create(body);
  }

  @Get('getAll')
  findAll(@Body() body : any) {
    return this.curriculumSemestersService.findAll();
  }

  @Get('/getOne/:id')
  findOne(@Param('id') id: string) {
    return this.curriculumSemestersService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string) {
    return this.curriculumSemestersService.update(id);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.curriculumSemestersService.remove(id);
  }
}
