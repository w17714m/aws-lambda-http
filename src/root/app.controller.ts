import { Controller, Get, Header, HttpCode, HttpStatus, Param, Redirect, Req, Res } from "@nestjs/common";
import { AppService } from './app.service';
import { Observable, Observer, of } from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('express')
  expressService(@Req() req, @Res() res){
    res.status(HttpStatus.OK).send({message: 'express response'});
  }

  @Get('status204')
  @HttpCode(204)
  status204(){
    return 'status 204'
  }

  @Get('cache-control')
  @Header('Cache-Control','none')
  cacheControl(){
    return 'cache control'
  }

  @Get('redirect')
  @Redirect('https://www.google.com',301)
  redirect(){
    return;
  }

  @Get('params/:id')
  params(@Param() params){
    return params.id;
  }


  @Get('rxjs')
  rxjs(): Observable<any>{
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
