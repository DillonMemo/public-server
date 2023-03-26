import { IsNumber, IsOptional } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class GetActivationUserOutput extends CoreOutput {
  @IsNumber()
  @IsOptional()
  activationUsers?: number;
}
