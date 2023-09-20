import { Module } from '@nestjs/common';
import { AvailableResourcesService } from './available_resources.service';
import { AvailableResourcesController } from './available_resources.controller';

@Module({
  controllers: [AvailableResourcesController],
  providers: [AvailableResourcesService]
})
export class AvailableResourcesModule {}
