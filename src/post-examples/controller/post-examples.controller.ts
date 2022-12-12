import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { GuardPostExamplesGuard } from "@src/post-examples/guard-post-examples/guard-post-examples.guard";
import { InterceptorPostExamplesInterceptor } from "@src/post-examples/interceptor-post-examples/interceptor-post-examples.interceptor";
import { DecoratorPostExamples } from "@src/post-examples/decorator-post-examples/decorator-post-examples.decorator";

export class UserDto {
  user: string;
  pass: string;
}

/*
curl --location --request POST 'http://localhost:3002/post-examples/user-dto' \
--header 'Content-Type: application/json' \
--data-raw '{
"user":"acme",
  "pass": "duck"
}'
*/


@Controller('post-examples')
export class PostExamplesController {

  @Post('user-dto')
  userDtoPost(@Body() user: UserDto){
    user.user += 'Autenticado ';
    return user;
  }

  @Post('error')
  errorPost(){
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }


  // curl --location --request POST 'http://localhost:3002/post-examples/pipe/1'
  @Post('pipe/:id')
  withPipe(
    @Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE }))
    idNumber: number
  ){
    return {id: idNumber, status:'processed'}
  }

  @Post('guard')
  @UseGuards(GuardPostExamplesGuard)
  guard(){
    return 'guard service';
  }

  @Post('interceptors')
  @UseInterceptors(InterceptorPostExamplesInterceptor)
  interceptors(){
    return 'interceptors service';
  }

  @Post('decorator')
  decorator(@DecoratorPostExamples() user: UserDto){
    return user;
  }


}
