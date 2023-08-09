import { PartialType } from '@nestjs/mapped-types';
import { WebDataDto } from './web-data.dto';

export class UpdateAppDto extends PartialType(WebDataDto) {}
