import {PartialType, PickType} from "@nestjs/mapped-types";
import {HomeworkDto} from "./homework.dto";

export class HomeworkQueryDto extends PartialType(PickType(HomeworkDto, ['subject', 'title', 'date'] as const)) {}