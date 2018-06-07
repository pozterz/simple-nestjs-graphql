import { LoggerService } from '@nestjs/common';

export class Logger implements LoggerService {
  log(message: string) {}
  error(message: string, trace: string) {}
  warn(message: string) {}
}