import {Global, Module} from '@nestjs/common';
import {AppService} from './app.service';
import {AppController} from './app.controller';
import {UploadModule} from "../upload/upload.module";
import {ConfigModule} from "@nestjs/config";
import {typeOrmAsyncConfig} from "../config/typeorm.config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {HomeworkEntity} from "./entities/homework.entity";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        TypeOrmModule.forFeature([HomeworkEntity]),
        ConfigModule.forRoot({ isGlobal: true }),
        UploadModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
