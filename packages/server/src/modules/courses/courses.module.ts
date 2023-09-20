import { Module,forwardRef } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports:[forwardRef(()=>AuthModule)],
})
export class CoursesModule {}
