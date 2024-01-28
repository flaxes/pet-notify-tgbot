/**
 *
 * @param {import('grammy').Bot} bot
 * @param {number[]} users
 * @param {string} message
 */
module.exports = async (bot, users, message) => {
    const promises = users.map((id) => bot.api.sendMessage(id, message));

    const result = await Promise.allSettled(promises);

    return result;
};
