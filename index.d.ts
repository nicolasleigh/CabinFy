import { Cookie } from 'express-session';

interface User {
  cookie: Cookie;
  passport: {
    user: {
      uid: string;
      avatar: string;
      email: string;
      username: string;
      role: string;
    };
  };
}

declare module 'express-session' {
  export interface SessionData {
    cookie: Cookie;
    passport: {
      user: {
        uid: string;
        avatar: string;
        email: string;
        username: string;
        role: string;
      };
    };
  }
}
