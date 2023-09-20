import { Injectable } from '@nestjs/common';
import { CreateCurriculumSemesterDto } from './dto/create-curriculum-semester.dto';
import { UpdateCurriculumSemesterDto } from './dto/update-curriculum-semester.dto';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';


@Injectable()
export class CurriculumSemestersService {
  constructor(private readonly db: GlobalDbService) {}

  create = async (body: any) => {
    const addSemester: any = await this.db.repo.CurriculumSemester.create(body);
    return addSemester;
  };
  findAll = async () => {
    const semesterData: any =
      await this.db.repo.CurriculumSemester.findAndCountAll();
    return semesterData;
  };

  findOne = async (id: string) => {
    const getOneSemester: any = await this.db.repo.CurriculumSemester.findOne({
      where: { id },
    });
    return getOneSemester;
  };

  update = async (id: string) => {
    const updateSemester: any = await this.db.repo.CurriculumSemester.update({
      where: { id },
    });
    return updateSemester;
  };

  remove = async (id: string) => {
    const removeSemester: any = await this.db.repo.CurriculumSemester.destroy({
      where: { id },
    });
    return removeSemester;
  };
}
