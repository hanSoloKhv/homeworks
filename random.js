var readline = require("readline");
let rl = readline.createInterface(process.stdin, process.stdout);

const randomValue = Math.floor(Math.random() * 100);

function checkAnswer(value) {
  if (value == randomValue) {
    console.log(`Отгадано число ${randomValue} !!!`);
    rl.close();
  } else if (value > randomValue) {
    rl.question("Меньше( ", checkAnswer);
  } else {
    rl.question("Больше( ", checkAnswer);
  }
}

rl.question("Загадано число в диапазоне от 0 до 100: ", checkAnswer);
