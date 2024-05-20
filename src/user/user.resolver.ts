import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userService.update(id, updateUserInput);
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string): Promise<boolean> {
    await this.userService.remove(id);
    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { nullable: true })
  async getUserById(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { nullable: true })
  async getUserByEmail(@Args('email') email: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    return user;
  }
}
