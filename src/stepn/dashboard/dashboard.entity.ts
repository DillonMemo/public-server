import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum DashboardType {
  ACTIVATIONUSER = 'ACTIVATIONUSER',
}

@Entity({ name: 'dashboard' })
export class Dashboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
