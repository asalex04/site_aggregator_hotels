import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express'
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {LocalAuthGuard} from "./guards/auth.guard";
import {AuthenticatedGuard} from "./guards/authenticated.guard";


@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201 })
  @Post('/client/register')
  async registration(
    @Body() userDto: CreateUserDto
  ) {
    return await this.authService.registration(userDto)
  }

  @ApiOperation({ summary: 'Логин' })
  @ApiResponse({ status: 200 })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() userDto: CreateUserDto
  ) {
    return await this.authService.login(userDto)
  }

  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: 'Логаут' })
  @ApiResponse({ status: 200 })
  @Post('/logout')
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('connect.sid')
  }
}
