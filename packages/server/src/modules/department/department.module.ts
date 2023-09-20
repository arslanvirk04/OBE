import { Module , forwardRef} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports:[forwardRef(()=>AuthModule)],
})
export class DepartmentModule {}
