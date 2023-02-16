import { Injectable, Query, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/users.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }


  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(
    createdDateOrder?: 'ASC' | 'DESC',
    username?: string,
  ): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    
    
    if (username) {
      queryBuilder.andWhere('user.username like :username', { username: `%${username}%` });
    }

    if (createdDateOrder) {
      queryBuilder.orderBy('user.created_date', createdDateOrder);
    }

    return await queryBuilder.getMany();
  }
  





}

