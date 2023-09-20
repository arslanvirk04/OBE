import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';


@Injectable()
export class AdminService {
  constructor(private readonly db: GlobalDbService) {}

  login = async (body) => {

    const admin: any = await this.db.repo.admin.create(body);

    return admin;
  };

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll = async (body: any) => {
    const getAll: any = await this.db.repo.admin.findAll(body);
    return getAll;
  };

  findOne = async (id: string) => {
    const getOne: any = await this.db.repo.admin.findOne({ where: { id } });
    return getOne;
  };

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove = async (id: string) => {
    const deleteOne: any = await this.db.repo.admin.destroy({ where: { id } });
    return deleteOne;
  };
}
