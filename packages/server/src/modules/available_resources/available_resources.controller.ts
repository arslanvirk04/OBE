import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvailableResourcesService } from './available_resources.service';
import { CreateAvailableResourceDto } from './dto/create-available_resource.dto';
import { UpdateAvailableResourceDto } from './dto/update-available_resource.dto';

@Controller('available-resources')
export class AvailableResourcesController {
  constructor(private readonly availableResourcesService: AvailableResourcesService) {}

  @Post()
  create(@Body() createAvailableResourceDto: CreateAvailableResourceDto) {
    return this.availableResourcesService.create(createAvailableResourceDto);
  }

  @Get()
  findAll() {
    return this.availableResourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availableResourcesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvailableResourceDto: UpdateAvailableResourceDto) {
    return this.availableResourcesService.update(+id, updateAvailableResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availableResourcesService.remove(+id);
  }
}
