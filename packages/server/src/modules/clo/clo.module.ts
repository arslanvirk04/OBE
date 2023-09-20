import { Module, forwardRef } from '@nestjs/common';
import { CloService } from './clo.service';
import { CloController } from './clo.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CloController],
  providers: [CloService], 
   imports:[forwardRef(()=>AuthModule)],

})
export class CloModule {}
