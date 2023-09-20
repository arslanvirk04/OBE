import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from 'src/modules/courses/entities/course.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'clo',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Clo extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  code: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  objective: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => Course)
  @Column({
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
  createdAt: Date;
  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;

  @BelongsTo(() => Course, { foreignKey: 'courseId' })
  Course: Course;
}
