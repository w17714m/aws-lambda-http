import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
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

  @Query(() => AuthorDto)
  getTest() {
    return {
      _id: 'id',
      first_name: "name",
      last_name: "last name",
    }
  }

  @Mutation(() => AuthorDto)
  async updateAuthorMutator(
    @Args('id') id: String
  ) {
    return {
      _id: id,
      first_name:"mutation",
      last_name:'function'
    } as AuthorDto;
  }

}
