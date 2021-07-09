import ObjectId from 'bson-objectid';

export class MsgData
{
    // ------------------------------------------------------------- <<< message info
    _id?:       null|ObjectId = null;   // [id]
    sender_id?: null|ObjectId = null;   // ->acc      # (usr),agency_id
    text?:      null|string = null;     // string
    sent_dt?:   null|Date = null;       // date
    read_dt?:   null|Date = null;       // date|null


    static ensureValid( acc_type: string, method: string, data?: MsgData ): void
    {
        throw new Error('TODO');
    }
};

export class ConvData
{
    // ------------------------------------------------------------- <<< conversation info
    _id?:             null|ObjectId = null;         // [id]
    prop_id?:         null|ObjectId = null;         // ->prop        # koristi se za naslov poruke
    offeror_id?:      null|ObjectId = null;         // ->acc         # (usr) koji je zainteresovan za rentiranje/kupovinu
    msg_list?:        null|Array<MsgData> = null;   // list< msg >
    // ------------------------------------------------------------- <<< conversation status
    owner_arch_dt?:   null|Date = null;             // date|null
    offeror_arch_dt?: null|Date = null;             // date|null
    deleted_dt?:      null|Date = null;             // date|null


    static ensureValid( acc_type: string, method: string, data?: ConvData ): void
    {
        throw new Error('TODO');
    }
};

