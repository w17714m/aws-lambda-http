import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthorInput {
    @Field()
    first_name: string;

    @Field()
    last_name: string;
}