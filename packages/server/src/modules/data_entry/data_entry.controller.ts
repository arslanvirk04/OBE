import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataEntryService } from './data_entry.service';
import { CreateDataEntryDto } from './dto/create-data_entry.dto';
import { UpdateDataEntryDto } from './dto/update-data_entry.dto';

@Controller('data-entry')
export class DataEntryController {
  constructor(private readonly dataEntryService: DataEntryService) {}

  @Post()
  create(@Body() createDataEntryDto: CreateDataEntryDto) {
    return this.dataEntryService.create(createDataEntryDto);
  }

  @Get()
  findAll() {
    return this.dataEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataEntryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataEntryDto: UpdateDataEntryDto) {
    return this.dataEntryService.update(+id, updateDataEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataEntryService.remove(+id);
  }
}
