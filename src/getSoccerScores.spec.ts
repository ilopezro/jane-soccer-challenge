/* eslint-disable jest/no-conditional-expect */
import { getSoccerScores } from "./getSoccerScores";

const formattedExpectedOutput = [
  "Matchday 1",
  "Capitola Seahorses, 3 pts",
  "Felton Lumberjacks, 3 pts",
  "San Jose Earthquakes, 1 pt",
  null,
  "Matchday 2",
  "Capitola Seahorses, 4 pts",
  "Aptos FC, 3 pts",
  "Felton Lumberjacks, 3 pts",
  null,
  "Matchday 3",
  "Aptos FC, 6 pts",
  "Felton Lumberjacks, 6 pts",
  "Monterey United, 6 pts",
  null,
  "Matchday 4",
  "Aptos FC, 9 pts",
  "Felton Lumberjacks, 7 pts",
  "Monterey United, 6 pts",
];

const smallLeagueExpectedOutput = [
  "Matchday 1",
  "Real Madrid, 3 pts",
  "Barcelona, 0 pts",
  null,
  "Matchday 2",
  "Real Madrid, 3 pts",
  "Atletico, 1 pt",
  "Barcelona, 1 pt",
  null,
  "Matchday 3",
  "Real Madrid, 6 pts",
  "Atletico, 1 pt",
  "Barcelona, 1 pt",
];

const unformattedExpectedOutput = [
  "Matchday 1",
  "Capitola Seahorses, 3 pts",
  "San Jose Earthquakes, 1 pt",
  "Santa Cruz Slugs, 1 pt",
  null,
  "Matchday 2",
  "Capitola Seahorses, 4 pts",
  "Aptos FC, 3 pts",
  "San Jose Earthquakes, 2 pts",
  null,
  "Matchday 3",
  "Aptos FC, 6 pts",
  "Capitola Seahorses, 5 pts",
  "San Jose Earthquakes, 2 pts",
];

describe("getSoccerScores", () => {
  const foo = jest.fn<typeof console.log, unknown[]>();
  global.console = { ...global.console, log: foo };
  afterEach(() => foo.mockReset());
  describe("with formatted input", () => {
    it("outputs correct matchday information", () => {
      getSoccerScores({ input: "inputs/formatted.txt" });
      formattedExpectedOutput.forEach((output, idx) => {
        if (output === null) {
          expect(foo).toHaveBeenCalled();
        } else {
          expect(foo).toHaveBeenNthCalledWith(idx + 1, output);
        }
      });
    });
  });

  describe("with small league", () => {
    it("outputs correct matchday information", () => {
      getSoccerScores({ input: "inputs/small-league.txt" });
      smallLeagueExpectedOutput.forEach((output, idx) => {
        if (output === null) {
          expect(foo).toHaveBeenCalled();
        } else {
          expect(foo).toHaveBeenNthCalledWith(idx + 1, output);
        }
      });
    });
  });

  describe("with empty league", () => {
    it("does not print or return anything", () => {
      getSoccerScores({ input: "inputs/empty.txt" });
      expect(foo.mock.calls).toHaveLength(0);
      expect(foo).not.toHaveBeenCalled();
    });
  });

  describe("with unformatted input", () => {
    it("outputs correct matchday information", () => {
      getSoccerScores({ input: "inputs/unformatted.txt" });
      unformattedExpectedOutput.forEach((output, idx) => {
        if (output === null) {
          expect(foo).toHaveBeenCalled();
        } else {
          expect(foo).toHaveBeenNthCalledWith(idx + 1, output);
        }
      });
    });
  });
});
