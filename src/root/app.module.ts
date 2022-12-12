import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostExamplesModule } from "@src/post-examples/post-examples.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { upperDirectiveTransformer } from "@src/graphql/author/transformers";
import { DirectiveLocation, GraphQLDirective } from "graphql";
import { AuthorModule } from "@src/graphql/author/author.module";

@Module({
  imports: [
    PostExamplesModule,
    AuthorModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
