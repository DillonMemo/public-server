import { Controller, Get } from '@nestjs/common';
import { Visit } from './visit.entity';
import { VisitService } from './visit.service';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Get()
  editCount(): Promise<Visit[]> {
    return this.visitService.editCount();
  }
}
