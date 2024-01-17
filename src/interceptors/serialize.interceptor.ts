import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { Observable, map } from 'rxjs';

interface ClassConstructor {
  new (...ars: any[]): object;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        });
      }),
    );
  }
}
