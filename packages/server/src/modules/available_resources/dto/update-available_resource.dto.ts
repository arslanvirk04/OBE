import { PartialType } from '@nestjs/mapped-types';
import { CreateAvailableResourceDto } from './create-available_resource.dto';

export class UpdateAvailableResourceDto extends PartialType(CreateAvailableResourceDto) {}
