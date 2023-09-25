import {BadRequestException, Injectable} from '@nestjs/common';
import * as bcrypt from "bcryptjs"
import { CreateUserDto } from './dto/create-user.dto';
import {ERROR_MESSAGES} from "../constants";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {ObjectId, Repository} from "typeorm";
import {SearchUserParams} from "./interfaces/user.interface";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const candidate = await this.findByEmail(dto.email)
        if (candidate) {
            throw new BadRequestException(ERROR_MESSAGES.EMAIL_IS_BUSY)
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        return await this.usersRepository.create({
            ...dto, password: hashPassword, role: dto.role || 'client'
        }).save()
    }

    async createOneUser(dto: CreateUserDto): Promise<Partial<User>> {
        const newUser = await this.createUser(dto)
        const { id, email, name, role, contactPhone } = newUser
        return { id, email, name, role, contactPhone }
    }

    async findAll(params: SearchUserParams): Promise<User[]> {
        const {limit, offset, name, email, contactPhone} = params
        console.log(name, limit, offset)
        return this.usersRepository.find({
            where: [
                {name: name}
            ],
            skip: +offset,
            take: +limit
        })

    }

    async findById(id: ObjectId): Promise<User> {
        return this.usersRepository.findOne({where: {id}});
    }

    async findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({where: {email}});
    }
}
