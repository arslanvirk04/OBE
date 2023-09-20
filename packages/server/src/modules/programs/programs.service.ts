import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

import { includes } from 'lodash';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';

@Injectable()
export class ProgramsService {
  constructor(private readonly db: GlobalDbService) {}

  create = async (body: any, loggedInUser : any) => {
    const data: any = {
      id: body.id,
      name: body.name,
      semesters : body.semesters
    };
    console.log('data: ', data);
    const program : any = await this.db.save(
      'Program',
      data,
      loggedInUser,
    );
    return program;
  };

  addProgramImportFile  = async (body: any, loggedInUser: any) => {
  
    const result = await this.db.repo.Program.bulkCreate(body);
    console.log('result', result);
    return result;
  };
  findAll = async () => {
    const getAllPrograms = await this.db.repo.Program.findAndCountAll();
    return getAllPrograms;
  };
  findOne = async (id: number) => {
    const getOneProgram = await this.db.repo.Program.findOne({ where: { id } });
    return getOneProgram;
  };
  update = async (id: number) => {
    const updateProgram = await this.db.repo.Program.update({ where: { id } });
    return updateProgram;
  };
  remove = async (id: number) => {
    const removeProgram = await this.db.repo.Program.destroy({ where: { id } });
    return { message: 'Deleted Successfully' };
  };
}
