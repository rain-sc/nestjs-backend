import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from './public.decorator';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  async login(@Body() params) {
    await this.authService.login(params.username, params.password);
    return 'auth';
  }
}
