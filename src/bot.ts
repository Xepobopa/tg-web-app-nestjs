import * as TelegramBot from "node-telegram-bot-api";
import axios from "axios";

export class Bot {
    private bot: TelegramBot;

    constructor() {
        this.bot = new TelegramBot('6523518489:AAETcmrXjayiORhE5Iy3VpE5l6k50sTRTVI', {polling: true});
    }

    async start() {
        await this.bot.setMyCommands([{command: "/add", description: "Добавляет домашнее задание в бота"}]);

        this.bot.on("message", async (message) => {
            const chatId = message.chat.id;
            const text = message.text;

            if (text === "/start") {
                await this.bot.sendMessage(chatId, `Привет, ${message.from.first_name}! 👋\n`);
            }

            if (text === "/add") {
                await this.bot.sendMessage(chatId,
                    `👉 Нажмите на кнопку "Добавить домашнее задание" 💾, что бы добавить фото / описание готового дз в нашего бота! 🤖\n\n` +
                    "❗ Добавленные вами данные будут храниться у нас в чате, так что не удаляйте чат / сообщения!\n" +
                    "❗ Поиск дз подписчиками осуществляется через дату (время загрузки) / назвние предмета / темы дз\n" +
                    "❗ После добавления дз подписчики смогут получить к нему временный доступ.\n", {
                        reply_markup: {
                            keyboard: [
                                [{
                                    text: "Добавить домашнее задание",
                                    web_app: {url: "https://moonlit-starlight-504174.netlify.app/"}
                                },]
                            ],
                        }
                    })
            }

            if (message?.web_app_data?.data) {
                try {
                    const data = JSON.parse(message?.web_app_data?.data);
                    console.log(data);
                    await axios.post('http://localhost:5000/create', data)
                    await this.bot.sendMessage(chatId, "Your data is:");
                    await this.bot.sendMessage(chatId, message?.web_app_data?.data);
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }
}

