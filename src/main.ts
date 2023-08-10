import {AppModule} from "./app/app.module";
import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";
import {Bot} from "./bot";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const server = await app.listen(5000);
    console.log(await app.getUrl());
    const eduCompanion: Bot = new Bot();

    //app.enableCors({ origin: '*' });
    app.useGlobalPipes(new ValidationPipe());

    const router = server._events.request._router;
    const availableRoutes: [] = router.stack
        .map(layer => {
            if (layer.route) {
                return {
                    route: {
                        path: layer.route?.path,
                        method: layer.route?.stack[0].method
                    }
                };
            }
        })
        .filter(item => item !== undefined);
    console.log(availableRoutes);

    await eduCompanion.start();
}

bootstrap();
