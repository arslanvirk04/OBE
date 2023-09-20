import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
  HasOne,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from 'src/modules/courses/entities/course.entity';
import { Curriculum } from 'src/modules/curriculum/entities/curriculum.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'programs',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Program extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  semesters: number;
  // @ForeignKey(() => User)
  // @Column({
  //   // allowNull: false,
  //   type: DataType.UUID,
  //   field: 'fkUserId',
  // })
  // userId: string;
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;
  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;
  // @BelongsTo(() => Department, { foreignKey: 'departmentId' })
  // Department: Department;
  // @HasMany(() => Student, { foreignKey: 'programId' })
  // Student: Student;
  // @BelongsTo(() => User, { foreignKey: 'userId' })
  // User: User;
  @HasMany(() => Curriculum, { foreignKey: 'programId' })
  Curriculum : Curriculum;
  @HasMany(() => Course, { foreignKey: 'programId' })
  Course : Course;
}
