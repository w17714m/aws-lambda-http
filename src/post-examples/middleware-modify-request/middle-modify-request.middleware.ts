import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MiddleModifyRequestMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if(req.body.user){
      req.body.user += ' MIDDLEWARE ';
    }
    next();
  }
}
