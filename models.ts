export interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IUsers {
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

export type FetchResponse = IPosts | IUsers;
