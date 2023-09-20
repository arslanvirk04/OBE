import { Table, Column, ForeignKey,Model,DataType, HasMany, HasOne } from 'sequelize-typescript';
import { LoginToken } from 'src/modules/login-token/entities/login-token.entity';
import { Program } from 'src/modules/programs/entities/program.entity';
import { Session } from 'src/modules/sessions/entities/session.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { Teacher } from 'src/modules/teacher/entities/teacher.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'users',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class User extends Model {
  @PrimaryGeneratedColumn('uuid')
  id : string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.BIGINT,
  })
  contactNo: bigint;

  @Column({
    type: DataType.DATE,
  })
  dob: Date;

  @Column({

    type: DataType.STRING,
  })
  gender: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;
  @Column({
    type: DataType.STRING,
  })
  city: string;

  @Column({
    type: DataType.STRING,
  })

  physicalAddress: string;

  @Column({
    allowNull: false,
    defaultValue: new Date(),
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
  
  @HasMany(() => Student, { foreignKey: 'userId', as: 'Student' })
  Student: Student;
  @HasOne(() => Teacher, { foreignKey: 'userId' , as: 'Teacher'})
  Teacher: Teacher;
  @HasMany(() => LoginToken, { foreignKey: 'userId' , as: 'LoginToken'})
  LoginToken: LoginToken;
  // @HasMany(() => Program, { foreignKey: 'userId' , as: 'programId'})
  // Program: Program;
  // @HasMany(() => Session, { foreignKey: 'userId' , as: 'sessionId'})
  // Session: Session;
}
