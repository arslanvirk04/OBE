import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';

@Injectable()
export class SessionsService {
  constructor(private readonly db: GlobalDbService) {}

  create = async (body: any, loggedInUser: any) => {
    const data: any = {
      id: body.id,
      name: body.name,
    };
    console.log('repo', this.db.repo);

    const addSession: any = this.db.save('Session', data, loggedInUser);
    return addSession;
  };

  addImportFileSession = async (body: any) => {
    console.log('body', body);
    if (!body) {
      const result = await this.db.repo.Session.bulkCreate(body);
      console.log('result', result);
      return result;
    }
  };

  findAll = async () => {
    const getAll: any = await this.db.repo.Session.findAndCountAll();
    return getAll;
  };
  findOne = async (id: string) => {
    const getOne: any = this.db.repo.Session.findOne({ where: { id } });
    return getOne;
  };
  update = async (id: string) => {
    const updateOne: any = this.db.repo.Session.update({ where: { id } });
    return updateOne;
  };
  remove = async (id: string) => {
    const deleteOne: any = this.db.repo.Session.destroy({ where: { id } });
    return deleteOne;
  };
}
