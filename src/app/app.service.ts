import {Injectable} from '@nestjs/common';
import {UploadService} from "../upload/upload.service";

@Injectable()
export class AppService {
    constructor(private readonly uploadService: UploadService) {
    }

    async addImages(images: Array<Express.Multer.File>) {
        const URLs = [];
        for (const image of images) {
            URLs.push(await this.uploadService.uploadImage(image.originalname, image.buffer));
        }
        return URLs;
    }
}
