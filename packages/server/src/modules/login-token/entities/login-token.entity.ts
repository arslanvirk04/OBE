import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'login_tokens',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class LoginToken extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'fkUserId'
  })
  userId: string;

  @Column({
  
    type: DataType.STRING
  })
  token: string;

  @Column({
    type: DataType.DATE
  })
  expiredAt: Date;

  @Column({
    type: DataType.STRING
  })
  userAgent: string;

  @Column({
    type: DataType.STRING
  })
  ip: string;

  @Column({
    type: DataType.DATE
  })
  createdAt: Date;
  
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    field: 'fkUserId'
  })
  createdBy: string;
  
  @Column({
    type: DataType.DATE
  })
  updatedAt: Date;
  
  @BelongsTo(() => User, { foreignKey: 'userId' })
  User: User;
}
