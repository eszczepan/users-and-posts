import { countDistance } from "../script";

it("Counts distance between two coordinate values", () => {
  expect(countDistance(-37.3159, 81.1496, -43.9509, -34.4618)).toStrictEqual(
    8898.278635448845
  );
});
