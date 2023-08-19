import {AbstractEntity} from "./abstract.entity";
import {Column, Entity} from "typeorm";
import {Subject} from "../enum/subject.enum";

@Entity({name: 'homework'})
export class HomeworkEntity extends AbstractEntity {
    @Column()
    title: string;

    @Column({ enum: Subject })
    subject: Subject;

    @Column()
    date: Date

    @Column('simple-array', {nullable: true, array: true, default: []})
    files: Array<string>;
}