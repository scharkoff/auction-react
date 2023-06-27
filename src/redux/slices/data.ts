export const emptyUserData = {
    id: 0,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    is_superuser: false,
    date_joined: '',
    last_login: '',
    is_active: false,
};

export const emptyAuctionData = {
    id: 0,
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    created: '',
    is_closed: false,
    owner_id: 0,
    owner: {
        ...emptyUserData,
    },
};

export const emptyLotData = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    start_time: '',
    end_time: '',
    owner_id: 0,
    owner: {
        ...emptyUserData,
    },
    auction_id: 0,
    auction: {
        ...emptyAuctionData,
    },
    winner_id: null,
    image: '',
};

export const emptyBidData = {
    id: 0,
    price: 0,
    owner_id: 0,
    owner: {
        ...emptyUserData,
    },
    lot_id: 0,
    lot: {
        ...emptyLotData,
    },
};
