import { Module, forwardRef } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProgramsController],
  providers: [ProgramsService],
  imports:[forwardRef(()=>AuthModule)],
})
export class ProgramsModule {}
