import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { GlobalDbModule } from './GLOBAL-DB/global-db.module';
import { UserModule } from './modules/user/user.module';
import { StudentModule } from './modules/student/student.module';
import { LoginTokenModule } from './modules/login-token/login-token.module';
import { AssessmentModule } from './modules/assessment/assessment.module';
import { AvailableResourcesModule } from './modules/available_resources/available_resources.module';
import { DataEntryModule } from './modules/data_entry/data_entry.module';
import { ExaminationModule } from './modules/examination/examination.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { ExecutionModule } from './modules/execution/execution.module';
import { FacultyInformationModule } from './modules/faculty_information/faculty_information.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { DepartmentModule } from './modules/department/department.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from './modules/admin/admin.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ImportModule } from './modules/import/import.module';
import { ExportModule } from './modules/export/export.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { CurriculumSemestersModule } from './modules/curriculum-semesters/curriculum-semesters.module';
import { CurriculumSemesterCoursesModule } from './modules/curriculum-semester-courses/curriculum-semester-courses.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CloModule } from './modules/clo/clo.module';
// import { CloModule } from './clo/clo.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '8h' },
    }),

    DatabaseModule,
    AuthModule,
    GlobalDbModule,
    UserModule,
    StudentModule,
    LoginTokenModule,
    AssessmentModule,
    AvailableResourcesModule,
    CurriculumModule,
    DataEntryModule,
    ExaminationModule,
    ExecutionModule,
    FacultyInformationModule,
    TeacherModule,
    DepartmentModule,
    AdminModule,
    CoursesModule,
    SessionsModule,
    ImportModule,
    ExportModule,
    ProgramsModule,
    DashboardModule,
    CurriculumSemestersModule,
    CurriculumSemesterCoursesModule,
    CloModule,
  ],
})
export class AppModule {}
