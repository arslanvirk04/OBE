import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
  BelongsTo,
  Unique,
} from 'sequelize-typescript';
import { Department } from 'src/modules/department/entities/department.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
@Table({
  tableName: 'student',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Student extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: DataType.STRING,
  })
  registrationNo: string;

  @Column({
    type: DataType.STRING,
  })
  program: string;

  @Column({
    type: DataType.STRING,
  })
  session: string;

  @Column({
    type: DataType.STRING,
  })
  isActive: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    field: 'fkUserId',
  })
  userId: string;
  
  @ForeignKey(() => Department)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    field: 'fkDepartmentId',
  })
  departmentId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'fkUserId',
  })
  createdBy: string;

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

  @BelongsTo(() => User, { foreignKey: 'userId' })
  User: User;
  @BelongsTo(() => Department, { foreignKey: 'departmentId' })
  Department: Department;
}
