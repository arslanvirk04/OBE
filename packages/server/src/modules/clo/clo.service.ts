import { Injectable } from '@nestjs/common';
import { CreateCloDto } from './dto/create-clo.dto';
import { UpdateCloDto } from './dto/update-clo.dto';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';

@Injectable()
export class CloService {
  constructor(private readonly db: GlobalDbService) {}
  create(createCloDto: CreateCloDto) {
    return 'This action adds a new clo';
  }

  // findAll=async()=> {
  //   const getAllClos = await this.db.repo.Clo.findAndCountAll({
  //     include: [
  //       {
  //         model: this.db.repo.Course,
  //       }
  //     ]
  //   }) 
  //   return `This action returns all clo`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} clo`;
  }

  update(id: number, updateCloDto: UpdateCloDto) {
    return `This action updates a #${id} clo`;
  }

  remove(id: number) {
    return `This action removes a #${id} clo`;
  }
}
