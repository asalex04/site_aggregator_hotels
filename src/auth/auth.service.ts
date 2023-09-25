import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcryptjs"
import { ERROR_MESSAGES } from 'src/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import {User} from "../users/entities/user.entity";


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async registration(dto: CreateUserDto) {
    const newUser = await this.usersService.createUser(dto)
    const { id, email, name} = newUser
    return { id, email, name }
  }

  async login({email, password}: CreateUserDto): Promise<Partial<User>>{
    return this.validateUser(email, password)
  }

  async validateUser(email, password) {
    const user = await this.usersService.findByEmail(email)
    const passwordEquals = await bcrypt.compare(password, user.password)
    if (user && passwordEquals) {
      const { email, name, contactPhone, role } = user
      return { email, name, contactPhone, role }
    }
    throw new UnauthorizedException(ERROR_MESSAGES.NO_USER_EXISTS)
  }
}
