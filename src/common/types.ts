export type CoinResponse = { data: Coin };

type CoinName =
  | '1027'
  | '1839'
  | '5426'
  | '16352'
  | '18069'
  | '20236'
  | '21152';
export type Quote = {
  price: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
};
type Coin = Record<CoinName, CoinProps>;

type CoinProps = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  last_updated: Date;
  quote: {
    USD: Quote;
  };
};

export enum CoinIds {
  ETH = '1027',
  BNB = '1839',
  SOL = '5426',
  GST = '16352',
  GMT = '18069',
  GST_BSC = '20236',
  GST_ETH = '21152',
}

/** 필수, 선택 체크 해보기... */
export type Sneaker = {
  id: number; // 고유 ID
  otd: number; // 상품 ID (목록 노출 ID)
  time: number;
  propID: number;
  img: string;
  dataId: number;
  sellPrice: number; // 판매 GMT
  hp: number; // 신발 HP
  level: number; // 신발 Level
  quality: number; // 1: common, 2: uncommon, 3: rara, 4: epic, 5: legend
  mint: number;
  addRatio: number;
  lifeRatio: number;
  v1: number;
  v2: number;
  speedMax: number;
  speedMin: number;
};
