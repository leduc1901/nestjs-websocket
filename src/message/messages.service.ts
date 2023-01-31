import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Message from './message.entity';
import { MessageGateway } from './message.gateway';

export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async getAllMessages() {
    const messages = this.messagesRepository.find();
    return messages;
  }

  async getMessageById(id: number) {
    const message = await this.messagesRepository.findOne({
      where: {
        id: id,
      },
    });
    if (message) {
      return message;
    }
    throw new NotFoundException('Could not find the message');
  }

  async createMessage(content: string) {
    const newMessage = await this.messagesRepository.create({ content });
    await this.messagesRepository.save(newMessage);
    return newMessage;
  }
}
