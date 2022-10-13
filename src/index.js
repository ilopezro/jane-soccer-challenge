"use strict";
exports.__esModule = true;
exports.run = void 0;
var getSoccerScores_1 = require("./getSoccerScores");
function run() {
    if (process.argv.length !== 3) {
        console.log("   Incorrect Number of Params Entered\n\n", "  usage: bin/soccer-result sample-input.txt");
        return;
    }
    var fileName = process.argv[2];
    (0, getSoccerScores_1.getSoccerScores)({ input: fileName });
}
exports.run = run;
