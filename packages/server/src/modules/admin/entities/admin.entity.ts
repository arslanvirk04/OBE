import { Table, Column, ForeignKey,Model,DataType } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'admin',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class admin extends Model {
  @PrimaryGeneratedColumn('uuid')
  id : string;


  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  // @ForeignKey(() => User)
  // @Column({
  //   allowNull: false,
  //   type: DataType.UUID,
  //   field: 'fkUserId',
  // })
  // userId: string;
  @Column({
    allowNull: false,
    unique: false,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  password: bigint;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  confirmPassword: bigint;

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
  
}
