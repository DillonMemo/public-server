import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ActionType {
  SHARE = 'SHARE',
  MOVE = 'MOVE',
}

@Entity({ name: 'action' })
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ActionType, comment: 'action 타입' })
  type: ActionType;

  @Column({ type: 'smallint', comment: '활동수', default: 0 })
  count: number;
}
