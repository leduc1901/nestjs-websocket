import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import Message from './message.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async getAllMessages(): Promise<Message[]> {
    const messages = await this.messagesService.getAllMessages();
    return messages;
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<Message> {
    const message = await this.messagesService.getMessageById(Number(id));
    return message;
  }

  @Post()
  async createMessage(@Body('content') content: string) {
    const newMessage = await this.messagesService.createMessage(content);
    return newMessage;
  }
}
