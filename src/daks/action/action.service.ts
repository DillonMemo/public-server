import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Action, ActionType } from './action.entity';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
  ) {}

  async editMoveCount(): Promise<Action> {
    const result = await this.actionRepository.findOne({
      where: {
        type: ActionType.MOVE,
      },
    });
    if (!result) {
      await this.actionRepository.save(
        this.actionRepository.create({
          type: ActionType.MOVE,
          count: 1,
        }),
      );
    } else {
      const find = await this.actionRepository.findOneOrFail({
        where: {
          type: ActionType.MOVE,
        },
      });
      find.count = find.count + 1;
      await this.actionRepository.save(find);
    }
    return result;
  }

  async editShareCount(): Promise<Action> {
    const result = await this.actionRepository.findOne({
      where: {
        type: ActionType.SHARE,
      },
    });
    if (!result) {
      await this.actionRepository.save(
        this.actionRepository.create({
          type: ActionType.SHARE,
          count: 1,
        }),
      );
    } else {
      const find = await this.actionRepository.findOneOrFail({
        where: {
          type: ActionType.SHARE,
        },
      });
      find.count = find.count + 1;

      await this.actionRepository.save(find);
    }
    return result;
  }
}
