import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly object: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  findAll() {
    return this.object.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.object.findOne(+id);
  }

  @Patch('profile')
  update(@Body() body: UpdateUserDto) {
    return this.object.update(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.object.remove(+id);
  }
}
