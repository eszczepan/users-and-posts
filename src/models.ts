export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface IMerged {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  posts: IPost[];
}

export interface IFindResult {
  [name: string]: string;
}

export interface ICheckCache {
  [name: string]: number;
}
