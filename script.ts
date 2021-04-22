export {};
const fetch = require("node-fetch");

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

import { IPosts, IUsers, FetchResponse } from "./models";

const postsURL = "https://jsonplaceholder.typicode.com/posts";
const usersURL = "https://jsonplaceholder.typicode.com/users";

/**
 * Retrives data about posts and combines them with data about users
 * @returns Merged posts data with users data fetched from API
 */
async function merge() {
  let mergedData = null;
  const promises = [fetch(postsURL), fetch(usersURL)];

  await Promise.all(promises)
    .then((response) => Promise.all(response.map((res) => res.json())))
    .then(([posts, users]) => {
      for (let i = 0; i < posts.length; i++) {
        const currPost = posts[i];
        const currPostId = currPost.userId;
        const currUser = users[currPostId - 1];
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
async function count() {
  const data: any = await merge();
  const result = [];

  for (let i = 0; i < data.length; i++) {
    const currUser = data[i];
    const postsAmount = currUser.posts.length;
    result.push(`${currUser.name} wrote ${postsAmount} posts.`);
  }
  return result;
}

/**
 * Check post titles uniqueness
 * @returns String list of titles occur more than once or if the list is empty information that all titles are unique
 */
async function check() {
  const cache: any = {};
  const result = [];
  const posts = await fetch(postsURL).then((res: any) => res.json());
  for (let i = 0; i < posts.length; i++) {
    const currTitle: string = posts[i].title;
    cache[currTitle] = cache[currTitle] + 1 || 1;
    if (cache[currTitle] === 2) result.push(currTitle);
  }
  return result.length > 0 ? result.length : "All titles are unique";
}

// 1) Megre posts with users function
// (async () => console.log(await merge()))();

// 2) Count the number of posts for each user function
// (async () => console.log(await count()))();

// 3) Check post titles uniqueness function
(async () => console.log(await check()))();
