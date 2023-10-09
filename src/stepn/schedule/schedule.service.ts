// import { hash_password } from '@dillon/stepn-session';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import got from 'got';
import { hash_password } from 'pkg/stepn_session';
import { convertObjectToAPIString } from 'src/common';
import coinPriceInfo from 'src/common/coinPriceInfo';
import { Chain, Order, Quality, Type } from 'src/common/stepn/stepn.enum';
import { Quote } from 'src/common/stepn/stepn.types';

@Injectable()
export class ScheduleService {
  private readonly PAGE: number = 30;
  private prevDis: number;
  public activationUsers: number;

  /** coin variables */
  public gstCurrency: Quote['price'][] = [];
  public gstBscCurrency: Quote['price'][] = [];
  public gstEthCurrency: Quote['price'][] = [];
  public gmtCurrency: Quote['price'][] = [];

  /**
   * 5분마다 거리를 가져오는 fetch 스케줄러 입니다.
   */
  @Cron(CronExpression.EVERY_5_MINUTES)
  async cronActivationUser(): Promise<void> {
    try {
      const response = await got.get('https://stepn.com/web/runAnl');

      const {
        data: { dis },
      } = JSON.parse(response.body);

      if (this.prevDis && dis) {
        const walkerUsers = ((dis - this.prevDis) / 3000) * 0.4;
        const joggerUsers = ((dis - this.prevDis) / 6500) * 0.3;
        const runnerUsers = ((dis - this.prevDis) / 10000) * 0.05;
        const trainerUsers = ((dis - this.prevDis) / 5000) * 0.25;

        this.activationUsers = Math.floor(
          walkerUsers + joggerUsers + runnerUsers + trainerUsers,
        );
        console.log(new Date().toLocaleString() + ' cronActivationUser', {
          activationUsers: this.activationUsers,
          prevDis: this.prevDis,
        });
      }

      this.prevDis = dis || 0;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 15분마다 아이템 정보를 최신화 합니다.
   * {@link https://apilb.stepn.com/run/orderlist?saleId=1&order=2001&chain=103&page=0&otd=&type=&gType=&quality=&level=0&bread=0 DefaultURL}
   */
  @Cron('0 */5 * * * *')
  async cronOrderList(): Promise<void> {
    try {
      const map = new Map();
      for (let i = 0; i < this.PAGE; i++) {
        const params = convertObjectToAPIString({
          order: Order.lowestPrice,
          chain: Chain.SOL,
          page: i,
          otd: undefined,
          type: Type.walker,
          gType: undefined,
          quality: Quality.common,
          level: 0,
          bread: 0,
        });

        const json: { code: number; data: any[] } = await got
          .get(`${process.env.STEPN_API_URL}run/orderlist?${params}`, {
            http2: true,
          })
          .json();

        console.log('first', json);
        if (json.data.length > 0) {
          for (const item of json.data) map.set(item.id, item);
        } else {
          console.log('first break :', i);
          break;
        }
      }

      for (let j = 0; j < this.PAGE; j++) {
        const params = convertObjectToAPIString({
          order: Order.highestPrice,
          chain: Chain.SOL,
          page: j,
          otd: undefined,
          type: Type.walker,
          gType: undefined,
          quality: Quality.common,
          level: 0,
          bread: 0,
        });

        const json: { code: number; data: any[] } = await got
          .get(`${process.env.STEPN_API_URL}run/orderlist?${params}`, {
            http2: true,
          })
          .json();

        console.log('second', json);

        if (json.data.length > 0) {
          for (const item of json.data) map.set(item.id, item);
        } else {
          console.log('second break :', j);
          break;
        }
      }

      console.log(
        new Date().toLocaleString(),
        '매 15분 마다 실행!!',
        Array.from(map).length,
      );
      // const response = await got.get(
      //   `${process.env.STEPN_API_URL}run/login?${Object.entries(params)
      //     .join('&')
      //     .replace(/,/g, '=')}`,
      // );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 1시간마다 코인 정보를 가져옵니다.
   * {@link https://pro.coinmarketcap.com/ CoinmarketCap}
   */
  @Cron(CronExpression.EVERY_HOUR)
  async cronCoinListings(): Promise<void> {
    try {
      const { gst, gstBsc, gstEth, gmt } = await coinPriceInfo(
        this.gstCurrency,
        this.gstBscCurrency,
        this.gstEthCurrency,
        this.gmtCurrency,
      );
      this.gstCurrency = gst;
      this.gstBscCurrency = gstBsc;
      this.gstEthCurrency = gstEth;
      this.gmtCurrency = gmt;

      console.log(
        'coinPrices',
        this.gstCurrency,
        this.gstBscCurrency,
        this.gstEthCurrency,
        this.gmtCurrency,
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 스테픈 로그인
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async hashPasswordCron(): Promise<void> {
    try {
      const hashed = hash_password(
        'jangdongwon1994@gmail.com',
        '1069123asdf',
        new Date().getTime().toString(),
      );

      const params = {
        account: 'jangdongwon1994@gmail.com',
        // account: 'arta1069@gmail.com',
        password: hashed,
        type: 3,
        deviceInfo: 'web',
      };

      const response = await got.get(
        `${process.env.STEPN_API_URL}run/login?${convertObjectToAPIString(
          params,
        )}`,
      );

      if (response.statusCode !== 200)
        throw new Error(`failed to stepn hash: ${response.statusMessage}`);

      const {
        data: { sessionID, token },
      } = JSON.parse(response.body);

      console.log({
        sessionID,
        token,
        timestamp: new Date().toLocaleDateString(),
      });

      // const loginRes = await got.get(
      //   `https://apilb.stepn.com/run/userbasic?sessionID=${sessionID}&timestamp=${new Date().getTime()}`,
      // );
      // const loginJson = loginRes.body;
      // console.log('result', loginJson);

      // /** 첫번째 테스트 */
      // const testRes = await fetch(`https://api2.stepn.com/run/userbasic`, {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${data.token}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     isVip: true,
      //   }),
      // });

      // const testJson = await testRes.json();
      // console.log('2', testJson);

      // /** 두번째 테스트 */
      // // https://api2.stepn.com/run/orderlist?order=2001&chain=103&refresh=true&page=0&otd=&type=&gType=&quality=&level=0&bread=0&sessionID=ebWmG4JFz5UNLqiN%3A1675575050131%3A1431137&timestamp=1675576869405

      // const testParams = {
      //   order: 2001,
      //   chain: 103,
      //   refresh: true,
      //   page: 0,
      //   level: 0,
      //   sessionID,
      //   timestamp: new Date().getTime(),
      // };
      // const orderRes = await fetch(
      //   `https://api2.stepn.com/run/orderlist?${Object.entries(testParams)
      //     .join('&')
      //     .replace(/,/g, '=')}`,
      // );

      // const result = await orderRes.json();

      // console.log('2', result.data.length);
    } catch (error) {
      console.error(error);
    }
  }
}
