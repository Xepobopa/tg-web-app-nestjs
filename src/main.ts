import {AppModule} from "./app/app.module";
import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";
import {Bot} from "./bot";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const server = await app.listen(5000);
    const eduCompanion: Bot = new Bot();

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    const router = server._events.request._router;
    const availableRoutes: { route: { path: string; method: string } }[] = router.stack
        .map((layer: Layer) => {
            if (layer.route) {
                return {
                    route: {
                        path: layer.route.path,
                        method: layer.route.stack[0].method
                    }
                };
            }
        })
        .filter(item => item !== undefined) as any; // You might need to use 'as any' here to handle filter resultv
    console.log(availableRoutes);

    await eduCompanion.start();
    console.log(await app.getUrl());
}

bootstrap();
