import { Injectable } from '@nestjs/common';
import { CreateDataEntryDto } from './dto/create-data_entry.dto';
import { UpdateDataEntryDto } from './dto/update-data_entry.dto';

@Injectable()
export class DataEntryService {
  create(createDataEntryDto: CreateDataEntryDto) {
    return 'This action adds a new dataEntry';
  }

  findAll() {
    return `This action returns all dataEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataEntry`;
  }

  update(id: number, updateDataEntryDto: UpdateDataEntryDto) {
    return `This action updates a #${id} dataEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataEntry`;
  }
}
