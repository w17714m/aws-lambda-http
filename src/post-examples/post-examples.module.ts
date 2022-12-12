import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { PostExamplesController } from "@src/post-examples/controller/post-examples.controller";
import { MiddleModifyRequestMiddleware } from "@src/post-examples/middleware-modify-request/middle-modify-request.middleware";

@Module({
  providers:[],
  controllers: [PostExamplesController],

})
export class PostExamplesModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddleModifyRequestMiddleware)
      .forRoutes({ path:"post-examples/user-dto",method:RequestMethod.POST });
  }
}
