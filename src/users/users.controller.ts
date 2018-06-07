import { Controller, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model'
// import { AuthGuard } from 'auth/auth.guard';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.findAll()
  }

}
