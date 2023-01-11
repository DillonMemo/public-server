import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'visit' })
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint', comment: '방문수' })
  count: number;
}
