import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prisma from '../../prisma/client.js';

export let config = {
  secret: process.env.SESSION_SECRET!,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000, secure: false, httpOnly: true },
  // cookie: { maxAge: 1 * 60 * 1000, secure: false, httpOnly: true },
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
};
