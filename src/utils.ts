export interface TeamInfo {
  name: string;
  score: number;
}

interface DeterminePointsProps {
  table: LeagueTracker;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
}

interface TeamsInfo {
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
}

interface PrintMatchdayResultsProps {
  currentMatchday: number;
  table: LeagueTracker;
  isFinalMatchday?: boolean;
}

interface DetermineHasPlayedCurrentMatchdayProp {
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  currentMatchdayClubs: string[];
}

export interface LeagueTracker {
  [index: string]: number;
}

export const lineFileRegex =
  /^(\s*[A-Za-z0-9]+( \s*[A-Za-z0-9]+)+\s*),(\s*[A-Za-z0-9]+(\s* [A-Za-z0-9]+)+\s*$)/i;

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

export const checkExistenceOfTeams = ({
  table,
  homeTeam,
  awayTeam,
}: DeterminePointsProps) => {
  if (table[homeTeam.name] === undefined) {
    table[homeTeam.name] = 0;
  }

  if (table[awayTeam.name] === undefined) {
    table[awayTeam.name] = 0;
  }
};

export const determinePoints = (props: DeterminePointsProps) => {
  checkExistenceOfTeams(props);
  const { table, homeTeam, awayTeam } = props;
  if (homeTeam.score > awayTeam.score) {
    table[homeTeam.name] += 3;
    table[awayTeam.name] += 0;
  } else if (homeTeam.score < awayTeam.score) {
    table[homeTeam.name] += 0;
    table[awayTeam.name] += 3;
  } else {
    table[homeTeam.name] += 1;
    table[awayTeam.name] += 1;
  }
};

export const determineHasTeamPlayedCurrentMatchday = ({
  homeTeam,
  awayTeam,
  currentMatchdayClubs,
}: DetermineHasPlayedCurrentMatchdayProp) => {
  return (
    [homeTeam, awayTeam]
      .map((teamInfo) => currentMatchdayClubs.includes(teamInfo.name))
      .filter((value) => value).length !== 0
  );
};

export const printMatchdayResults = ({
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
