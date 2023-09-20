import { UserContextService } from 'src/auth/user-context.service';
import { admin } from 'src/modules/admin/entities/admin.entity';
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

export const models = [
  // Assessment,
  // AvailableResource,
  Curriculum,
  // DataEntry,
  // Examination,
  // Execution,
  FacultyInformation,
  Department,
  Teacher,
  Student,
  LoginToken,
  User,
  admin,
  Course,
  Program,
  Session,
  CurriculumSemester,
  CurriculumSemesterCourse,
  Clo
];
