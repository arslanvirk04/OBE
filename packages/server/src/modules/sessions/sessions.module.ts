import { Module ,forwardRef} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService],
  imports:[forwardRef(()=>AuthModule)],
})
export class SessionsModule {}
