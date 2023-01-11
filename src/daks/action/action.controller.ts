import { Controller, Get } from '@nestjs/common';
import { Action, ActionType } from './action.entity';
import { ActionService } from './action.service';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get(ActionType.MOVE.toLowerCase())
  editMoveCount(): Promise<Action> {
    return this.actionService.editMoveCount();
  }

  @Get(ActionType.SHARE.toLowerCase())
  editShareCount(): Promise<Action> {
    return this.actionService.editShareCount();
  }
}
