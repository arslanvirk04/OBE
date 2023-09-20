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
import { Student } from 'src/modules/student/entities/student.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'sessions',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Session extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

//   @ForeignKey(() => User)
//   @Column({
//     // allowNull: false,
//     type: DataType.UUID,
//     field: 'fkUserId',
//   })
//   userId: string;
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;
  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;
//   @HasMany(() => Student, { foreignKey: 'sessionId' })
//   Student: Student;
//   @BelongsTo(() => User, { foreignKey: 'userId' })
//   User: User;
}
