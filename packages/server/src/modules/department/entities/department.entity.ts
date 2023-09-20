import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Course } from 'src/modules/courses/entities/course.entity';
import { Program } from 'src/modules/programs/entities/program.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'department',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Department extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  name: string;

  // @ForeignKey(() => User)
  // @Column({
  //   // allowNull: false,
  //   type: DataType.UUID,
  //   field: 'fkUserId'
  // })
  // createdBy: string;

  // @ForeignKey(() => User)
  // @Column({
  //   type: DataType.UUID,
  //   field: 'fkUserId'
  // })
  // userId: string;

  @Column({
    type: DataType.DATE
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATE
  })
  deletedAt: Date;

  
  @HasMany(() => Student, { foreignKey: 'departmentId' })
  Student: Student;
  @HasMany(() => Course, { foreignKey: 'departmentId' })
  Course: Course;
 
}
