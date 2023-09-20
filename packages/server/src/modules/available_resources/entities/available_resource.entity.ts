import { PrimaryGeneratedColumn } from 'typeorm'
import { Table, Column, ForeignKey,Model,DataType } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
    tableName: 'available_resources',
    timestamps: false,
    paranoid: true,
    scopes: {
      active: { where: { isActive: true } },
    },
  })
export class AvailableResource {
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
      course: string;
      @Column({
        allowNull: false,
        unique: false,
        type: DataType.BIGINT,
      })
      studentCount: number;

      @Column({
        allowNull: false,
        unique: false,
        type: DataType.BIGINT,
      })
      classRoomCapacity: number;

      @Column({
        allowNull: false,
        unique: false,
        type: DataType.BIGINT,
      })
      whiteboard: number;

      @Column({
        allowNull: false,
        unique: false,
        type: DataType.BIGINT,
      })
      projector: number;

      @Column({
        allowNull: false,
        unique: false,
        type: DataType.BIGINT,
      })
      labInformation: number;


}
