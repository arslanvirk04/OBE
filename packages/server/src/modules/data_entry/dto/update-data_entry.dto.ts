import { PartialType } from '@nestjs/mapped-types';
import { CreateDataEntryDto } from './create-data_entry.dto';

export class UpdateDataEntryDto extends PartialType(CreateDataEntryDto) {}
