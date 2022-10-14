import {
  checkExistenceOfTeams,
  determineHasTeamPlayedCurrentMatchday,
  determinePoints,
  fetchTeamInfo,
  fetchTeamsInfo,
  fetchTopTeams,
  LeagueTracker,
  lineFileRegex,
  TeamInfo,
} from "./utils";

describe("Utils", () => {
  describe("lineFileRegex", () => {
    describe("when line is formatted properly", () => {
      it("accepts the line", () => {
        const lineToTest = "Real Madrid 3, Barcelona 2";
        expect(lineFileRegex.test(lineToTest)).toBeTruthy();
      });
    });
    describe("when whitepsace is added to beginning and end of string", () => {
      it("accepts line", () => {
        const lineToTest =
          "       Capitola Seahorses 1,Aptos FC                                                       0";
        expect(lineFileRegex.test(lineToTest)).toBeTruthy();
      });
    });
    describe("when line contains three teams", () => {
      it("does not accept the line", () => {
        const lineToTest = "Real Madrid 3, Barcelona 2, Atletico 1";
        expect(lineFileRegex.test(lineToTest)).toBeFalsy();
      });
    });
    describe("when line is empty", () => {
      it("does not accept the line", () => {
        expect(lineFileRegex.test("")).toBeFalsy();
      });
    });
  });
  describe("fetchTeamInfo", () => {
    describe("given a formatted input", () => {
      it("returns correct values", () => {
        const stringToManipulate = "Santa Cruz Slugs 3";
        expect(fetchTeamInfo(stringToManipulate)).toStrictEqual({
          name: "Santa Cruz Slugs",
          score: 3,
        });
      });
    });

    describe("given an unformatted input", () => {
      it("returns correct object", () => {
        const stringToManipulate = "     Santa Cruz Slugs          5";
        expect(fetchTeamInfo(stringToManipulate)).toStrictEqual({
          name: "Santa Cruz Slugs",
          score: 5,
        });
      });
    });
  });
  describe("fetchTeamsInfo", () => {
    describe("when given two teams", () => {
      it("returns correct team information", () => {
        const teamInfoArr = ["Santa Cruz Slugs 4", "Monterrey Cheese 5"];
        expect(fetchTeamsInfo(teamInfoArr)).toEqual({
          homeTeam: { name: "Santa Cruz Slugs", score: 4 },
          awayTeam: { name: "Monterrey Cheese", score: 5 },
        });
      });
    });
  });
  describe("fetchTopTeams", () => {
    describe("when league has more than 3 teams", () => {
      describe("when top teams have different points", () => {
        it("returns correct teams", () => {
          const leagueTable = {
            "AC Milan": 7,
            Barcelona: 5,
            "Real Madrid": 14,
            Bayern: 6,
            Ajax: 4,
          };
          const topTeams = fetchTopTeams(leagueTable);
          expect(topTeams[0]).toStrictEqual(["Real Madrid", 14]);
          expect(topTeams[1]).toStrictEqual(["AC Milan", 7]);
          expect(topTeams[2]).toStrictEqual(["Bayern", 6]);
        });
      });
      describe("when top teams are tied on points", () => {
        it("sorts alphabetically & returns correct teams", () => {
          const leagueTable = {
            "Nottingham Forest": 2,
            Liverpool: 6,
            Juventus: 2,
            Bayern: 6,
          };
          const topTeams = fetchTopTeams(leagueTable);
          expect(topTeams[0]).toStrictEqual(["Bayern", 6]);
          expect(topTeams[1]).toStrictEqual(["Liverpool", 6]);
          expect(topTeams[2]).toStrictEqual(["Juventus", 2]);
        });
      });
    });

    describe("when leage has less than 4 teams", () => {
      describe("on first matchday", () => {
        it("returns correct number of teams", () => {
          const leagueTable = {
            "Club Brugge": 0,
            "Manchester United": 3,
          };
          const topTeams = fetchTopTeams(leagueTable);
          expect(topTeams).toHaveLength(2);
          expect(topTeams[0]).toStrictEqual(["Manchester United", 3]);
          expect(topTeams[1]).toStrictEqual(["Club Brugge", 0]);
        });
      });

      describe("on subsequent matchdays", () => {
        it("returns correct teams", () => {
          const leagueTable = {
            "Borussia Dortmund": 1,
            Chelsea: 2,
            Liverpool: 3,
          };
          const topTeams = fetchTopTeams(leagueTable);
          expect(topTeams).toHaveLength(3);
          expect(topTeams[0]).toStrictEqual(["Liverpool", 3]);
          expect(topTeams[1]).toStrictEqual(["Chelsea", 2]);
          expect(topTeams[2]).toStrictEqual(["Borussia Dortmund", 1]);
        });
      });
    });
  });

  describe("checkExistenceOfTeams", () => {
    describe("when teams are not in the league yet", () => {
      it("adds them to the league", () => {
        const currentLeague = {};
        const homeTeam: TeamInfo = {
          name: "San Rafael FC",
          score: 1,
        };
        const awayTeam: TeamInfo = {
          name: "Richmond FC",
          score: 2,
        };
        expect(currentLeague).toEqual({});
        checkExistenceOfTeams({ table: currentLeague, homeTeam, awayTeam });
        expect(currentLeague).toEqual({ "San Rafael FC": 0, "Richmond FC": 0 });
      });
    });
    describe("when teams are already exist in the league", () => {
      it("does not modify league", () => {
        const currentLeague = { "Petaluma FC": 5, "Santa Cruz Slugs": 1 };
        const homeTeam: TeamInfo = {
          name: "Petaluma FC",
          score: 0,
        };
        const awayTeam: TeamInfo = {
          name: "Santa Cruz Slugs",
          score: 5,
        };
        expect(currentLeague).toEqual({
          "Petaluma FC": 5,
          "Santa Cruz Slugs": 1,
        });
        checkExistenceOfTeams({ table: currentLeague, homeTeam, awayTeam });
        expect(currentLeague).toEqual({
          "Petaluma FC": 5,
          "Santa Cruz Slugs": 1,
        });
      });
    });
  });

  describe("determinePoints", () => {
    describe("when home team won their match", () => {
      it("adds three points to home teams", () => {
        const currentLeague: LeagueTracker = { Arsenal: 5, Liverpool: 1 };
        const homeTeam: TeamInfo = {
          name: "Arsenal",
          score: 5,
        };
        const awayTeam: TeamInfo = {
          name: "Liverpool",
          score: 2,
        };
        expect(currentLeague[homeTeam.name]).toEqual(5);
        expect(currentLeague[awayTeam.name]).toEqual(1);
        determinePoints({ table: currentLeague, homeTeam, awayTeam });
        expect(currentLeague[homeTeam.name]).toEqual(8);
        expect(currentLeague[awayTeam.name]).toEqual(1);
      });
    });
    describe("when away team won their match", () => {
      it("adds three points to away teams", () => {
        const currentLeague: LeagueTracker = {
          "Manchester City": 2,
          "Manchester United": 3,
        };
        const homeTeam: TeamInfo = {
          name: "Manchester City",
          score: 1,
        };
        const awayTeam: TeamInfo = {
          name: "Manchester United",
          score: 6,
        };
        expect(currentLeague[homeTeam.name]).toEqual(2);
        expect(currentLeague[awayTeam.name]).toEqual(3);
        determinePoints({ table: currentLeague, homeTeam, awayTeam });
        expect(currentLeague[homeTeam.name]).toEqual(2);
        expect(currentLeague[awayTeam.name]).toEqual(6);
      });
    });
    describe("when teams tied their match", () => {
      it("adds one point to both teams", () => {
        const currentLeague: LeagueTracker = {
          Elche: 21,
          "Real Madrid": 34,
        };
        const homeTeam: TeamInfo = {
          name: "Elche",
          score: 1,
        };
        const awayTeam: TeamInfo = {
          name: "Real Madrid",
          score: 1,
        };
        expect(currentLeague[homeTeam.name]).toEqual(21);
        expect(currentLeague[awayTeam.name]).toEqual(34);
        determinePoints({ table: currentLeague, homeTeam, awayTeam });
        expect(currentLeague[homeTeam.name]).toEqual(22);
        expect(currentLeague[awayTeam.name]).toEqual(35);
      });
    });
  });

  describe("determineHasTeamPlayedCurrentMatchday", () => {
    describe("when both teams have played current matchday", () => {
      it("returns true", () => {
        const currentMatchdayClubs = ["LA Galaxy", "LAFC"];
        const homeTeam: TeamInfo = { name: "LA Galaxy", score: 3 };
        const awayTeam: TeamInfo = { name: "LAFC", score: 3 };
        expect(
          determineHasTeamPlayedCurrentMatchday({
            currentMatchdayClubs,
            homeTeam,
            awayTeam,
          })
        ).toBeTruthy();
      });
    });
    describe("when no teams have played current matchday", () => {
      it("returns false", () => {
        const currentMatchdayClubs = ["Santa Cruz Slugs", "LA Galaxy"];
        const homeTeam: TeamInfo = { name: "Nice", score: 0 };
        const awayTeam: TeamInfo = { name: "Sevilla", score: 3 };
        expect(
          determineHasTeamPlayedCurrentMatchday({
            currentMatchdayClubs,
            homeTeam,
            awayTeam,
          })
        ).toBeFalsy();
      });
    });
    describe("when one team has played current matchday", () => {
      it("returns true", () => {
        const currentMatchdayClubs = ["Santa Cruz Slugs", "PSG", "LA Galaxy"];
        const homeTeam: TeamInfo = { name: "PSG", score: 0 };
        const awayTeam: TeamInfo = { name: "Philadelphia Union", score: 3 };
        expect(
          determineHasTeamPlayedCurrentMatchday({
            currentMatchdayClubs,
            homeTeam,
            awayTeam,
          })
        ).toBeTruthy();
      });
    });
  });
});
