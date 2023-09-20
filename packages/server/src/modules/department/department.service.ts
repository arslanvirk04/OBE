import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly db: GlobalDbService) {}
  create = async (body: any, loggedInUser: any) => {
    const data: any = {
      id: body.id,
      name: body.name,
    };
    console.log('data: ', data);
    const deptData: any = await this.db.save('Department', data, loggedInUser);
    return deptData;
  };

  addDepartmentImportFile = async (body: any, loggedInUser: any) => {
    console.log("body" , body);
    if(!body)
    {
    const result = await this.db.repo.Department.bulkCreate(body);
    console.log('result', result);
    return result;
    }
  };

  findAll = async () => {
    const departments: any = await this.db.repo.Department.findAndCountAll();
    return departments;
  };
  findOne = async (id: string) => {
    const getOne: any = await this.db.repo.Department.findOne({
      where: { id },
    });
    return getOne;
  };
  update = async (id: string) => {
    const updateDept: any = await this.db.repo.Department.update({
      where: { id },
    });
    return `This action updates a #${id} department`;
  };
  remove = async (id: string) => {
    const removeDepartment = await this.db.repo.Department.destroy({
      where: { id },
    });
    return removeDepartment;
  };
}
