import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = await this.userService.create(createUserInput);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userService.update(id, updateUserInput);
    return user;
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string): Promise<boolean> {
    await this.userService.remove(id);
    return true;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Query(() => User, { nullable: true })
  async user(
    @Args('id', { nullable: true }) id: string,
    @Args('email', { nullable: true }) email: string,
  ): Promise<User> {
    let user: User;
    if (id) user = await this.userService.findOneById(id);
    else if (email) user = await this.userService.findOneByEmail(email);
    return user;
  }
}
