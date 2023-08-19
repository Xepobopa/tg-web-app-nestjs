import {Subject} from "../enum/subject.enum";
import {IsArray, IsDate, IsEnum, IsString} from "class-validator";
import {AbstractDto} from "./abstract.dto";

export class HomeworkDto extends AbstractDto{
    @IsString()
    title: string;

    @IsString()
    @IsEnum(Subject)
    subject: Subject

    @IsDate()
    date: Date;

    @IsArray()
    files: Array<string>
}