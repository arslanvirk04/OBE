import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Department } from 'src/modules/department/entities/department.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
@Table({
  tableName: 'teacher',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Teacher extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    // allowNull: false,
    type: DataType.UUID,
    field: 'createdBy',
  })
  createdBy: string;

  @Column({
    type: DataType.STRING,
  })
  designation: string;

  @Column({    
   
    type: DataType.STRING,
  })
  areaOfSpecialization: string;

  @Column({
    type: DataType.DATE,
  })
  joiningDate: Date;

  @Column({
    type: DataType.STRING,
  })
  experience: string;

  @Column({
    type: DataType.STRING,
  })
  coursesOffering: string;

  @Column({
    type: DataType.STRING,
  })
  teachingPlan: string;

  @Column({
    // allowNull: false,
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
