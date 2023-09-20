import { Injectable } from '@nestjs/common';
import { CreateAvailableResourceDto } from './dto/create-available_resource.dto';
import { UpdateAvailableResourceDto } from './dto/update-available_resource.dto';

@Injectable()
export class AvailableResourcesService {
  create(createAvailableResourceDto: CreateAvailableResourceDto) {
    return 'This action adds a new availableResource';
  }

  findAll() {
    return `This action returns all availableResources`;
  }

  findOne(id: number) {
    return `This action returns a #${id} availableResource`;
  }

  update(id: number, updateAvailableResourceDto: UpdateAvailableResourceDto) {
    return `This action updates a #${id} availableResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} availableResource`;
  }
}
