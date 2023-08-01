import {NestFactory} from '@nestjs/core';
import * as TelegramBot from "node-telegram-bot-api";

async function bootstrap() {
    // const app = await NestFactory.create(AppModule);
    // await app.listen(5000);

    const bot = new TelegramBot('6523518489:AAETcmrXjayiORhE5Iy3VpE5l6k50sTRTVI', {polling: true});

    await bot.setMyCommands([{command: "/test", description: "test"}]);

    bot.on("message", async (message) => {
        const chatId = message.chat.id;
        const text = message.text;

        if (text === "/test") {
            await bot.sendMessage(chatId, "test", {
                reply_markup: {
                    keyboard:  [
                        [{ text: "test", web_app: { url: "https://moonlit-starlight-504174.netlify.app/" } }]
                    ]
                }
            })
        }
    })
}

bootstrap();
