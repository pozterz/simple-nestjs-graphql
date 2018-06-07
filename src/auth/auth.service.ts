import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async createToken() {
    const user: JwtPayload = { username: 'user@email.com', id: 1 };
    return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByUsername(payload.username);
  }
}