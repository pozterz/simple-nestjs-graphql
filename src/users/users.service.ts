import { Injectable, Inject } from '@nestjs/common';
import { User } from './users.model'
import { Constant } from '../config/Constant'

@Injectable()
export class UsersService {
  constructor(
    @Inject(Constant.userRepo) private readonly users: typeof User,
  ) {}

  async findOneByUsername(username) {
    return Promise.resolve(true)
  }

  async findAll(): Promise<User[]> {
    return await this.users.findAll();
  }
}