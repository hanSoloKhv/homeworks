#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const http = require("http");
require("dotenv").config();

const argv = yargs(hideBin(process.argv)).command("$0 <city>", "", (yargs) => {
  return yargs.positional("city", {
    type: "string",
    description: "city name",
  });
}).argv;

const url = `${process.env.base_url}?access_key=${process.env.access_key}&query="${argv.city}"`;

function getWeather() {
  http.get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const parsedData = JSON.parse(data);
      if (!parsedData.error) {
        console.log(parsedData.current)
      } else {
        console.log(parsedData?.error?.info || "ERROR");
      }
    });

    res.on("error", (err) => {
      console.log(err);
    });
  });
}

getWeather();
