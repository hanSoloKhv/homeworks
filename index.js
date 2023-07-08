#!/usr/bin/env node

const currentDate = new Date();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .alias("y", "year")
  .alias("m", "month")
  .alias("d", "date")
  .command(
    "$0 [cmd] [value]",
    "",
    (yargs) => {
      return yargs
        .positional("cmd", {
          choices: ["add", "sub"],
          type: "string",
        })
        .positional("value", {
          type: "number",
        });
    },
    (argv) => {
      switch (true) {
        case !!argv.y:
          if (argv.cmd) {
            const value = argv.cmd === "add" ? argv.y : -argv.y;
            console.log(
              `Current date: ${new Date(
                currentDate.setFullYear(currentDate.getFullYear() + value)
              ).toISOString()}`
            );
          } else {
            console.log(`Current year: ${currentDate.getFullYear()}`);
          }
          break;
        case !!argv.m:
          if (argv.cmd) {
            const value = argv.cmd === "add" ? argv.m : -argv.m;
            console.log(
              `Current date: ${new Date(
                currentDate.setMonth(currentDate.getMonth() + 1 + value)
              ).toISOString()}`
            );
          } else {
            console.log(`Current month: ${currentDate.getMonth() + 1}`);
          }
          break;
        default:
          if (argv.cmd && !!argv?.d) {
            const value = argv.cmd === "add" ? argv.d : -argv.d;
            console.log(
              `Current date: ${new Date(
                currentDate.getTime() + value * 86400000
              ).toISOString()}`
            );
          } else {
            console.log(`Current date: ${currentDate.toISOString()}`);
          }
      }
    }
  ).argv;
