import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpResponseFilter } from '../filters/http-response-filter';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const httpResponse = new HttpResponseFilter('Request successful', 200);
        if (Array.isArray(data)) {
          return { ...httpResponse.response, data };
        } else if (typeof data === 'object') {
          return { ...httpResponse.response, ...(data as string[]) };
        }
        return httpResponse.response;
      }),
    );
  }
}
