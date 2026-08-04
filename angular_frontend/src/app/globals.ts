interface user {
    firstName: string,
    lastName: string,
    password: string
};

export interface LoginState {
  currentUser: user | null;
  account: {
      // string index on accout will return a string
      [k: string]: string;

      username: string;
      password: string;
      address: string;
      anotherField: string;
  };
}