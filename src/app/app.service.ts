import {Injectable} from '@nestjs/common';
import {UploadService} from "../upload/upload.service";
import {HomeworkQueryDto} from "./dto/homework-query.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {HomeworkEntity} from "./entities/homework.entity";
import {Repository} from "typeorm";

@Injectable()
export class AppService {
    constructor(
        private readonly uploadService: UploadService,
        @InjectRepository(HomeworkEntity) private homeworkRepository: Repository<HomeworkEntity>,
        ) {
    }

    async addImages(images: Array<Express.Multer.File>) {
        const URLs = [];
        for (const image of images) {
            URLs.push(await this.uploadService.uploadImage(image.originalname, image.buffer));
        }
        return URLs;
    }

    async getHomeworkByQuery(query: HomeworkQueryDto) {
        return await this.homeworkRepository.findBy(query);
    }
}
