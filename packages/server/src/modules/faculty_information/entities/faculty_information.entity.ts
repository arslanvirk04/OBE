import { Table, Column, ForeignKey,Model,DataType, HasOne } from 'sequelize-typescript';
import { Department } from 'src/modules/department/entities/department.entity';
import { Teacher } from 'src/modules/teacher/entities/teacher.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'faculty',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class FacultyInformation extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ForeignKey(() => Teacher)
    @Column({
      type: DataType.UUID,
      field: 'fkTeaId'
    })
    fkTeacherId: string;
  @ForeignKey(() => Department)
    @Column({
      type: DataType.UUID,
      field: 'fkdeptId'
    })
    fkdeptId: string;

    @ForeignKey(() => User)
    @Column({
      allowNull: false,
      type: DataType.UUID,
      field: 'fkUserId',
    })
    createdBy: string;
    
  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  createdAt: Date;
  @Column({
   
    type: DataType.DATE
  })
  updatedAt: Date;
  @Column({
    
    type: DataType.DATE
  })
  deletedAt: Date
  // @HasOne(()=> Teacher)
  
}

