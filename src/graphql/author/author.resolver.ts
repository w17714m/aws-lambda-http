import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthorDto } from './dto/author.dto';
import { AuthorInput } from './input/author.input';

@Resolver()
export class AuthorResolver {

  @Query(() => AuthorDto)
  getAuthor(@Args('input') input: AuthorInput) {
    return {
        _id: 'id',
        first_name: input.first_name,
        last_name: input.last_name,
    }
  }
}