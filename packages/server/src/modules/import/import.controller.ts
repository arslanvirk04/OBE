import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ImportService } from './import.service';
import { CreateImportDto } from './dto/create-import.dto';
import { UpdateImportDto } from './dto/update-import.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetLoggedInUser } from 'src/auth/decorators/getLoggedINUser';

@UseGuards(AuthGuard())
@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('addFile')
  create(@Body() body : any , @GetLoggedInUser() loggedInUser : any) {
    return this.importService.create(body, loggedInUser);
  }

  @Get('getAllFiles')
  findAll() {
    return this.importService.findAll();
  }

  @Get('/getOneFile/:id')
  findOne(@Param('id') id: number) {
    return this.importService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImportDto: UpdateImportDto) {
    return this.importService.update(+id, updateImportDto);
  }

  @Delete('/deleteFile/:id')
  remove(@Param('id') id: number) {
    return this.importService.remove(id);
  }
}
