import {
  checkExistenceOfTeams,
  determineHasTeamPlayedCurrentMatchday,
  determinePoints,
  fetchTeamsInfo,
  printMatchdayResults,
  LeagueTracker,
  lineFileRegex,
} from "./utils";
import { readFileSync } from "fs";
interface GetSoccerScoresProps {
  input: string;
}

export const getSoccerScores = ({ input }: GetSoccerScoresProps) => {
  const leagueTable: LeagueTracker = {};
  let currentMatchdayClubs: string[] = [];
  let currentMatchday = 1;
  const allContents = readFileSync(input, "utf-8");

  allContents.split(/\r?\n/).forEach((line) => {
    const isValidLine = lineFileRegex.test(line);
    if (isValidLine) {
      const initalTeamInfo = line.split(",");
      const { homeTeam, awayTeam } = fetchTeamsInfo(initalTeamInfo);
      const hasTeamsPlayedCurrentMatchday =
        determineHasTeamPlayedCurrentMatchday({
          homeTeam,
          awayTeam,
          currentMatchdayClubs,
        });

      if (hasTeamsPlayedCurrentMatchday) {
        printMatchdayResults({ currentMatchday, table: leagueTable });
        currentMatchdayClubs = [];
        currentMatchday++;
      }
      currentMatchdayClubs.push(...[homeTeam.name, awayTeam.name]);

      checkExistenceOfTeams({ table: leagueTable, homeTeam, awayTeam });
      determinePoints({ table: leagueTable, homeTeam, awayTeam });
    }
  });

  if (currentMatchdayClubs.length !== 0) {
    printMatchdayResults({
      currentMatchday,
      table: leagueTable,
      isFinalMatchday: true,
    });
  }
};
