import { Injectable } from '@nestjs/common';
import { CreateFacultyInformationDto } from './dto/create-faculty_information.dto';
import { UpdateFacultyInformationDto } from './dto/update-faculty_information.dto';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';


@Injectable()
export class FacultyInformationService {
  constructor(private readonly db : GlobalDbService){}

  create = async(body: any)=> {
    const addFaculty : any = await this.db.repo.Faculty.create(body);
    return addFaculty;
  }

  findAll = async(body:any)=> { 
    const getAllFaculty : any = await this.db.repo.Faculty.findAll(body);
    return getAllFaculty;
  }

  findOne = async(id: string) =>{
     const getOne : any = await this.db.repo.Faculty.findOne({where :{id}});
    return getOne;
  }

  update(id: number, updateFacultyInformationDto: UpdateFacultyInformationDto) {
    return `This action updates a #${id} facultyInformation`;
  }

  remove= async(id: string)=> {
    const deleteOne : any = await this.db.repo.Faculty.destroy({where :{id}})
    return deleteOne;
  }
}
