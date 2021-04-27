import { count } from "../script";

const countedPosts = [
  "Leanne Graham wrote 10 posts.",
  "Ervin Howell wrote 10 posts.",
  "Clementine Bauch wrote 10 posts.",
  "Patricia Lebsack wrote 10 posts.",
  "Chelsey Dietrich wrote 10 posts.",
  "Mrs. Dennis Schulist wrote 10 posts.",
  "Kurtis Weissnat wrote 10 posts.",
  "Nicholas Runolfsdottir V wrote 10 posts.",
  "Glenna Reichert wrote 10 posts.",
  "Clementina DuBuque wrote 10 posts.",
];

let result: string[] = [];

beforeAll(async () => {
  result = await count();
});

describe("Tests for count function", () => {
  it("Checks length of counted users", () => {
    expect(result).toHaveLength(10);
  });

  it("Checks result", () => {
    expect(result).toEqual(countedPosts);
  });
});
