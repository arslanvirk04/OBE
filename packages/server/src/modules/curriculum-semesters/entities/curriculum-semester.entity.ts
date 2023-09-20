import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { CurriculumSemesterCourse } from 'src/modules/curriculum-semester-courses/entities/curriculum-semester-course.entity';
import { Curriculum } from 'src/modules/curriculum/entities/curriculum.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'curriculumSemesters',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class CurriculumSemester extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => Curriculum)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    field: 'fkCurriculumId',
  })
  curriculumId: string;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.INTEGER,
  })
  semester: number;

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

  @HasMany(()=> CurriculumSemesterCourse, {foreignKey :'curriculumSemesterId'})
  CurriculumSemesterCourse : CurriculumSemesterCourse

  @BelongsTo(() => Curriculum, { foreignKey: 'curriculumId' })
  Curriculum: Curriculum;
}

