import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { REPOSITORIES } from 'src/constants/repositories';
import { UNIQUE_KEY_VIOLATION } from 'src/core/constants';
import { Assessment } from 'src/modules/assessment/entities/assessment.entity';
import { AvailableResource } from 'src/modules/available_resources/entities/available_resource.entity';
import { Clo } from 'src/modules/clo/entities/clo.entity';
import { Course } from 'src/modules/courses/entities/course.entity';
import { CurriculumSemesterCourse } from 'src/modules/curriculum-semester-courses/entities/curriculum-semester-course.entity';
import { CurriculumSemester } from 'src/modules/curriculum-semesters/entities/curriculum-semester.entity';
import { Curriculum } from 'src/modules/curriculum/entities/curriculum.entity';
import { DataEntry } from 'src/modules/data_entry/entities/data_entry.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Examination } from 'src/modules/examination/entities/examination.entity';
import { Execution } from 'src/modules/execution/entities/execution.entity';
import { FacultyInformation } from 'src/modules/faculty_information/entities/faculty_information.entity';
import { LoginToken } from 'src/modules/login-token/entities/login-token.entity';
import { Program } from 'src/modules/programs/entities/program.entity';
import { Session } from 'src/modules/sessions/entities/session.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { Teacher } from 'src/modules/teacher/entities/teacher.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class GlobalDbService {
  private logger = new Logger('GlobalDbService');
  public repo: any = {};
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepo: typeof User,
    @Inject(REPOSITORIES.LOGIN_TOKEN_REPOSITORY)
    private readonly login_tokenRepo: typeof LoginToken,
    @Inject(REPOSITORIES.STUDENT_REPOSITORY)
    private readonly studentRepo: typeof Student,
    @Inject(REPOSITORIES.CURRICULUM_REPOSITORY)
    private readonly curriculumRepo: typeof Curriculum,
    @Inject(REPOSITORIES.FACULTY_INFORMATION_REPOSITORY)
    private readonly faculty_informationRepo: typeof FacultyInformation,
    @Inject(REPOSITORIES.TEACHER_REPOSITORY)
    private readonly teacherRepo: typeof Teacher,
    @Inject(REPOSITORIES.DEPARTMENT_REPOSITORY)
    private readonly departmentRepo: typeof Department,
    @Inject(REPOSITORIES.PROGRAM_REPOSITORY)
    private readonly programRepo: typeof Program,
    @Inject(REPOSITORIES.SESSION_REPOSITORY)
    private readonly sessionRepo: typeof Session,
    @Inject(REPOSITORIES.COURSES_REPOSITORY)
    private readonly courseRepo: typeof Course,
    @Inject(REPOSITORIES.CURRICULUM_SEMESTER_REPOSITORY)
    private readonly curriculumSemesterRepo: typeof CurriculumSemester,
    @Inject(REPOSITORIES.CURRICULUM_SEMESTER_COURSES_REPOSITORY)
    private readonly curriculumSemesterCoursesRepo: typeof CurriculumSemesterCourse,
    @Inject(REPOSITORIES.CLO_REPOSITORY)
    private readonly cloRepo: typeof Clo,
  ) {
    this.repo['User'] = this.userRepo;
    this.repo['LoginToken'] = this.login_tokenRepo;
    this.repo['Student'] = this.studentRepo;
    // this.repo['Assessment'] = this.assessmentRepo;
    // this.repo['AvailableResources'] = this.availableResourcesRepo;
    this.repo['Curriculum'] = this.curriculumRepo;
    // this.repo['DataEntry'] = this.dataEntryRepo;
    // this.repo['Examination'] = this.examinationRepo;
    // this.repo['Execution'] = this.executionRepo;
    this.repo['FacultyInformation'] = this.faculty_informationRepo;
    this.repo['Teacher'] = this.teacherRepo;
    this.repo['Department'] = this.departmentRepo;
    this.repo['Program'] = this.programRepo;
    this.repo['Session'] = this.sessionRepo;
    this.repo['Course'] = this.courseRepo;
    this.repo['CurriculumSemester'] = this.curriculumSemesterRepo;
    this.repo['CurriculumSemesterCourse'] = this.curriculumSemesterCoursesRepo;
    this.repo['Clo'] = this.cloRepo;

  }

  async getOne(model: string, params: any) {
    const filter = params;
    const result = await this.repo[model].findOne({ where: filter });
    return result;
  }

  async getAll(model: string, params: any) {
    const filter = params;
    return await this.repo[model].findAndCountAll({ where: filter });
  }

  async save(
    model: string,
    dto: any,
    loggedInUser: any,
    transaction: Transaction = null,
  ) {
    if (transaction) {
      try {
        const { id } = dto;
        if (id) {
          // Update
          dto.updatedBy = loggedInUser.user.id;
          await this.repo[model].update(dto, {
            where: { id },
            transaction,
          });
          return await this.repo[model].findOne({ where: { id } });
        } else {
          // Create
          dto.createdBy = loggedInUser.user.id;
          return await this.repo[model].create(dto, { transaction });
        }
      } catch (e) {
        this.logger.error('Error while saving ', e);
        if (e.parent.code === UNIQUE_KEY_VIOLATION) {
          throw e;
        } else {
          throw new InternalServerErrorException();
        }
      }
    } else {
      try {
        const { id } = dto;
        if (id) {
          // Update
          dto.updatedBy = loggedInUser.user.id;
          await this.repo[model].update(dto, {
            where: { id },
          });
          return await this.repo[model].findOne({ where: { id } });
        } else {
          // Create
          dto.createdBy = loggedInUser.user.id;
          return await this.repo[model].create(dto);
        }
      } catch (e) {
        this.logger.error('Error while saving ', e);
        if (e.parent.code === UNIQUE_KEY_VIOLATION) {
          throw e;
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
  }

  async delete(
    model: string,
    filter: any,
    loggedInUser: any = false,
    transaction: Transaction = null,
  ) {
    if (transaction) {
      try {
        if (loggedInUser) {
          this.repo[model].destroy({ where: filter, transaction });
          const dto = {
            updatedBy: loggedInUser.user.id,
          };
          await this.repo[model].update(dto, { where: filter, transaction });
        }
        return await this.repo[model].destroy({ where: filter, transaction });
      } catch (e) {
        this.logger.error('Error while deleting ', e);
        throw new InternalServerErrorException();
      }
    } else {
      try {
        if (loggedInUser) {
          this.repo[model].destroy({ where: filter });
          const dto = {
            updatedBy: loggedInUser.user.id,
          };
          await this.repo[model].update(dto, { where: filter });
        }
        return await this.repo[model].destroy({ where: filter });
      } catch (e) {
        this.logger.error('Error while deleting ', e);
        throw new InternalServerErrorException();
      }
    }
  }
}
