import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user.dto";
import {Roles} from "../auth/utils/roles.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";
import {LocalAuthGuard} from "../auth/guards/auth.guard";
import {SearchUserParams} from "./interfaces/user.interface";

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Создание пользователя' })
    @Roles('admin')
    @UseGuards(LocalAuthGuard, RolesGuard)
    @ApiResponse({ status: 200})
    @Post('/admin/users/')
    async createUser(@Body() dto: CreateUserDto){
        return await this.usersService.createOneUser(dto)
    }

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: 200})
    @Get('/')
    async getAllUsers(@Query() params: SearchUserParams){
        return await this.usersService.findAll(params)
    }


}
