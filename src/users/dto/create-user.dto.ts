import { ApiProperty } from '@nestjs/swagger'
import {IsEmail, IsNotEmpty, IsPhoneNumber, Length} from 'class-validator'
import { ERROR_MESSAGES } from 'src/constants'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: ERROR_MESSAGES.EMAIL_REQUIRED })
  @IsEmail({}, { message: ERROR_MESSAGES.INVALID_EMAIL_FORMAT })
  readonly email: string

  @ApiProperty()
  @Length(6, 25, {
    message: ERROR_MESSAGES.PASSWORD_MIN_LENGTH
  })
  readonly password: string

  @ApiProperty()
  @IsNotEmpty({message: ERROR_MESSAGES.NOT_EMPTY})
  readonly name: string

  @ApiProperty()
  @IsPhoneNumber("RU", {message: ERROR_MESSAGES.INVALID_PHONE_FORMAT})
  readonly contactPhone: string

  @ApiProperty()
  readonly role: string = 'client'
}
