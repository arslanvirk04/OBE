import { Module, forwardRef } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [CurriculumController],
  providers: [CurriculumService],
  imports:[forwardRef(()=>AuthModule)],
})
export class CurriculumModule {}
