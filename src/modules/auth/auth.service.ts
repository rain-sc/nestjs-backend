import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(username, password) {
    const user = await this.userService.findByUsername(username);
    console.log('user', user);

    const md5Password = md5(password).toUpperCase();

    if (user.password !== md5Password) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, userid: user.id };
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
