import { fetchTeamsInfo, fetchTopTeams, lineFileRegex } from "./utils";
import { readFileSync } from "fs";
interface GetSoccerScoresProps {
  input: string;
}

export interface LeagueTracker {
  [index: string]: number;
}

interface PrintMatchdayResultsProps {
  currentMatchday: number;
  table: LeagueTracker;
  isFinalMatchday?: boolean;
}

const printMatchdayResults = ({
  currentMatchday,
  table,
  isFinalMatchday = false,
}: PrintMatchdayResultsProps) => {
  console.log(`Matchday ${currentMatchday}`);
  const topTeams = fetchTopTeams(table);
  topTeams.forEach((team) =>
    console.log(team.join(", ") + ` ${team[1] === 1 ? "pt" : "pts"}`)
  );
  !isFinalMatchday && console.log();
};

export const getSoccerScores = ({ input }: GetSoccerScoresProps) => {
  const leagueTable: LeagueTracker = {};
  let currentMatchDayResults: string[] = [];
  let currentMatchday = 1;
  const allContents = readFileSync(input, "utf-8");

  allContents.split(/\r?\n/).forEach((line) => {
    const isValidLine = lineFileRegex.test(line);
    if (isValidLine) {
      const initalTeamInfo = line.split(",");
      const { homeTeam, awayTeam } = fetchTeamsInfo(initalTeamInfo);
      const hasHomeTeamPlayedCurrMatchday = currentMatchDayResults.includes(
        homeTeam.name
      );
      const hasAwayTeamPlayedCurrMatchday = currentMatchDayResults.includes(
        awayTeam.name
      );
      if (hasHomeTeamPlayedCurrMatchday || hasAwayTeamPlayedCurrMatchday) {
        printMatchdayResults({ currentMatchday, table: leagueTable });
        currentMatchDayResults = [];
        currentMatchday++;
      }
      currentMatchDayResults.push(...[homeTeam.name, awayTeam.name]);

      if (leagueTable[homeTeam.name] === undefined) {
        leagueTable[homeTeam.name] = 0;
      }
      if (leagueTable[awayTeam.name] === undefined) {
        leagueTable[awayTeam.name] = 0;
      }
      if (homeTeam.score > awayTeam.score) {
        leagueTable[homeTeam.name] += 3;
        leagueTable[awayTeam.name] += 0;
      } else if (homeTeam.score < awayTeam.score) {
        leagueTable[homeTeam.name] += 0;
        leagueTable[awayTeam.name] += 3;
      } else {
        leagueTable[homeTeam.name] += 1;
        leagueTable[awayTeam.name] += 1;
      }
    }
  });

  if (currentMatchDayResults.length !== 0) {
    printMatchdayResults({
      currentMatchday,
      table: leagueTable,
      isFinalMatchday: true,
    });
  }
};
