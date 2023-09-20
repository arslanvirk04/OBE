import { Injectable } from '@nestjs/common';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { GlobalDbService } from 'src/GLOBAL-DB/global-db.service';


@Injectable()
export class CurriculumService {
  constructor(private readonly db: GlobalDbService) {}
  
  create = async (body: any, loggedInUser: any) => {
    const { year, programId, semesters,id } = body;
    const createdAt = new Date();

    const curriculumBody = { year, programId, createdAt ,id};
    console.log("curriculumBody",curriculumBody);
    const curriculum = await this.db.save(
      'Curriculum',
      curriculumBody,
      loggedInUser,
    );
    const destroy = await this.db.repo.CurriculumSemester.destroy({where :{fkCurriculumId : curriculum.id},
      force : true
      })
    for (const row of semesters) {
      const {courses } = row;
      const semesterBody = {
        curriculumId: curriculum.id,
        semester : row.semester ,
        createdAt,
       
        
      };

      console.log("semesterBody",semesterBody);
      console.log("row",row);
      const curriculumSemester = await this.db.save(
        'CurriculumSemester',
        semesterBody,
        loggedInUser,
      );
      for (const courseId of courses) {
        const courseBody = {
          courseId,
          curriculumSemesterId: curriculumSemester.id,
          createdAt,
        };
        const curriculumCourse = await this.db.save(
          'CurriculumSemesterCourse',
          courseBody,
          loggedInUser,
        );
      }
    }
    return curriculum;
  };

  addCurriculumImportFile = async (body: any, loggedInUser: any) => {
    const transformedData = [];
    for (const row of body) {
    const programName = await this.db.repo.Program.findOne({
      where: { name: row.program },
    })
    if ( programName?.id ) {
      const currentTimestamp = new Date();
      transformedData.push({
        ...row,
        programId: programName?.id,
        createdAt: currentTimestamp,
      });
    }
  }
  console.log('transformedData', transformedData);
  const result = await this.db.repo.Curriculum.bulkCreate(transformedData);
  console.log('result', result);
  return result;

  }
  findAll = async () => {
    const getallCurriculum: any = await this.db.repo.Curriculum.findAndCountAll(
      {
        include: [
          {
            model: this.db.repo.Program,
          },
          {
            model: this.db.repo.CurriculumSemester,
            include: [
              {
                model: this.db.repo.CurriculumSemesterCourse,
                include: [
                  {
                    model: this.db.repo.Course,
                  },
                ],
              },
            ],
          },
        ],
      },
    );

    return getallCurriculum;
  };

  findOne = async (id: string) => {
    const getOneCurriculum = await this.db.repo.Curriculum.findOne({
      where: { id },
      include: [
        {
          model: this.db.repo.Program,
        },
        {
          model: this.db.repo.CurriculumSemester,
          include: [
            {
              model: this.db.repo.CurriculumSemesterCourse,
              include: [
                {
                  model: this.db.repo.Course,
                },
              ],  
            },
          ],
        },
      ],
    });
    return getOneCurriculum;
  };

  update(id: number, updateCurriculumDto: UpdateCurriculumDto) {
    return `This action updates a #${id} curriculum`;
  }

  remove = async (id: string) => {
    const deleteOne: any = await this.db.repo.Curriculum.destroy({
      where: { id },
    });
    return deleteOne;
  };
}
