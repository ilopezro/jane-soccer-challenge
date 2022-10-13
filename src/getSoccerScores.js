"use strict";
exports.__esModule = true;
exports.getSoccerScores = void 0;
var utils_1 = require("./utils");
var fs_1 = require("fs");
var getSoccerScores = function (_a) {
    var input = _a.input;
    var leagueTable = {};
    var currentMatchDayResults = [];
    var currentMatchday = 1;
    var allContents = (0, fs_1.readFileSync)(input, "utf-8");
    allContents.split(/\r?\n/).forEach(function (line) {
        var isValidLine = utils_1.lineFileRegex.test(line);
        if (isValidLine) {
            var initalTeamInfo = line.split(",");
            var _a = (0, utils_1.fetchTeamsInfo)(initalTeamInfo), homeTeam = _a.homeTeam, awayTeam = _a.awayTeam;
            var hasHomeTeamPlayedCurrMatchday = currentMatchDayResults.includes(homeTeam.name);
            var hasAwayTeamPlayedCurrMatchday = currentMatchDayResults.includes(awayTeam.name);
            if (hasHomeTeamPlayedCurrMatchday || hasAwayTeamPlayedCurrMatchday) {
                console.log("Matchday ".concat(currentMatchday));
                var topTeams = (0, utils_1.fetchTopTeams)(leagueTable);
                topTeams.forEach(function (team) {
                    return console.log(team.join(", ") + " ".concat(team[1] === 1 ? "pt" : "pts"));
                });
                console.log();
                currentMatchDayResults = [];
                currentMatchday++;
            }
            currentMatchDayResults.push.apply(currentMatchDayResults, [homeTeam.name, awayTeam.name]);
            if (leagueTable[homeTeam.name] === undefined) {
                leagueTable[homeTeam.name] = 0;
            }
            if (leagueTable[awayTeam.name] === undefined) {
                leagueTable[awayTeam.name] = 0;
            }
            if (homeTeam.score > awayTeam.score) {
                leagueTable[homeTeam.name] += 3;
                leagueTable[awayTeam.name] += 0;
            }
            else if (homeTeam.score < awayTeam.score) {
                leagueTable[homeTeam.name] += 0;
                leagueTable[awayTeam.name] += 3;
            }
            else {
                leagueTable[homeTeam.name] += 1;
                leagueTable[awayTeam.name] += 1;
            }
        }
    });
    if (currentMatchDayResults.length !== 0) {
        console.log("Matchday ".concat(currentMatchday));
        var topTeams = (0, utils_1.fetchTopTeams)(leagueTable);
        topTeams.forEach(function (team) {
            return console.log(team.join(", ") + " ".concat(team[1] === 1 ? "pt" : "pts"));
        });
    }
};
exports.getSoccerScores = getSoccerScores;
