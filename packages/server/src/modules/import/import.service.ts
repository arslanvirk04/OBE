import { Injectable } from '@nestjs/common';
import { UpdateImportDto } from './dto/update-import.dto';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';



@Injectable()
export class ImportService {
  constructor(private readonly db: GlobalDbService) {}

  create = async (body: any, loggedInUser: any) => {
    const addImport = await this.db.save('import', body, loggedInUser);
    return addImport ;
  };

  findAll=async() =>{
    const getAllFiles = await this.db.repo.Import.findAll()
    return getAllFiles;
  }

  findOne=async(id: number)=> {
    const getOneFile = await this.db.repo.Import.findOne({where:{id}})
    return getOneFile;
  }

  update(id: number, updateImportDto: UpdateImportDto) {
    return `This action updates a #${id} import`;
  }

  remove=async(id: number)=> {
    const deleteFile =await this.db.repo.Import.destroy({where:{id}})
    return deleteFile;
  }
}
