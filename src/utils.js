"use strict";
exports.__esModule = true;
exports.fetchTopTeams = exports.fetchTeamsInfo = exports.fetchTeamInfo = exports.lineFileRegex = void 0;
exports.lineFileRegex = /(\s*[A-Za-z0-9]+( \s*[A-Za-z0-9]+)+\s*), (\s*[A-Za-z0-9]+(\s* [A-Za-z0-9]+)+\s*)/i;
var fetchTeamInfo = function (strToManipulate) {
    var manipulatedString = strToManipulate
        .split(/(\d+)/)
        .filter(function (value) { return value !== ""; })
        .map(function (val) { return val.trim(); });
    return {
        name: manipulatedString[0],
        score: parseInt(manipulatedString[1])
    };
};
exports.fetchTeamInfo = fetchTeamInfo;
var fetchTeamsInfo = function (arr) { return ({
    homeTeam: (0, exports.fetchTeamInfo)(arr[0]),
    awayTeam: (0, exports.fetchTeamInfo)(arr[1])
}); };
exports.fetchTeamsInfo = fetchTeamsInfo;
var fetchTopTeams = function (table) {
    var sortedTeams = Object.entries(table).sort(function (_a, _b) {
        var teamAName = _a[0], teamAScore = _a[1];
        var teamBName = _b[0], teamBScore = _b[1];
        if (teamAScore === teamBScore)
            return teamAName.localeCompare(teamBName);
        return teamBScore - teamAScore;
    });
    var printAll = sortedTeams.length < 3;
    if (printAll)
        return sortedTeams;
    return [sortedTeams[0], sortedTeams[1], sortedTeams[2]];
};
exports.fetchTopTeams = fetchTopTeams;
