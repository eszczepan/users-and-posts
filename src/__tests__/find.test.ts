import { find } from "../script";
import { IFindResult } from "../models";

const closestUsers = {
  "Ervin Howell": "Clementine Bauch",
  "Kurtis Weissnat": "Nicholas Runolfsdottir V",
  "Leanne Graham": "Chelsey Dietrich",
  "Mrs. Dennis Schulist": "Clementina DuBuque",
  "Patricia Lebsack": "Glenna Reichert",
};

let result: IFindResult = {};

beforeAll(async () => {
  result = await find();
});

describe("Tests for find function", () => {
  it("Finds closest users pairs to each other", () => {
    expect(result).toEqual(closestUsers);
  });
});
