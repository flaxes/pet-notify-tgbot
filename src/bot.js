const { Bot } = require("grammy");

module.exports = (botToken) => {
    const bot = new Bot(botToken);

    return bot;
};
