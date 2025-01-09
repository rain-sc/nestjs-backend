import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    user.nickname = createUserDto.nickname;
    user.avatar = createUserDto.avatar;
    user.active = 1;

    return this.userRepository.save(user);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
