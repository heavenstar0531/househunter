import ObjectId from "bson-objectid";

declare module 'express-session'
{
    interface SessionData
    {
        acc_id?:          ObjectId;
        acc_type?:        string;
        viewed_prop_map?: Map<ObjectId, boolean>;
    }
}



