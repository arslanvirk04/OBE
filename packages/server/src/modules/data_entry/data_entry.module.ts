import { Module } from '@nestjs/common';
import { DataEntryService } from './data_entry.service';
import { DataEntryController } from './data_entry.controller';

@Module({
  controllers: [DataEntryController],
  providers: [DataEntryService]
})
export class DataEntryModule {}
