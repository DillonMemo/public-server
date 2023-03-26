// import { hash_password } from '@dillon/stepn-session';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import got from 'got';

@Injectable()
export class ScheduleService {
  private prevDis: number;
  public activationUsers: number;

  /**
   * 5분마다 거리를 가져오는 fetch 스케줄러 입니다.
   */
  @Cron(CronExpression.EVERY_5_MINUTES)
  async cronActivationUser(): Promise<void> {
    try {
      console.log(new Date().toLocaleString() + 'cronActivationUser start');
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
      }

      this.prevDis = dis || 0;
    } catch (error) {
      console.error(error);
    }
  }

  // @Cron('* 5 * * * *')
  // async hashPasswordCron(): Promise<void> {
  //   try {
  //     const hashed = hash_password(
  //       'jangdongwon1994@gmail.com',
  //       '1069123asdf',
  //       new Date().getTime().toString(),
  //     );

  //     const params = {
  //       account: 'jangdongwon1994@gmail.com',
  //       // account: 'arta1069@gmail.com',
  //       password: hashed,
  //       type: 3,
  //       deviceInfo: 'web',
  //     };

  //     const response = await got.get(
  //       `https://apilb.stepn.com/run/login?${Object.entries(params)
  //         .join('&')
  //         .replace(/,/g, '=')}`,
  //     );

  //     if (response.statusCode !== 200)
  //       throw new Error(`failed to stepn hash: ${response.statusMessage}`);

  //     const {
  //       data: { sessionID, token },
  //     } = JSON.parse(response.body);

  //     console.log({
  //       sessionID,
  //       token,
  //       timestamp: new Date().toLocaleDateString(),
  //     });

  //     const loginRes = await got.get(
  //       `https://apilb.stepn.com/run/userbasic?sessionID=${sessionID}&timestamp=${new Date().getTime()}`,
  //     );
  //     const loginJson = loginRes.body;
  //     console.log('result', loginJson);

  //     /** 첫번째 테스트 */
  //     const testRes = await fetch(`https://api2.stepn.com/run/userbasic`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${data.token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         isVip: true,
  //       }),
  //     });

  //     const testJson = await testRes.json();
  //     console.log('2', testJson);

  //     /** 두번째 테스트 */
  //     // https://api2.stepn.com/run/orderlist?order=2001&chain=103&refresh=true&page=0&otd=&type=&gType=&quality=&level=0&bread=0&sessionID=ebWmG4JFz5UNLqiN%3A1675575050131%3A1431137&timestamp=1675576869405

  //     const testParams = {
  //       order: 2001,
  //       chain: 103,
  //       refresh: true,
  //       page: 0,
  //       level: 0,
  //       sessionID,
  //       timestamp: new Date().getTime(),
  //     };
  //     const orderRes = await fetch(
  //       `https://api2.stepn.com/run/orderlist?${Object.entries(testParams)
  //         .join('&')
  //         .replace(/,/g, '=')}`,
  //     );

  //     const result = await orderRes.json();

  //     console.log('2', result.data.length);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
