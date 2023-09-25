import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SupportChatModule } from './support_chat/support_chat.module';
import {AuthModule} from "./auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://root:password@db/hotels?authSource=admin',
      port: 27017,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    HotelsModule,
    ReservationsModule,
    SupportChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
