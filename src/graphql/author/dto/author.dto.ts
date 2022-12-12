import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthorDto {
    @Field(() => ID)
    _id: string;

    @Field()
    readonly first_name: string;

    @Field()
    readonly last_name: string;
}