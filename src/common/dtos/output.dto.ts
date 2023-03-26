import { IsString } from 'class-validator';

/** 다국어모드로인해 서버에서 뿌려주게 되어 국가별 에러메시지 리스트입니다. */
export class LangErrorMessage {
  @IsString()
  ko: string;

  @IsString()
  en: string;
}

export class CoreOutput {
  error?: LangErrorMessage;

  ok: boolean;
}
