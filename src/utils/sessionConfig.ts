export let config = {
  secret: process.env.SESSION_SECRET!,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: false, httpOnly: true },
  // cookie: { maxAge: 5000, secure: false },
};
