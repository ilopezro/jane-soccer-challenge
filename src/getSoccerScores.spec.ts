/* eslint-disable jest/no-conditional-expect */
import { getSoccerScores } from "./getSoccerScores";
import {
  formattedExpectedOutput,
  smallLeagueExpectedOutput,
  unformattedExpectedOutput,
} from "./specHelpers";

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
