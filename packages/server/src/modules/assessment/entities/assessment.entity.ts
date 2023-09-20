import { PrimaryGeneratedColumn } from 'typeorm'
import { Table, Column, ForeignKey,Model,DataType } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
    tableName: 'assessment',
    timestamps: false,
    paranoid: true,
    scopes: {
      active: { where: { isActive: true } },
    },
  })
export class Assessment extends Model{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    field: 'fkUserId'
  })
  createdBy: string;
  
     
      @Column({
        
        type: DataType.STRING
      })
      assessmentType: string;

      @Column({
    
        type: DataType.STRING
      })
      assessmentTools: string;

      @Column({
      
        type: DataType.BIGINT
      })
      marksDistribution: number;

      @Column({
        type: DataType.STRING
      })
      cloAssessed: string;

      @Column({
        
        type: DataType.STRING
      })
      bloomsCategory: string;

      @Column({
      
        type: DataType.STRING
      })
      subTotal: number



}
