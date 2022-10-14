import {
  fetchTeamInfo,
  fetchTeamsInfo,
  fetchTopTeams,
  lineFileRegex,
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
});
