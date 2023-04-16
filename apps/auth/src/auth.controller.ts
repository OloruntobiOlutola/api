import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'create-user' })
  async createUser(
    @Ctx() context: RmqContext,
    @Payload() { name, gender }: { name: string; gender: string },
  ) {
    console.log(name, gender);
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.authService.createUser({ name, gender });
  }
}
