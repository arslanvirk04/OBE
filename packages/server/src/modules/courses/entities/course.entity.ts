import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Clo } from 'src/modules/clo/entities/clo.entity';
import { CurriculumSemesterCourse } from 'src/modules/curriculum-semester-courses/entities/curriculum-semester-course.entity';
import { Curriculum } from 'src/modules/curriculum/entities/curriculum.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Program } from 'src/modules/programs/entities/program.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'courses',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Course extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => User)
  @Column({
    // allowNull: false,
    type: DataType.UUID,
    field: 'fkUserId',
  })
  userId: string;

  @ForeignKey(() => Department)
  @Column({
    // allowNull: false,
    type: DataType.UUID,
    field: 'fkDepartmentId',
  })
  departmentId: string;

  @ForeignKey(() => Program)
  @Column({
    // allowNull: false,
    type: DataType.UUID,
    field: 'fkProgramId',
  })
  programId: string;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  courseCode: number;
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  courseTitle: string;
  @Column({
    // allowNull: false,
    type: DataType.STRING,
  })
  actions: string;

  @Column({
    // allowNull: false,
    type: DataType.STRING,
  })
  creditHours: string;

  @Column({
    // allowNull: false,
    type: DataType.STRING,
  })
  Pre_Req: string;

  @Column({
    // allowNull: false,
    type: DataType.STRING,
  })
  courseType: string;

  @Column({
    // allowNull: false,
    type: DataType.STRING,
  })
  courseOutline: string;

  @Column({
    // allowNull: false,
    type: DataType.STRING,
  })
  reference_Book: string;

  @Column({
    // allowNull: false,
    type: DataType.STRING,
  })
  curriculum: string;


  @Column({
    // allowNull: false,
    type: DataType.STRING,
  })
  token: string;
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;
  @Column({
    type: DataType.DATE,
  })
  expiredAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsTo(() => Department, { foreignKey: 'departmentId' })
  Department: Department;
  @BelongsTo(() => Program, { foreignKey: 'programId' })
  Program: Program;
  @HasMany(() => CurriculumSemesterCourse, { foreignKey: 'courseId' })
  CurriculumSemesterCourse: CurriculumSemesterCourse;
  @HasMany(() => Clo, { foreignKey: 'courseId' })
  Clo: Clo;
}
