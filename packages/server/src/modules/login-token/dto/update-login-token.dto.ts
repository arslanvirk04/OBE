import { PartialType } from '@nestjs/mapped-types';
import { CreateLoginTokenDto } from './create-login-token.dto';

export class UpdateLoginTokenDto extends PartialType(CreateLoginTokenDto) {}
