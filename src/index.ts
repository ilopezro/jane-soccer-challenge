// import { getSoccerScores } from "./getSoccerScores";

function run(): void {
  if (process.argv.length !== 3) {
    console.log(
      "   Incorrect Number of Params Entered\n\n",
      "  usage: bin/soccer-result sample-input.txt"
    );
    return;
  }
  console.log("did it reach this?");
}

run();
