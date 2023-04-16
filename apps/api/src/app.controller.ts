import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('APP_SERVICE') private authService: ClientProxy) {}

  @Get()
  async getUser() {
    return this.authService.send(
      {
        cmd: 'get-users',
      },
      {},
    );
  }

  @Post()
  async createUser(@Body() { name, gender }: { name: string; gender: string }) {
    return this.authService.send(
      {
        cmd: 'create-user',
      },
      { name, gender },
    );
  }
}
