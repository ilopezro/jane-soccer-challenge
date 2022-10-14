import { getSoccerScores } from "./getSoccerScores";

export function run() {
  if (process.argv.length !== 3) {
    console.log(
      "   Incorrect Number of Params Entered\n\n",
      "  usage: bin/soccer-result sample-input.txt"
    );
    return;
  }

  const fileName = process.argv[2];
  getSoccerScores({ input: fileName });
}
