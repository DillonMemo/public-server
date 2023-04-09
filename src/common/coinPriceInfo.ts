import got from 'got';
import { CoinIds, CoinResponse, Quote } from './types';

/**
 * 3일간의 코인 기록을 저장합니다.
 * `GST`, `GST-BSC`, `GST-ETH`, `GMT`
 * @param {Quote['price'][]} gstCurrency
 * @param {Quote['price'][]} gstBscCurrency
 * @param {Quote['price'][]} gstEthCurrency
 * @param {Quote['price'][]} gmtCurrency
 * @returns
 */
const coinPriceInfo = async (
  gstCurrency: Quote['price'][],
  gstBscCurrency: Quote['price'][],
  gstEthCurrency: Quote['price'][],
  gmtCurrency: Quote['price'][],
) => {
  try {
    let [gst, gstBsc, gstEth, gmt] = [[], [], [], []];
    const [currencyNames, coinIds] = [
      'USD',
      // 'bnb,ethereum,solana,green-metaverse-token,green-satoshi-token,green-satoshi-token-bsc',
      // 'GST,GST-BSC,GMT,SOL,BNB,ETH',
      `${CoinIds.GST},${CoinIds.GST_BSC},${CoinIds.GST_ETH},${CoinIds.GMT},${CoinIds.SOL},${CoinIds.BNB},${CoinIds.ETH}`,
    ];

    const coinMarketCapUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${coinIds}&convert=${currencyNames}`;
    const response: CoinResponse = await got
      .get(coinMarketCapUrl, {
        headers: {
          'X-CMC_PRO_API_KEY': `${process.env.COIN_MARKETCAP_API_KEY}`,
        },
      })
      .json();

    // 3일동안 기록을 저장합니다.
    if (CoinIds.GST in response.data) {
      gst =
        gstCurrency.length < 72
          ? [
              ...gstCurrency,
              +response.data[CoinIds.GST].quote.USD.price.toFixed(4),
            ]
          : [
              ...gstCurrency.slice(1),
              +response.data[CoinIds.GST].quote.USD.price.toFixed(4),
            ];
    }
    if (CoinIds.GST_BSC in response.data) {
      gstBsc =
        gstBscCurrency.length < 72
          ? [
              ...gstBscCurrency,
              +response.data[CoinIds.GST_BSC].quote.USD.price.toFixed(4),
            ]
          : [
              ...gstBscCurrency.slice(1),
              +response.data[CoinIds.GST_BSC].quote.USD.price.toFixed(4),
            ];
    }
    if (CoinIds.GST_ETH in response.data) {
      gstEth =
        gstEthCurrency.length < 72
          ? [
              ...gstEthCurrency,
              +response.data[CoinIds.GST_ETH].quote.USD.price.toFixed(4),
            ]
          : [
              ...gstEthCurrency.slice(1),
              +response.data[CoinIds.GST_ETH].quote.USD.price.toFixed(4),
            ];
    }
    if (CoinIds.GMT in response.data) {
      gmt =
        gmtCurrency.length < 72
          ? [
              ...gmtCurrency,
              +response.data[CoinIds.GMT].quote.USD.price.toFixed(4),
            ]
          : [
              ...gmtCurrency.slice(1),
              +response.data[CoinIds.GMT].quote.USD.price.toFixed(4),
            ];
    }

    return {
      gst,
      gstBsc,
      gstEth,
      gmt,
    };
  } catch (error) {
    console.error(error);
    return {
      gst: gstCurrency,
      gstBsc: gstBscCurrency,
      gstEth: gstEthCurrency,
      gmt: gmtCurrency,
    };
  }
};

export default coinPriceInfo;
