import { Table, Column, ForeignKey,Model,DataType } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'examination',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Examination extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  courseCode: string;
  @Column({
    allowNull: false,
    unique: false,
    type: DataType.STRING,
  })
  courseComponent: string;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.BIGINT,
  })
  curriculumContent: number;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.BIGINT,
  })
  contactHours: number;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.BIGINT,
  })
  NoCredits: number;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.STRING,
  })
  peos: string;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.STRING,
  })
  po: string;
}
