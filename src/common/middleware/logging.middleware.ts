import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: any, res: any, next: () => void) {
    const startTime = Date.now();
    const baseUrl = req.baseUrl;

    res.on('finish', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      this.logger.log(`Request-response time ${baseUrl}: ${duration}ms`);
    });

    next();
  }
}
