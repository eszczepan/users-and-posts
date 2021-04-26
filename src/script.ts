export {};
const fetch = require("node-fetch");

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

import { IPost, IUser, IMerged, IFindResult, ICheckCache } from "./models";

const postsURL: string = "https://jsonplaceholder.typicode.com/posts";
const usersURL: string = "https://jsonplaceholder.typicode.com/users";

/**
 * Retrives data about posts and combines them with data about users
 * @returns Merged posts data with users data fetched from API
 */
export async function merge() {
  let mergedData: IMerged | null = null;
  const promises = [fetch(postsURL), fetch(usersURL)];

  await Promise.all(promises)
    .then((response) => Promise.all(response.map((res) => res.json())))
    .then(([posts, users]) => {
      for (let i = 0; i < posts.length; i++) {
        const currPost: IPost = posts[i];
        const currPostId = currPost.userId;
        const currUser: IMerged = users[currPostId - 1];
        if (currUser["posts"])
          currUser["posts"] = [...currUser["posts"], currPost];
        else currUser["posts"] = [currPost];
      }
      mergedData = users;
    });

  return mergedData;
}

/**
 * Counts how many posts were posted by users
 * @returns String list containing how many posts each user wrote
 */
export async function count() {
  const data: IMerged[] | null = await merge();
  const result: string[] = [];

  for (let i = 0; i < data!.length; i++) {
    const currUser: IMerged = data![i];
    const postsAmount = currUser.posts.length;
    result.push(`${currUser.name} wrote ${postsAmount} posts.`);
  }
  return result;
}

/**
 * Check post titles uniqueness
 * @returns String list of titles occur more than once or if the list is empty information that all titles are unique
 */
export async function check() {
  const cache: ICheckCache = {};
  const result: string[] = [];
  const posts: IPost[] = await fetch(postsURL).then((res: any) => res.json());
  for (let i = 0; i < posts.length; i++) {
    const currTitle: string = posts[i].title;
    cache[currTitle] = cache[currTitle] + 1 || 1;
    if (cache[currTitle] === 2) result.push(currTitle);
  }
  return result.length > 0 ? result.length : "All titles are unique";
}

/**
 * Find users who live closest to other
 * @returns Object of user pairs which lives closest to each other
 */
export async function find() {
  const result: IFindResult = {};
  let users = await fetch(usersURL).then((res: any) => res.json());

  while (users.length > 1) {
    let closestDistance: number = Infinity;
    let closestUsers: IUser[] = [];
    for (let i = 1; i < users.length; i++) {
      const distance = countDistance(
        users[0].address.geo.lat,
        users[0].address.geo.lng,
        users[i].address.geo.lat,
        users[i].address.geo.lng
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestUsers = [users[0], users[i]];
      }
      if (i === users.length - 1 && closestUsers.length === 2) {
        users = users.filter(
          (user: IUser) =>
            user.id !== closestUsers[0].id && user.id !== closestUsers[1].id
        );
        result[closestUsers[0].name] = closestUsers[1].name;
      }
    }
  }

  return result;
}

/**
 * Function based on Haversine formula
 * Source: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula?rq=1
 * @returns Distance beetween two geographical coordinates in kilometers
 */
export function countDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a));
}

/**
 * Printing result in console
 * To print type in your terminal: npx ts-node script.ts
 */

// 1) Megre posts with users function
// (async () => console.log(await merge()))();

// 2) Count the number of posts for each user function
// (async () => console.log(await count()))();

// 3) Check post titles uniqueness function
// (async () => console.log(await check()))();

// 4) Find users who live closest to other
// (async () => console.log(await find()))();
