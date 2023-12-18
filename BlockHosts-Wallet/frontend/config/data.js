export const CATEGORIES_COLLECTIONS = [
    {
        value: 'art',
        label: 'Art'
    },
    {
        value: 'boats',
        label: 'Boats'
    },
    {
        value: 'cars',
        label: 'Cars'
    },
    {
        value: 'fashion',
        label: 'Fashion'
    },
    {
        value: 'jewelry',
        label: 'Jewelry'
    },
    {
        value: 'planes',
        label: 'Planes'
    },
    {
        value: 'realEstate',
        label: 'Real Estate'
    },
    {
        value: 'watches',
        label: 'Watches'
    },
    {
        value: 'wine',
        label: 'Wine'
    }
];


export const PRICE_LIST = [
    {
        value: 'dollar',
        label: 'United States Dollar (USD)'
    },
    {
        value: 'eth',
        label: 'ETH (Ether)'
    }
]

export const CHAIN_LIST = [
    {
        value: 'eth',
        label: 'ETH'
    },
    {
        value: 'bsc',
        label: 'BSC'
    },
    {
        value: 'polygon',
        label: 'Polygon'
    }
]

export const NetData = [
    // { title: 'BSC', idx: 'nft-onsale-bsc', chain: '0x61' },
    // { title: 'Polygon', idx: 'nft-onsale-polygon', chain: '0x13881' },
    { title: 'ETH', idx: 'nft-onsale-eth', chain: '0x1' }
]
export function CurrencyIcon(e) {
    if(e === '0x13881') return 'https://cdn.iconscout.com/icon/free/png-256/polygon-token-4086724-3379854.png'
    else if(e === '0x61') return 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency/128/Binance-Coin-icon.png'
    else return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png'
  }