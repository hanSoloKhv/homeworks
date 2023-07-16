#!/usr/bin/env node
const readline = require("readline");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const path = require("path");
const fs = require("fs");

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

let randomValue = randomIntFromInterval(1, 2);

const file = path.join(__dirname, "", `${argv.filename}.json`);

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkLogs(value) {
  fs.readFile(file, (err, data) => {
    if (err) {
      fs.writeFile(
        file,
        JSON.stringify([
          {
            isWin: value == randomValue,
            gameId: Date.now(),
          },
        ]),
        (err) => {
          if (err) throw Error(err);
        }
      );
    } else {
      const results = JSON.parse(data);
      results.push({
        isWin: value == randomValue,
        gameId: Date.now(),
      });

      fs.writeFile(file, JSON.stringify(results), (err) => {
        if (err) throw Error(err);
      });
    }
  });
}

async function checkAnswer(value) {
  await checkLogs(value);
  if (value == randomValue) {
    console.log(`Вы угадали! ${value == 1 ? "Орел" : "Решка"}`);
    rl.close();
  } else {
    randomValue = randomIntFromInterval(1, 2);
    rl.question(
      "Не угадали(, попробуйте снова: Орел(1) или Решка(2)? ",
      checkAnswer
    );
  }
}

const rl = readline.createInterface(process.stdin, process.stdout);

rl.question("Орел(1) или Решка(2)? ", checkAnswer);
