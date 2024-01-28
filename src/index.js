const config = require("../config");
const lang = require("../langs");
const Bot = require("./bot");
const buttons = require("./buttons");
const errorHandler = require("./error-handler");
const notify = require("./notify");
const { getStats, addStat } = require("./stats");

const bot = Bot(config.botToken);
const usersIds = [];
const userNames = {};

for (const [userName, userId] of Object.entries(config.users)) {
    userNames[userId] = userName;
    usersIds.push(userId);
}

const securityMiddleware = (ctx, next) => {
    if (usersIds.includes(ctx.chat?.id)) {
        next();
    }
};

bot.use(securityMiddleware);

bot.command("start", (ctx) => {
    ctx.reply(lang.menu, { reply_markup: buttons }).catch(errorHandler("onStart"));
});

bot.command("stats", (ctx) => {
    ctx.reply(getStats()).catch(errorHandler("getStats"));
});

bot.on("callback_query", (ctx) => {
    const userName = userNames[ctx.chat?.id];
    if (!userName) return;

    const command = ctx.callbackQuery?.data;
    if (!command) return;

    const msg = `${new Date().toLocaleTimeString().slice(0, -3)} ${lang[command]}`;

    addStat(userName, command);

    ctx.answerCallbackQuery().catch(errorHandler("onAnswerCb"));
    notify(bot, usersIds, msg).catch(errorHandler("onNotify"));
});

bot.on("message", (ctx) => {
    const msg = ctx.message?.text;
    if (!msg) return;

    ctx.deleteMessage().catch(errorHandler("onMsgDel"));
    notify(bot, usersIds, msg).catch(errorHandler("onCustomMsg"));
});

bot.start({ allowed_updates: ["message", "callback_query"] });

console.log("Bot started");
