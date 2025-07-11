import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  type ExceptionFilter,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { HttpResponseFilter } from './http-response-filter';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseMessage: string | object = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      responseMessage = exception.getResponse();
    } else if (exception instanceof Error) {
      responseMessage = exception.message;
    }

    const httpResponseFilter = new HttpResponseFilter(responseMessage, status);

    response.status(status).send(httpResponseFilter.response);
  }
}
