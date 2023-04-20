import { Controller, Get, Header, HttpCode, HttpStatus, Param, Redirect, Req, Res } from "@nestjs/common";
import { AppService } from './app.service';
import { Observable, Observer, of } from "rxjs";
import { logger, logServices, tracerServices } from "@src/utils";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    logServices("getHello");
    tracerServices();
    return this.appService.getHello();
  }

  @Get('express')
  expressService(@Req() req, @Res() res){
    logServices("expressService");
    tracerServices();
    res.status(HttpStatus.OK).send({message: 'express response'});
  }

  @Get('status204')
  @HttpCode(204)
  status204(){
    logServices("status204");
    tracerServices();
    return 'status 204'
  }

  @Get('cache-control')
  @Header('Cache-Control','none')
  cacheControl(){
    logServices("cacheControl");
    tracerServices();
    return 'cache control'
  }

  @Get('redirect')
  @Redirect('https://www.google.com',301)
  redirect(){
    logServices("redirect");
    tracerServices();
    return;
  }

  @Get('params/:id')
  params(@Param() params){
    logServices("params");
    tracerServices();
    return params.id;
  }


  @Get('rxjs')
  rxjs(): Observable<any>{
    logServices("rxjs");
    const observable = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 3000);
    });
    console.log(observable)
    return observable;
  }
}
