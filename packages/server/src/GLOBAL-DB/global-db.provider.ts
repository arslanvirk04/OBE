import { TransactionInterceptor } from 'src/database/transaction.interceptor';
import { REPOSITORIES } from 'src/constants/repositories';
import { User } from 'src/modules/user/entities/user.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { Assessment } from 'src/modules/assessment/entities/assessment.entity';
import { LoginToken } from 'src/modules/login-token/entities/login-token.entity';
import { AvailableResource } from 'src/modules/available_resources/entities/available_resource.entity';
import { Curriculum } from 'src/modules/curriculum/entities/curriculum.entity';
import { DataEntry } from 'src/modules/data_entry/entities/data_entry.entity';
import { Examination } from 'src/modules/examination/entities/examination.entity';
import { Execution } from 'src/modules/execution/entities/execution.entity';
import { FacultyInformation } from 'src/modules/faculty_information/entities/faculty_information.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Teacher } from 'src/modules/teacher/entities/teacher.entity';
import { admin } from 'src/modules/admin/entities/admin.entity';
import { Course } from 'src/modules/courses/entities/course.entity';
import { Program } from 'src/modules/programs/entities/program.entity';
import { CurriculumSemester } from 'src/modules/curriculum-semesters/entities/curriculum-semester.entity';
import { CurriculumSemesterCourse } from 'src/modules/curriculum-semester-courses/entities/curriculum-semester-course.entity';
import { Session } from 'src/modules/sessions/entities/session.entity';
import { Clo } from 'src/modules/clo/entities/clo.entity';

export const globalDbProvider = [
  TransactionInterceptor,
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: REPOSITORIES.ADMIN_REPOSITORY,
    useValue: admin,
  },
  {
    provide: REPOSITORIES.LOGIN_TOKEN_REPOSITORY,
    useValue: LoginToken,
  },
  {
    provide: REPOSITORIES.STUDENT_REPOSITORY,
    useValue: Student,
  },
  {
    provide: REPOSITORIES.COURSES_REPOSITORY,
    useValue: Course,
  },
  {
    provide: REPOSITORIES.CURRICULUM_REPOSITORY,
    useValue: Curriculum,
  },
 
  {
    provide: REPOSITORIES.FACULTY_INFORMATION_REPOSITORY,
    useValue: FacultyInformation,
  },
  {
    provide: REPOSITORIES.TEACHER_REPOSITORY,
    useValue: Teacher,
  },
  {
    provide: REPOSITORIES.DEPARTMENT_REPOSITORY,
    useValue: Department,
  },
  {
    provide: REPOSITORIES.PROGRAM_REPOSITORY,
    useValue: Program,
  },
  {
    provide: REPOSITORIES.SESSION_REPOSITORY,
    useValue: Session,
  },
  {
    provide: REPOSITORIES.CURRICULUM_SEMESTER_REPOSITORY,
    useValue: CurriculumSemester,
  },
  {
    provide: REPOSITORIES.CURRICULUM_SEMESTER_COURSES_REPOSITORY,
    useValue: CurriculumSemesterCourse,
  },
  {
    provide: REPOSITORIES.CLO_REPOSITORY,
    useValue: Clo,
  },
];
