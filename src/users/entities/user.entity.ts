import {
  BaseEntity,
  ObjectId,
  Column,
  Entity, ObjectIdColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

enum Role { client, admin, manager}

@Entity('users')
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @ApiProperty({
    example: 'abc@mail.ru',
    description: 'email of the user',
  })
  @Column({name: 'email', nullable: false, unique: true})
  email: string;

  @ApiProperty({
    example: '12345',
    description: 'password of the user',
  })
  @Column({nullable: false})
  password: string;

  @ApiProperty({
    example: 'alex',
    description: 'name of the user',
  })
  @Column({name: 'name', nullable: false})
  name: string;

  @ApiProperty({
    example: '+7 999 99999999',
    description: 'phone of the user',
  })
  @Column({name: 'contactPhone', nullable: true})
  contactPhone: string;

  @ApiProperty({
    example: 'admin',
    description: 'role of the user',
  })
  @Column({name: 'role', default: Role[0]})
  role: string;
}
