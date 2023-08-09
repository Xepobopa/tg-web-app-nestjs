import {Global, Module} from '@nestjs/common';
import {AppService} from './app.service';
import {AppController} from './app.controller';
import {UploadModule} from "../upload/upload.module";
import {ConfigModule} from "@nestjs/config";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        UploadModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
