import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from 'src/modules/courses/entities/course.entity';
import { CurriculumSemester } from 'src/modules/curriculum-semesters/entities/curriculum-semester.entity';
import { Curriculum } from 'src/modules/curriculum/entities/curriculum.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'curriculumSemesterCourses',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class CurriculumSemesterCourse extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => CurriculumSemester)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    field: 'fkCurriculumSemesterId',
  })
  curriculumSemesterId: string;

  @ForeignKey(() => Course)
  @Column({
    // allowNull: false,
    type: DataType.UUID,
    field: 'fkCourseId',
  })
  courseId: string;
  
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  createdAt: Date;

  @BelongsTo(() => CurriculumSemester, { foreignKey: 'curriculumSemesterId' })
  CurriculumSemester: CurriculumSemester;

  @BelongsTo(() => Course, { foreignKey: 'courseId' })
  Course: Course;
}
