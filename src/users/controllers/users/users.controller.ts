import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
  Redirect
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/users.dtos';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/typeorm/user.entity';

@Controller('users')
export class UsersController {
  userRepository: any;
  constructor(private readonly userService: UsersService) { }

  @Get()
  async findAll(
    @Query('created_date_order') createdDateOrder: 'ASC' | 'DESC' = 'DESC',
    @Query('username') username?: string,
  ): Promise<User[]> {
    return await this.userService.findAll(createdDateOrder, username);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}


