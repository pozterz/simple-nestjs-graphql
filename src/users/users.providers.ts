import { User } from './users.model';
import { Constant } from '../config/Constant'

export const UsersProviders = [
  {
    provide: Constant.userRepo,
    useValue: User,
  },
];