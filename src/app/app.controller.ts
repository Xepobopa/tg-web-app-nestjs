import {
    Body,
    Controller,
    Get,
    HttpStatus,
    ParseFilePipeBuilder,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {AppService} from './app.service';
import {FilesInterceptor} from "@nestjs/platform-express";
import {HomeworkQueryDto} from "./dto/homework-query.dto";
import {CreateHomeworkDto} from "./dto/create-homework.dto";

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
        console.log(images);
        return await this.appService.addImages(images);
    }

    @Get()
    async home(){
        return "It Works!"
    }

    @Get('get')
    async getHomeworkByQuery(@Query() query: HomeworkQueryDto) {
        console.log("creating...")
        return await this.appService.getHomeworkByQuery(query);
    }

    @Post('create')
    async createHomework(@Body() hw: CreateHomeworkDto) {
        console.log(hw);
    }
}
