const { InlineKeyboard } = require("grammy");
const lang = require("../langs");

const keys = ["food", "water", "poo", "pee"];

const labelDataPairs = keys.map((key) => [lang[key], key]);

const buttonRow = labelDataPairs.map(([label, data]) => InlineKeyboard.text(label, data));
const buttons = InlineKeyboard.from([buttonRow]);

module.exports = buttons;
