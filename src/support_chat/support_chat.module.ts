import { Module } from '@nestjs/common';
import { SupportChatController } from './support_chat.controller';
import { SupportChatService } from './support_chat.service';

@Module({
  controllers: [SupportChatController],
  providers: [SupportChatService]
})
export class SupportChatModule {}
