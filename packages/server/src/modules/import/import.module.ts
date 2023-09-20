import { Module, forwardRef } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ImportController],
  providers: [ImportService],
  imports:[forwardRef(()=>AuthModule)],
})
export class ImportModule {}
