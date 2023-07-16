#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const path = require("path");
const fs = require("fs");
const { log } = require("console");

const argv = yargs(hideBin(process.argv)).command(
  "$0 <filename>",
  "",
  (yargs) => {
    return yargs.positional("filename", {
      type: "string",
      description: "name of log file",
    });
  }
).argv;

const file = path.join(__dirname, "", `${argv.filename}.json`);

function getStatistics() {
  fs.readFile(file, (err, data) => {
    if (err) {
      console.log("File not found(");
    } else {
      const games = JSON.parse(data);

      const wins = games.reduce((acc, item) => {
        return item.isWin ? (acc += 1) : acc;
      }, 0);

      log(wins);

      const statistics = {
        games: games.length,
        wins: wins,
        loses: games.length - wins,
        winPercent: `${wins * 100 / games.length}%`
      };

      log(statistics);
    }
  });
}

getStatistics();
