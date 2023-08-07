import * as TelegramBot from "node-telegram-bot-api";

async function bootstrap() {
    // const app = await NestFactory.create(AppModule);
    // await app.listen(5000);

    const bot = new TelegramBot('6523518489:AAETcmrXjayiORhE5Iy3VpE5l6k50sTRTVI', {polling: true});

    await bot.setMyCommands([{command: "/add", description: "Добавляет домашнее задание в бота"}]);

    bot.on("message", async (message) => {
        const chatId = message.chat.id;
        const text = message.text;

        if (text === "/start") {
            await bot.sendMessage(chatId, `Привет, ${message.from.first_name}! 👋\n`, {
                // reply_markup: {
                //     keyboard: [
                //         [{text: "/add - Добавляет домашнее задание в бота"}],
                //     ],
                //     one_time_keyboard: true,
                //     resize_keyboard: true,
                // }
            })
        }

        if (message?.web_app_data?.data) {
            const data = JSON.parse(message?.web_app_data?.data);
            console.log(data);
        }
    });

    bot.on("message", async (message) => {
        const chatId = message.chat.id;
        const text = message.text;

        if (text === "/add") {
            await bot.sendMessage(chatId,
            `👉 Нажмите на кнопку "Добавить домашнее задание" 💾, что бы добавить фото / описание готового дз в нашего бота! 🤖\n\n`+
                "❗ Добавленные вами данные будут храниться у нас в чате, так что не удаляйте чат / сообщения!\n"+
                "❗ Поиск дз подписчиками осуществляется через дату (время загрузки) / назвние предмета / темы дз\n"+
                "❗ После добавления дз подписчики смогут получить к нему временный доступ.\n", {
                reply_markup: {
                    inline_keyboard:  [
                        [{ text: "Добавить домашнее задание", web_app: { url: "https://moonlit-starlight-504174.netlify.app/" }}]
                    ],
                }
            })
        }
    })
}

bootstrap();
