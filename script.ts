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

// 1) Megre function
(async () => console.log(await merge()))();
