import {Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {AppService} from './app.service';
import {FilesInterceptor} from "@nestjs/platform-express";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @UseInterceptors(FilesInterceptor('images'))
    @Post('webData')
    async webData(
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: "image/jpeg"
                })
                .addMaxSizeValidator({
                    maxSize: 2 * 1000 * 1000
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                })
        ) images: Array<Express.Multer.File>) {
        return await this.appService.addImages(images);
    }
}
