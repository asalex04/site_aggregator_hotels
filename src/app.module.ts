import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SupportChatModule } from './support_chat/support_chat.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    DatabaseModule,
    UsersModule,
    HotelsModule,
    ReservationsModule,
    SupportChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
