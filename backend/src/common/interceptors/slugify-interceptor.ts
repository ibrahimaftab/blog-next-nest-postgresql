import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import slugify from 'slugify';

@Injectable()
export class SlugifyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request?.body?.slug) {
      request.body.slug = slugify(request.body.slug, {
        lower: true,
        strict: true,
      });
      if (request.body.slug.length === 0) {
        throw new Error('Invalid slug');
      }
    }
    return next.handle();
  }
}
