import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CurriculumSemester } from 'src/modules/curriculum-semesters/entities/curriculum-semester.entity';
import { Program } from 'src/modules/programs/entities/program.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

@Table({
  tableName: 'curriculum',
  timestamps: false,
  paranoid: true,
  scopes: {
    active: { where: { isActive: true } },
  },
})
export class Curriculum extends Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({
    allowNull: false,
    unique: false,
    type: DataType.INTEGER,
  })
  year: number;

  @ForeignKey(() => Program)
  @Column({
    // allowNull: false,
    type: DataType.UUID,
    field: 'fkProgramId',
  })
  programId: string;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  createdAt: Date;

  @HasMany(() => CurriculumSemester, { foreignKey: 'curriculumId' })
  CurriculumSemester: CurriculumSemester;

  @BelongsTo(() => Program, { foreignKey: 'programId' })
  Program: Program;
}
