import { Module, forwardRef } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
  imports:[forwardRef(()=>AuthModule)],
})
export class TeacherModule {}
