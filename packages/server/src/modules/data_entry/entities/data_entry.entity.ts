import { Table, Column, ForeignKey,Model,DataType } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm'
@Table({
    tableName: 'data_entry',
    timestamps: false,
    paranoid: true,
    scopes: {
      active: { where: { isActive: true } },
    },
  })
export class DataEntry extends Model {
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
        type: DataType.BIGINT,
      })
      s_no: number;

      @Column({
        allowNull: false,
        unique: false,
        type: DataType.STRING,
      })
      name: string;

      @Column({
        allowNull: false,
        unique: false,
        type: DataType.STRING,
      })
      department: string;

      @Column({
        allowNull: false,
        unique: false,
        type: DataType.STRING,
      })
      program: string;

      @Column({
        allowNull: false,
        unique: false,
        type: DataType.STRING,
      })
      batch: string;

      @Column({
        allowNull: false,
        unique: false,
        type: DataType.STRING,
      })
      semester: string;

      @Column({
        allowNull: false,
        unique: false,
        type: DataType.STRING,
      })
      course: string;

}
