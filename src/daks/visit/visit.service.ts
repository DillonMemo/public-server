import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from './visit.entity';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
  ) {}

  async editCount(): Promise<Visit[]> {
    const result = await this.visitRepository.find();
    if (!result.length) {
      await this.visitRepository.save({
        count: 1,
      });
    } else {
      await this.visitRepository.save({
        id: result[0].id,
        count: result[0].count + 1,
      });
    }
    return result;
  }
}
