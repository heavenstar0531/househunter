import { Session as Sesh, SessionData as SeshData } from "express-session";
import { ObjectId } from "mongodb";

export interface SessionData extends SeshData
{
    acc_id?:          ObjectId;
    acc_type?:        string;
    viewed_prop_map?: Map<ObjectId, boolean>;
}
export type Session = Sesh & Partial<SessionData>;

