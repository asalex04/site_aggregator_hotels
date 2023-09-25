import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/local.strategy';
import {UsersService} from "../users/users.service";
import {SessionSerializer} from "./utils/session.serializer";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    UsersService,
    SessionSerializer
  ],
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([User])
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule {}
