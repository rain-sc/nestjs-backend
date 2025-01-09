import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as md5 from 'md5';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login(username, password) {
    const user = await this.userService.findByUsername(username);

    const md5Password = md5(password).toUpperCase();
    if (user.password !== md5Password) {
      throw new UnauthorizedException();
    }
    console.log('user', user);
  }
}
