export const PermissionMap: any = {
    agency:
    {
        get:                 { adm:0,                      },
        update:              { adm:0,                      },
    },
    account:
    {
        add:                 { adm:0,               gst:3, },
        delete:              { adm:0,                      },
        get:                 { adm:0,                      },
        list:                { adm:0,                      },
        login:               { adm:0, agn:1, usr:2,        },
        logout:              { adm:0, agn:1, usr:2,        },
        updateInfo:          { adm:0, agn:1, usr:2,        },
        updateStatus:        { adm:0,                      },
        blockAnother:        { adm:0, agn:1, usr:2,        },
    },
    property:
    {
        add:                 { adm:0, agn:1, usr:2,        },
        addMany:             { adm:0,                      },
        delete:              { adm:0,                      },
        get:                 { adm:0, agn:1, usr:2, gst:3, },
        list:                { adm:0, agn:1, usr:2, gst:3, },
        updateInfo:          { adm:0, agn:1, usr:2,        },
        updateStatus:        { adm:0, agn:1,               },
        rent:                {               usr:2,        },
        makePurchaseOffer:   {               usr:2,        },
        acceptPurchaseOffer: { adm:0, agn:1, usr:2,        },
        listPurchaseOffers:  { adm:0, agn:1, usr:2,        },
        getStats:            { adm:0, agn:1,               },
    },
    conversation:
    {
        add:                 { adm:0, agn:1, usr:2,        },
        delete:              { adm:0, agn:1, usr:2,        },
        get:                 { adm:0, agn:1, usr:2,        },
        list:                { adm:0, agn:1, usr:2,        },
        sendMessage:         { adm:0, agn:1, usr:2,        },
        markRead:            { adm:0, agn:1, usr:2,        },
    },
};



function EnsurePermission( target: string, method: string, acc_type: string ): void {
    throw new Error('TODO');
}
