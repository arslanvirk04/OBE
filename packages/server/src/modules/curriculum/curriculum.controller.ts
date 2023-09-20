import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetLoggedInUser } from 'src/auth/decorators/getLoggedINUser';

@UseGuards(AuthGuard())
@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post('/addCurriculum')
  create(@Body() body :any , @GetLoggedInUser() loggedInUser: any ) {
    return this.curriculumService.create(body, loggedInUser);
  }
  @Post('/addCurriculumImportFile')
  addCurriculumImportFile(@Body() body :any , @GetLoggedInUser() loggedInUser: any ) {
    return this.curriculumService.addCurriculumImportFile(body, loggedInUser);
  }

  @Get('/getAllCurriculum')
  findAll(@Body() body : any) {
    return this.curriculumService.findAll();
  }

  @Get('/getOneCurriculum/:id')
  findOne(@Param('id') id: string) {
    return this.curriculumService.findOne(id);
  }

  @Patch('/updateCurriculum/:id')
  update(@Param('id') id: string, @Body() updateCurriculumDto: UpdateCurriculumDto) {
    return this.curriculumService.update(+id, updateCurriculumDto);
  }

  @Delete('/deleteCurriculum/:id')
  remove(@Param('id') id: string) {
    return this.curriculumService.remove(id);
  }
}
