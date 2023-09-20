import { Table, Column, ForeignKey,Model,DataType } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
@Table({
  tableName: 'execution',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Execution extends Model {
  @PrimaryGeneratedColumn('uuid')
  id : string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    field: 'fkUserId',
  })
  createdBy: string;
  @Column({
    allowNull: false,
    unique: false,
    type: DataType.STRING,
  })
  week: string;
  @Column({
    allowNull: false,
    unique: false,
    type: DataType.STRING,
  })
  courseComponent: string;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.STRING,
  })
  topic: string;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.STRING,
  })
  teacherLearningStrategy: string;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.STRING,
  })
  assessmentStrategy: string;
  
  @Column({
    allowNull: false,
    unique: false,
    type: DataType.STRING,
  })
  correspondingClos: string;
}
