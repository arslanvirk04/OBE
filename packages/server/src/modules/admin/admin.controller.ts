import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly object: AdminService) {}

  @Post('addDept')
  login(@Body() body: any,) {
    return this.object.login(body);
  }

  @Get('getAll')
  findAll(@Body() body: any) {
    return this.object.findAll(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.object.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.object.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.object.remove(id);
  }
}
