import { LeagueTracker } from "./getSoccerScores";

export const lineFileRegex =
  /(\s*[A-Za-z0-9]+( \s*[A-Za-z0-9]+)+\s*), (\s*[A-Za-z0-9]+(\s* [A-Za-z0-9]+)+\s*)/i;

interface TeamInfo {
  name: string;
  score: number;
}

export const fetchTeamInfo = (strToManipulate: string): TeamInfo => {
  const manipulatedString = strToManipulate
    .split(/(\d+)/)
    .filter((value) => value !== "")
    .map((val) => val.trim());

  return {
    name: manipulatedString[0],
    score: parseInt(manipulatedString[1]),
  };
};

interface TeamsInfo {
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
}

export const fetchTeamsInfo = (arr: string[]): TeamsInfo => ({
  homeTeam: fetchTeamInfo(arr[0]),
  awayTeam: fetchTeamInfo(arr[1]),
});

export const fetchTopTeams = (table: LeagueTracker) => {
  const sortedTeams = Object.entries(table).sort(
    ([teamAName, teamAScore], [teamBName, teamBScore]) => {
      if (teamAScore === teamBScore) return teamAName.localeCompare(teamBName);
      return teamBScore - teamAScore;
    }
  );
  const printAll = sortedTeams.length < 3;
  if (printAll) return sortedTeams;
  return [sortedTeams[0], sortedTeams[1], sortedTeams[2]];
};
