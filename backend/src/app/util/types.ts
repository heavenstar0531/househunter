import { Session as Sesh, SessionData } from "express-session";
export type Session = Sesh & Partial<SessionData & any>;
