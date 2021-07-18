import { Status } from "./types";

const permissionMap: any = {
    agncy:
    {
        get:                         { adm:0,                      },
        update:                      { adm:0,                      },
    },
    acc:
    {
        add:                         { adm:0,               gst:3, },
        delete:                      { adm:0,                      },
        get:                         { adm:0,                      },
        list:                        { adm:0,                      },
        login:                       { adm:0, agn:1, usr:2, gst:3, },
        logout:                      { adm:0, agn:1, usr:2,        },
        updateInfo:                  { adm:0, agn:1, usr:2,        },
        updateStatus:                { adm:0,                      },
        blockAnother:                { adm:0, agn:1, usr:2,        },
    },
    prop:
    {
        add:                         { adm:0, agn:1, usr:2,        },
        addMany:                     { adm:0,                      },
        delete:                      { adm:0,                      },
        get:                         { adm:0, agn:1, usr:2, gst:3, },
        list:                        { adm:0, agn:1, usr:2, gst:3, },
        updateInfo:                  { adm:0, agn:1, usr:2,        },
        updateStatus:                { adm:0, agn:1,               },
        rent:                        {               usr:2,        },
        makePurchaseOffer:           {               usr:2,        },
        acceptOrRejectPurchaseOffer: { adm:0, agn:1, usr:2,        },
        listPurchaseOffers:          { adm:0, agn:1, usr:2,        },
        getStats:                    { adm:0, agn:1,               },
    },
    conv:
    {
        add:                         { adm:0, agn:1, usr:2,        },
        delete:                      { adm:0, agn:1, usr:2,        },
        get:                         { adm:0, agn:1, usr:2,        },
        list:                        { adm:0, agn:1, usr:2,        },
        sendMessage:                 { adm:0, agn:1, usr:2,        },
        markRead:                    { adm:0, agn:1, usr:2,        },
    },
    // FIXME: files should not be generally accessible (security flaw), make a better permission system
    file:
    {
        add:                         { adm:0, agn:1, usr:2,        },
        get:                         { adm:0, agn:1, usr:2, gst:3, },
    },
};


export function EnsurePermission( acc_type: string|undefined|null, target: string|undefined|null, method: string|undefined|null ): void {
    if( !acc_type ) acc_type = "gst";
    if( !target || !method || !permissionMap[target]?.[method]?.[acc_type] )
    {
        throw new Status().setError( "message", "insufficient permissions" );
    }
}
