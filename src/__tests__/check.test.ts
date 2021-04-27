import { check } from "../script";

let result: string | string[] = [];

beforeAll(async () => {
  result = await check();
});

describe("Tests for check function", () => {
  it("Checks if titles are unique", () => {
    expect(result).toEqual("All titles are unique");
  });
});
