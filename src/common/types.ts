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
