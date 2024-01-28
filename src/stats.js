const fs = require("fs");
const { statsStorage } = require("../config");
const lang = require("../langs");

const stats = fs.existsSync(statsStorage) ? JSON.parse(fs.readFileSync(statsStorage, { encoding: "utf-8" })) : {};

module.exports.getStats = () => {
    const txts = [];

    for (const user in stats) {
        let txt = `${user}:\n`;

        for (const stat in stats[user]) {
            txt += `${lang[stat]}: ${stats[user][stat]}\n`;
        }

        txt += "\n----------";

        txts.push(txt);
    }

    return txts.join("\n");
};

module.exports.addStat = (userName, stat) => {
    const userStat = stats[userName] || (stats[userName] = {});

    userStat[stat] = (userStat[stat] || 0) + 1;

    fs.writeFileSync(statsStorage, JSON.stringify(stats));
};
